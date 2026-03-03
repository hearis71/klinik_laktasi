const express = require("express");
const router = express.Router();

router.use("/pasien", require("./pasien.routes"));
router.use("/registrasi", require("./registrasi.routes"));
router.use("/kajian-riwayat-menyusui", require("./kajianRiwayatMenyusui.routes"));
router.use("/kunjungan", require("./kunjungan.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;