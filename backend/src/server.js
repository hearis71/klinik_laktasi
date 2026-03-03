require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`========================================`);
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Database configured: ${process.env.DATABASE_URL ? "YES" : "NO"}`);
  console.log(`========================================`);
});

// Handle timeout for long-running requests
server.timeout = 120000; // 2 minutes