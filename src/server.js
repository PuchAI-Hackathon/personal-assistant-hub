import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" })); // Allow larger meeting transcripts
app.use(express.urlencoded({ extended: true }));

// MCP validation endpoint required by Puch AI
app.get("/mcp/validate", (req, res) => {
  const authHeader = req.headers['authorization'] || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(' ')[1];
  if (token !== 'abc123token') {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Return phone number in {country_code}{number} format
  res.json({ number: "918853131542" });
});


// Serve static UI
app.use(express.static("public"));

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
