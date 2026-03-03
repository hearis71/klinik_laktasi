const express = require("express");
const router = express.Router();
const kunjunganController = require("../controllers/kunjungan.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.post("/", kunjunganController.create);
router.get("/", kunjunganController.findAll);
router.get("/:id", kunjunganController.findOne);
router.put("/:id", kunjunganController.update);
router.delete("/:id", kunjunganController.remove);

module.exports = router;
