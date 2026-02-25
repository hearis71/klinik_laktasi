const service = require("../services/user.service");

exports.create = async (req, res) => {
  try {
    const result = await service.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  console.log("BODY:", req.body);
};