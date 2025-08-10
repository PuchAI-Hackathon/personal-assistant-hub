// src/utils/textUtils.js
export function splitSentences(text) {
  return text.trim().split(/(?<=[.?!])\s+/);
}

export const ACTION_KEYWORDS = [
  "todo", "to do", "follow up", "action item", "deadline", "assign", "due", "must", "should", "need to", "next steps", "task"
];

export function scoreSentences(sentences) {
  const freq = new Map();
  for (const s of sentences) {
    const words = s.toLowerCase().match(/\b\w+\b/g) || [];
    for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  }
  return sentences.map(s => {
    const words = s.toLowerCase().match(/\b\w+\b/g) || [];
    if (words.length === 0) return 0;
    let score = 0;
    for (const w of words) score += freq.get(w) || 0;
    return score / words.length;
  });
}

export function summarize(sentences, maxSentences) {
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

export function extractActionItems(sentences) {
  return sentences.filter(sentence =>
    ACTION_KEYWORDS.some(keyword => sentence.toLowerCase().includes(keyword))
  );
}
