const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/auth", require("./routes/auth.routes"));


app.get("/", (req, res) => {
  res.json({ message: "ERM Klinik Laktasi API running" });
});

module.exports = app;