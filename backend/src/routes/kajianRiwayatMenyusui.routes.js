const express = require('express');
const router = express.Router();
const {
  createOrUpdateKajianRiwayatMenyusui,
  getKajianRiwayatMenyusuiByNoRegistrasi,
  getAllKajianRiwayatMenyusui
} = require('../controllers/kajianRiwayatMenyusui.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(authenticate);

// Create or Update Kajian Riwayat Menyusui
router.post('/', createOrUpdateKajianRiwayatMenyusui);

// Get all Kajian Riwayat Menyusui
router.get('/', getAllKajianRiwayatMenyusui);

// Get Kajian Riwayat Menyusui by No Registrasi
router.get('/no-registrasi/:no_registrasi', getKajianRiwayatMenyusuiByNoRegistrasi);

module.exports = router;
