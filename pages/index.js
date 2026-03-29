import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const extractVideoId = (url) => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const SUGGESTED = [
  "Summarize this video in 3 bullet points",
  "What's the main argument?",
  "What are the key takeaways?",
  "List any tools or resources mentioned",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [error, setError] = useState("");
  const [stage, setStage] = useState("idle");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleLoad = async () => {
    setError("");
    const id = extractVideoId(url);
    if (!id) return setError("Invalid YouTube URL");

    setTranscriptLoading(true);
    setStage("loading");
    setMessages([]);

    // Fetch title via oEmbed (free, no API key)
    let title = "YouTube Video";
    try {
      const oRes = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
      );
      const oData = await oRes.json();
      title = oData.title || title;
    } catch {}

    setVideoTitle(title);
    setVideoId(id);

    // Fetch transcript from our own API route (server-side, no CORS)
    try {
      const res = await fetch(`/api/transcript?videoId=${id}`);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to fetch transcript");
      }

      setTranscript(data.transcript);
      setStage("ready");
      setMessages([
        {
          role: "assistant",
          content: `Transcript loaded for "${title}". Ask me anything about it.`,
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      setError(err.message || "Could not fetch transcript.");
      setStage("idle");
      setVideoId(null);
    } finally {
      setTranscriptLoading(false);
    }
  };

  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, transcript, videoTitle }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Chat error");

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setVideoId(null);
    setVideoTitle("");
    setTranscript("");
    setMessages([]);
    setInput("");
    setError("");
    setStage("idle");
  };

  return (
    <>
      <Head>
        <title>TubeChat — Chat with any YouTube video</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Instrument+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #080808;
          color: #e2ddd6;
          font-family: 'Instrument Sans', sans-serif;
          min-height: 100vh;
        }
        .wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 40px 20px 32px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
        }
        .brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .brand-dot {
          width: 8px; height: 8px;
          background: #f03;
          border-radius: 50%;
          display: inline-block;
        }
        .ghost-btn {
          background: none;
          border: 1px solid #1e1e1e;
          color: #444;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 12px;
          padding: 5px 12px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .ghost-btn:hover { border-color: #333; color: #888; }
        .url-bar {
          display: flex;
          border: 1px solid #1a1a1a;
          margin-bottom: 8px;
          transition: border-color 0.2s;
        }
        .url-bar:focus-within { border-color: #2a2a2a; }
        .url-input {
          flex: 1;
          background: #0f0f0f;
          border: none;
          color: #e2ddd6;
          padding: 13px 16px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .url-input::placeholder { color: #333; }
        .load-btn {
          background: #f03;
          border: none;
          color: #fff;
          padding: 13px 22px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .load-btn:hover:not(:disabled) { background: #d00; }
        .load-btn:disabled { background: #1a1a1a; color: #333; cursor: not-allowed; }
        .error-msg {
          font-size: 12.5px;
          color: #f05;
          padding: 10px 14px;
          background: rgba(255,0,51,0.05);
          border-left: 2px solid #f03;
          margin-top: 8px;
          margin-bottom: 20px;
        }
        .loading-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          margin-bottom: 20px;
          color: #555;
          font-size: 13px;
        }
        .spinner {
          width: 14px; height: 14px;
          border: 1.5px solid #1e1e1e;
          border-top-color: #f03;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .video-card {
          display: flex;
          gap: 14px;
          padding: 14px;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          margin-bottom: 24px;
        }
        .video-thumb {
          width: 88px; height: 50px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid #111;
        }
        .video-meta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }
        .video-title-txt {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13.5px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ready-badge { font-size: 11px; color: #2a8a4a; }
        .chat-scroll {
          flex: 1;
          overflow-y: auto;
          min-height: 200px;
          max-height: calc(100vh - 420px);
          scrollbar-width: thin;
          scrollbar-color: #1a1a1a transparent;
          padding: 4px 0;
          margin-bottom: 16px;
        }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #1e1e1e; }
        .msg {
          padding: 14px 0;
          border-bottom: 1px solid #111;
          animation: fadeIn 0.2s ease;
        }
        .msg:last-child { border-bottom: none; }
        .msg-who {
          font-family: 'Syne', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .msg.user .msg-who { color: #f03; }
        .msg.assistant .msg-who { color: #2277ff; }
        .msg-body {
          font-size: 14px;
          line-height: 1.75;
          color: #b8b2aa;
          white-space: pre-wrap;
        }
        .msg.user .msg-body { color: #e2ddd6; }
        .typing {
          padding: 16px 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .dot {
          width: 5px; height: 5px;
          background: #2277ff;
          border-radius: 50%;
          animation: blink 1.1s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.18s; }
        .dot:nth-child(3) { animation-delay: 0.36s; }
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 14px;
        }
        .sug-btn {
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
          color: #555;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .sug-btn:hover { border-color: #333; color: #999; background: #111; }
        .input-row {
          display: flex;
          border: 1px solid #1a1a1a;
          transition: border-color 0.2s;
        }
        .input-row:focus-within { border-color: #2a2a2a; }
        .chat-input {
          flex: 1;
          background: #0f0f0f;
          border: none;
          color: #e2ddd6;
          padding: 13px 16px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 14px;
          outline: none;
          resize: none;
          line-height: 1.5;
        }
        .chat-input::placeholder { color: #2e2e2e; }
        .chat-input:disabled { opacity: 0.4; }
        .send-btn {
          background: #111;
          border: none;
          border-left: 1px solid #1a1a1a;
          color: #333;
          padding: 0 18px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .send-btn:hover:not(:disabled) { background: #161616; color: #888; }
        .send-btn:disabled { cursor: not-allowed; opacity: 0.3; }
        .empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 60px 0;
        }
        .empty-icon { font-size: 36px; opacity: 0.12; }
        .empty-hint { font-size: 13px; color: #2a2a2a; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="wrap">
        <div className="header">
          <div className="brand">
            <span className="brand-dot" />
            TubeChat
          </div>
          {stage === "ready" && (
            <button className="ghost-btn" onClick={handleReset}>← New video</button>
          )}
        </div>

        {stage !== "ready" && (
          <div style={{ marginBottom: error ? 0 : 28 }}>
            <div className="url-bar">
              <input
                className="url-input"
                placeholder="Paste a YouTube URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLoad()}
                disabled={transcriptLoading}
              />
              <button
                className="load-btn"
                onClick={handleLoad}
                disabled={transcriptLoading || !url.trim()}
              >
                {transcriptLoading ? "..." : "LOAD"}
              </button>
            </div>
            {error && <div className="error-msg">{error}</div>}
          </div>
        )}

        {transcriptLoading && (
          <div className="loading-bar">
            <div className="spinner" />
            Fetching transcript...
          </div>
        )}

        {stage === "ready" && videoId && (
          <div className="video-card">
            <img
              className="video-thumb"
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt="thumbnail"
            />
            <div className="video-meta">
              <div className="video-title-txt">{videoTitle}</div>
              <span className="ready-badge">✓ transcript ready</span>
            </div>
          </div>
        )}

        {stage === "ready" ? (
          <>
            <div className="chat-scroll">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  <div className="msg-who">{m.role === "user" ? "You" : "AI"}</div>
                  <div className="msg-body">{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="typing">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && !loading && (
              <div className="suggestions">
                {SUGGESTED.map((s) => (
                  <button key={s} className="sug-btn" onClick={() => handleSend(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="input-row">
              <textarea
                ref={inputRef}
                className="chat-input"
                rows={2}
                placeholder="Ask anything about this video..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
              />
              <button
                className="send-btn"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
              >
                ↑
              </button>
            </div>
          </>
        ) : (
          !transcriptLoading && (
            <div className="empty">
              <div className="empty-icon">▶</div>
              <div className="empty-hint">Paste a YouTube link above to get started</div>
            </div>
          )
        )}
      </div>
    </>
  );
}
