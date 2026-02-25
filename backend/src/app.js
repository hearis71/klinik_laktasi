const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", routes);
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// Static frontend (Vite build output)
const frontendDistPath = path.join(__dirname, "..", "..", "frontend", "dist");
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