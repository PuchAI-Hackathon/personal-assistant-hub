// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" })); // Allow larger meeting transcripts
app.use(express.urlencoded({ extended: true }));

// Serve static UI
app.use(express.static("public"));

// ✅ Validation endpoint (required by Puch Hackathon)
// Must return your number in format {country_code}{number} e.g., 919876543210
app.get("/validate", (req, res) => {
  const myNumber = "918853131542"; // <-- Replace with your actual phone number if different
  res.json({ number: myNumber });
});

// API routes
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error", details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI Personal Assistant Hub listening on port ${PORT}`);
});
