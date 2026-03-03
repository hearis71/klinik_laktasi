const service = require("../services/auth.service");

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