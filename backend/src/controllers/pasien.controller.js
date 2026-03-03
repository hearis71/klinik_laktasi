const pasienService = require("../services/pasien.service");

exports.create = async (req, res) => {
  try {
    const data = await pasienService.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  const data = await pasienService.findAll();
  res.json(data);
};

exports.findOne = async (req, res) => {
  const data = await pasienService.findById(req.params.id);
  if (!data) return res.status(404).json({ message: "Pasien tidak ditemukan" });
  res.json(data);
};

exports.findByNoRM = async (req, res) => {
  const data = await pasienService.findByNoRM(req.params.no_rm);
  if (!data) return res.status(404).json({ message: "Pasien tidak ditemukan" });
  res.json(data);
};

exports.update = async (req, res) => {
  try {
    const data = await pasienService.update(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await pasienService.remove(id);

    res.json({
      message: "Pasien berhasil dihapus"
    });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};