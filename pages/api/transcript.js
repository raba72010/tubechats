import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  // Allow cross-origin requests from your own frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: "Missing videoId parameter" });
  }

  try {
    const segments = await YoutubeTranscript.fetchTranscript(videoId);

    if (!segments || segments.length === 0) {
      return res.status(404).json({ error: "No transcript found for this video. It may not have captions." });
    }

    // Join all segments into clean plain text
    const text = segments
      .map((s) => s.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();

    return res.status(200).json({ transcript: text, segments });
  } catch (err) {
    const message = err?.message || "Unknown error";

    if (message.includes("Could not get") || message.includes("disabled")) {
      return res.status(404).json({ error: "Transcript not available. Captions may be disabled for this video." });
    }

    if (message.includes("private") || message.includes("unavailable")) {
      return res.status(403).json({ error: "This video is private or unavailable." });
    }

    return res.status(500).json({ error: `Failed to fetch transcript: ${message}` });
  }
}
