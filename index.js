import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

function splitSentences(text) {
  return text.trim().split(/(?<=[.?!])\s+/);
}

// --- Meeting Notes Summarizer ---
const ACTION_KEYWORDS = [
  "todo", "to do", "follow up", "action item", "deadline", "assign", "due", "must", "should", "need to", "next steps", "task"
];

function scoreSentences(sentences) {
  const freq = new Map();
  for (const s of sentences) {
    const words = s.toLowerCase().match(/\b\w+\b/g) || [];
    for (const w of words) {
      freq.set(w, (freq.get(w) || 0) + 1);
    }
  }
  return sentences.map(s => {
    const words = s.toLowerCase().match(/\b\w+\b/g) || [];
    if (words.length === 0) return 0;
    let score = 0;
    for (const w of words) score += freq.get(w) || 0;
    return score / words.length;
  });
}

function summarize(sentences, maxSentences) {
  if (sentences.length <= maxSentences) return sentences;
  const scores = scoreSentences(sentences);
  const topSentences = scores
    .map((score, idx) => ({ idx, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .map(({ idx }) => idx)
    .sort((a, b) => a - b);
  return topSentences.map(i => sentences[i]);
}

function extractActionItems(sentences) {
  return sentences.filter(sentence =>
    ACTION_KEYWORDS.some(keyword => sentence.toLowerCase().includes(keyword))
  );
}

app.post("/api/meeting-summarize", (req, res) => {
  try {
    const { text, max_sentences = 5 } = req.body;
    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: "Please provide meeting notes or transcript text." });
    }
    const sentences = splitSentences(text).filter(s => s.length > 10);
    const summary = summarize(sentences, max_sentences);
    const actionItems = extractActionItems(sentences);
    res.json({
      summary: summary.join(" "),
      action_items: actionItems.length > 0 ? actionItems : ["No action items detected."]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Code Explainer ---
app.post("/api/code-explain", (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Provide code" });
  const lines = code.split("\n");
  const explanation = lines.map((line, i) => `Line ${i + 1}: ${line.trim()} — explanation placeholder.`);
  res.json({ explanation });
});

// --- FAQ Q&A ---
const FAQ = {
  "what is ai?": "AI stands for Artificial Intelligence, a branch of computer science focused on creating intelligent machines.",
  "how to deploy node app?": "You can deploy Node.js apps to platforms like Vercel, Heroku, or AWS.",
  "what is mcp server?": "MCP server is a backend service extending Puch AI capabilities with custom tools.",
  // Add more FAQs as needed
};

app.post("/api/faq", (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Provide a question" });
  const answer = FAQ[question.toLowerCase()] || "Sorry, I don't know that one.";
  res.json({ answer });
});

// --- To-Do List Manager ---
let todos = [];

app.post("/api/todo/add", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task required" });
  todos.push({ task, done: false });
  res.json({ message: "Task added", todos });
});

app.get("/api/todo/list", (req, res) => {
  res.json({ todos });
});

// --- Sentiment Analyzer ---
const positiveWords = ["good", "great", "happy", "love", "excellent", "awesome"];
const negativeWords = ["bad", "sad", "hate", "terrible", "awful", "worst"];

app.post("/api/sentiment", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });
  const lower = text.toLowerCase();
  let score = 0;
  positiveWords.forEach(w => { if (lower.includes(w)) score++; });
  negativeWords.forEach(w => { if (lower.includes(w)) score--; });
  const sentiment = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
  res.json({ sentiment, score });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI Personal Assistant Hub listening on port ${PORT}`));

// ✅ MCP Validation endpoint
app.get("/mcp/validate", (req, res) => {
  res.json({
    status: "ok",
    message: "MCP server is running"
  });
});
