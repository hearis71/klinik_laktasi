const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

// Enable CORS for all origins (adjust for production if needed)
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes (all routes managed in routes/index.js)
app.use("/api", routes);

// Static frontend (Vite build output)
// Try multiple paths for different deployment scenarios
const possiblePaths = [
  path.join(__dirname, "..", "..", "frontend", "dist"), // From backend/src
  path.join(__dirname, "..", "..", "..", "frontend", "dist"), // From backend
  path.join(process.cwd(), "frontend", "dist"), // From root
  path.join(__dirname, "dist") // Fallback
];

let frontendDistPath = possiblePaths.find(p => {
  try {
    const exists = require("fs").existsSync(p);
    console.log(`Checking path: ${p} - ${exists ? "FOUND" : "NOT FOUND"}`);
    return exists;
  } catch (err) {
    console.log(`Checking path: ${p} - ERROR: ${err.message}`);
    return false;
  }
}) || path.join(__dirname, "..", "..", "frontend", "dist");

console.log(`Serving frontend from: ${frontendDistPath}`);
app.use(express.static(frontendDistPath));

// Serve SPA for root
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Fallback untuk route selain /api -> SPA (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

module.exports = app;