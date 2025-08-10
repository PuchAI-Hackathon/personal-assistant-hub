// src/controllers/faqController.js
const FAQ = {
  "what is ai?": "AI stands for Artificial Intelligence, a branch of computer science focused on creating intelligent machines.",
  "how to deploy node app?": "You can deploy Node.js apps to platforms like Vercel, Render, or Heroku. Use a start script and expose a health endpoint.",
  "what is mcp server?": "MCP server is a backend service extending Puch AI capabilities with custom tools."
};

export function answerFAQ(req, res) {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Provide a question" });
  const answer = FAQ[question.toLowerCase()] || "Sorry, I don't know that one yet.";
  res.json({ answer });
}
