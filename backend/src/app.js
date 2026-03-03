const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

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
    return require("fs").existsSync(p);
  } catch {
    return false;
  }
}) || path.join(__dirname, "..", "..", "frontend", "dist");

app.use(express.static(frontendDistPath));

// Serve SPA for root
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Fallback untuk route selain /api -> SPA (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

module.exports = app;