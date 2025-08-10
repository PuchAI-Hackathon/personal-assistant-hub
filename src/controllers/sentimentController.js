// src/controllers/sentimentController.js
const positiveWords = ["good", "great", "happy", "love", "excellent", "awesome", "nice"];
const negativeWords = ["bad", "sad", "hate", "terrible", "awful", "worst", "angry"];

export function analyzeSentiment(req, res) {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });
  const lower = text.toLowerCase();
  let score = 0;
  positiveWords.forEach(w => { if (lower.includes(w)) score++; });
  negativeWords.forEach(w => { if (lower.includes(w)) score--; });
  const sentiment = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
  res.json({ sentiment, score });
}
