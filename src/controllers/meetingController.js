// src/controllers/meetingController.js
import { splitSentences, summarize, extractActionItems } from "../utils/textUtils.js";

export function summarizeMeetingNotes(req, res) {
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
}
