const service = require("../services/auth.service");

exports.healthCheck = async (req, res) => {
  try {
    const health = await service.healthCheck();
    if (health.status === "healthy") {
      res.json({ status: "ok", message: "Server is running", ...health });
    } else {
      res.status(503).json({ status: "degraded", message: "Service degraded", ...health });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib diisi" });
    }

    const user = await service.login(email, password);
    res.json({
      message: "Login berhasil",
      user,
      token: user.token
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};