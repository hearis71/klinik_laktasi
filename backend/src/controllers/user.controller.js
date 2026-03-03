const service = require("../services/user.service");

exports.create = async (req, res) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json({ message: "User berhasil dibuat", data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  console.log("BODY:", req.body);
};

exports.findAll = async (req, res) => {
  try {
    const users = await service.findAll();
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.json({ message: "User berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};