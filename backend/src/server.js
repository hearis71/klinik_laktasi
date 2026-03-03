require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Database URL: ${process.env.DATABASE_URL ? "Connected" : "Not configured"}`);
});