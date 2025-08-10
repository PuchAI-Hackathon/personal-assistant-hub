// src/controllers/codeController.js
export function explainCode(req, res) {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Provide code" });
  const lines = code.split("\n");
  const explanation = lines.map((line, i) => `Line ${i + 1}: ${line.trim() || "<blank>"} — explanation placeholder.`);
  res.json({ explanation });
}
