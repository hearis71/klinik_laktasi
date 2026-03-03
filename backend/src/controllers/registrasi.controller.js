const registrasiService = require("../services/registrasi.service");
const pasienService = require("../services/pasien.service");

exports.create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { no_rm, ...data } = req.body;

    let pasienId = data.pasienId;

    if (!pasienId && no_rm) {
      const pasien = await pasienService.findByNoRM(no_rm);
      if (pasien) {
        pasienId = pasien.id;
      }
    }

    if (!pasienId) {
      return res.status(400).json({ error: "Pasien tidak ditemukan" });
    }

    data.pasienId = pasienId;

    const registrasi = await registrasiService.create(data, userId);
    res.status(201).json(registrasi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  const data = await registrasiService.findAll();
  res.json(data);
};

exports.findOne = async (req, res) => {
  const data = await registrasiService.findById(req.params.id);
  if (!data) return res.status(404).json({ message: "Registrasi tidak ditemukan" });
  res.json(data);
};

exports.findByNoRegistrasi = async (req, res) => {
  const data = await registrasiService.findByNoRegistrasi(req.params.no_registrasi);
  if (!data) return res.status(404).json({ message: "Registrasi tidak ditemukan" });
  res.json(data);
};

exports.findByPasienId = async (req, res) => {
  const data = await registrasiService.findByPasienId(req.params.pasienId);
  res.json(data);
};

exports.update = async (req, res) => {
  try {
    const data = await registrasiService.update(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await registrasiService.remove(id);
    res.json({ message: "Registrasi berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
