// src/routes/apiRoutes.js
import express from "express";
import { summarizeMeetingNotes } from "../controllers/meetingController.js";
import { explainCode } from "../controllers/codeController.js";
import { answerFAQ } from "../controllers/faqController.js";
import { addTodoTask, listTodos } from "../controllers/todoController.js";
import { analyzeSentiment } from "../controllers/sentimentController.js";
import { getWeatherForCity } from "../controllers/weatherController.js";

const router = express.Router();

router.post("/meeting-summarize", summarizeMeetingNotes);
router.post("/code-explain", explainCode);
router.post("/faq", answerFAQ);
router.post("/todo/add", addTodoTask);
router.get("/todo/list", listTodos);
router.post("/sentiment", analyzeSentiment);
router.get("/weather", getWeatherForCity);

export default router;
