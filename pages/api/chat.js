import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, transcript, videoTitle } = req.body;

  if (!messages || !transcript) {
    return res.status(400).json({ error: "Missing messages or transcript" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are an expert assistant helping users understand a YouTube video.

Video title: ${videoTitle || "Unknown"}

Full transcript:
${transcript.slice(0, 15000)}

Rules:
- Answer based only on the transcript content above
- Be concise and direct
- Use bullet points when summarizing or listing
- If something isn't covered in the transcript, say so clearly`;

    // Build Gemini chat history from messages (all except the last user message)
    const history = [];
    for (let i = 0; i < messages.length - 1; i++) {
      const m = messages[i];
      history.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      });
    }

    const chat = model.startChat({
      history,
      systemInstruction: systemPrompt,
    });

    // Last message is the current user question
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: "Gemini API error: " + (err.message || "Unknown") });
  }
}
