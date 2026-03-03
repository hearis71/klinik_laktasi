const express = require("express");
const router = express.Router();
const registrasiController = require("../controllers/registrasi.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.post("/", registrasiController.create);
router.get("/", registrasiController.findAll);
router.get("/:id", registrasiController.findOne);
router.get("/no-registrasi/:no_registrasi", registrasiController.findByNoRegistrasi);
router.get("/pasien/:pasienId", registrasiController.findByPasienId);
router.put("/:id", registrasiController.update);
router.delete("/:id", registrasiController.remove);

module.exports = router;
