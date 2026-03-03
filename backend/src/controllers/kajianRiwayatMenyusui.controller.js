const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create or Update Kajian Riwayat Menyusui
const createOrUpdateKajianRiwayatMenyusui = async (req, res) => {
  try {
    const { no_registrasi } = req.body;

    if (!no_registrasi) {
      return res.status(400).json({
        success: false,
        message: 'No. Registrasi diperlukan'
      });
    }

    // Check if registrasi exists
    const registrasi = await prisma.registrasi.findUnique({
      where: { no_registrasi }
    });

    if (!registrasi) {
      return res.status(404).json({
        success: false,
        message: 'Registrasi tidak ditemukan'
      });
    }

    // Transform formData to match schema fields
    const data = {
      no_registrasi,
      // Pemberian Makan Bayi Sekarang
      pemberianMakanASI: req.body.pemberianMakan?.asi || false,
      pemberianMakanSusuLain: req.body.pemberianMakan?.susuLain || false,
      keteranganSusuLain: req.body.pemberianMakan?.keteranganSusuLain || null,
      frekuensiMenyusui: req.body.frekuensiMenyusui || null,
      keteranganFrekuensiMenyusui: req.body.keteranganFrekuensiMenyusui || null,
      lamaMenyusui: req.body.lamaMenyusui || null,
      menyusui: req.body.menyusui || null,
      menyusuiMalamHari: req.body.menyusuiMalamHari || null,
      jumlahFrekuensiSusuLain: req.body.jumlahFrekuensiSusuLain || null,
      cairanTambahanKapanDimulai: req.body.cairanTambahan?.kapanDimulai || null,
      cairanTambahanApaYangDiberikan: req.body.cairanTambahan?.apaYangDiberikan || null,
      cairanTambahanFrekuensiPemberian: req.body.cairanTambahan?.frekuensiPemberian || null,
      cairanTambahanBerapaBanyak: req.body.cairanTambahan?.berapaBanyak || null,
      makananTambahanKapanDimulai: req.body.makananTambahan?.kapanDimulai || null,
      makananTambahanApaYangDiberikan: req.body.makananTambahan?.apaYangDiberikan || null,
      makananTambahanFrekuensiPemberian: req.body.makananTambahan?.frekuensiPemberian || null,
      makananTambahanBerapaBanyak: req.body.makananTambahan?.berapaBanyak || null,
      menggunakanBotol: req.body.menggunakanBotol || null,
      keteranganBotol: req.body.keteranganBotol || null,

      // Kesehatan & Perilaku Bayi
      bbSaatLahir: req.body.bbSaatLahir ? parseInt(req.body.bbSaatLahir) : null,
      bbSaatIni: req.body.bbSaatIni ? parseInt(req.body.bbSaatIni) : null,
      perubahanBB: req.body.perubahanBB || null,
      jenisKelahiranPrematur: req.body.jenisKelahiran?.prematur || false,
      jenisKelahiranKembar: req.body.jenisKelahiran?.kembar || false,
      frekuensiBAK: req.body.frekuensiBAK || null,
      warnaBAK: req.body.warnaBAK || null,
      frekuensiBAB: req.body.frekuensiBAB || null,
      kosistensiBAB: req.body.kosistensiBAB || null,
      perilakuMakan: req.body.perilakuMakan || null,
      perilakuTidur: req.body.perilakuTidur || null,
      perilakuMenangis: req.body.perilakuMenangis || null,
      riwayatSakit: req.body.riwayatSakit || null,
      kelainanBawaan: req.body.kelainanBawaan || null,

      // Kehamilan, Kelahiran dan Pemberian Makan Bayi
      tempatANCRS: req.body.tempatANC?.rs || false,
      tempatANCTPMB: req.body.tempatANC?.tpmb || false,
      tempatANCPuskesmas: req.body.tempatANC?.puskesmas || false,
      tempatANCPolindes: req.body.tempatANC?.polindes || false,
      tempatANCLainnya: req.body.tempatANC?.lainnya || false,
      tempatANCKeteranganLainnya: req.body.tempatANC?.keteranganLainnya || null,
      yangMelakukanANCDokterKandungan: req.body.yangMelakukanANC?.dokterKandungan || false,
      yangMelakukanANCBidan: req.body.yangMelakukanANC?.bidan || false,
      yangMelakukanANCDokterUmum: req.body.yangMelakukanANC?.dokterUmum || false,
      yangMelakukanANCLainnya: req.body.yangMelakukanANC?.lainnya || false,
      yangMelakukanANCKeteranganLainnya: req.body.yangMelakukanANC?.keteranganLainnya || null,
      diskusiPemberianMakan: req.body.diskusiPemberianMakan || null,
      jenisPersalinan: req.body.jenisPersalinan || null,
      riwayatIMD: req.body.riwayatIMD || null,
      menyusui1Jam: req.body.menyusui1Jam || null,
      rawatGabung: req.body.rawatGabung || null,
      pemberianPrelaktal: req.body.pemberianPrelaktal || null,
      bantuanMenyusui: req.body.bantuanMenyusui || null,
      menerimaSampleFormula: req.body.menerimaSampleFormula || null,

      // Kondisi Ibu & KB
      riwayatKesehatanIbu: req.body.riwayatKesehatanIbu || null,
      obatDikonsumsi: req.body.obatDikonsumsi || null,
      giziIbu: req.body.giziIbu || null,
      kebiasaanKopi: req.body.kebiasaanKopi || null,
      minumanAlkohol: req.body.minumanAlkohol || null,
      kebiasaanMerokok: req.body.kebiasaanMerokok || null,
      narkoba: req.body.narkoba || null,
      kondisiPayudara: req.body.kondisiPayudara || null,
      penggunaanKB: req.body.penggunaanKB || null,
      keteranganKB: req.body.keteranganKB || null,
      motivasiMenyusui: req.body.motivasiMenyusui || null,

      // Pengalaman Menyusui Bayi/Anak Sebelumnya
      jumlahAnakSebelumnya: req.body.jumlahAnakSebelumnya || null,
      jumlahAnakDisusui: req.body.jumlahAnakDisusui || null,
      riwayatASIEksklusif: req.body.riwayatASIEksklusif || null,
      cairanTambahanSebelumnyaKapanDimulai: req.body.cairanTambahanSebelumnya?.kapanDimulai || null,
      cairanTambahanSebelumnyaApaYangDiberikan: req.body.cairanTambahanSebelumnya?.apaYangDiberikan || null,
      cairanTambahanSebelumnyaFrekuensiPemberian: req.body.cairanTambahanSebelumnya?.frekuensiPemberian || null,
      cairanTambahanSebelumnyaBerapaBanyak: req.body.cairanTambahanSebelumnya?.berapaBanyak || null,
      makananTambahanSebelumnyaKapanDimulai: req.body.makananTambahanSebelumnya?.kapanDimulai || null,
      makananTambahanSebelumnyaApaYangDiberikan: req.body.makananTambahanSebelumnya?.apaYangDiberikan || null,
      makananTambahanSebelumnyaFrekuensiPemberian: req.body.makananTambahanSebelumnya?.frekuensiPemberian || null,
      makananTambahanSebelumnyaBerapaBanyak: req.body.makananTambahanSebelumnya?.berapaBanyak || null,
      menggunakanBotolSebelumnya: req.body.menggunakanBotolSebelumnya || null,
      alasanBotol: req.body.alasanBotol || null,

      // Situasi Keluarga & Sosial
      pekerjaanOrangTua: req.body.pekerjaanOrangTua || null,
      keadaanEkonomi: req.body.keadaanEkonomi || null,
      pendidikanOrangTua: req.body.pendidikanOrangTua || null,
      sikapKeluarga: req.body.sikapKeluarga || null,
      bantuanPerawatanAnak: req.body.bantuanPerawatanAnak || null,

      // Interpretasi KMS
      pertumbuhanSesuaiKurva: req.body.pertumbuhanSesuaiKurva || null,
    };

    // Check if record already exists
    const existingKajian = await prisma.kajianRiwayatMenyusui.findUnique({
      where: { no_registrasi }
    });

    let kajian;
    if (existingKajian) {
      // Update existing record
      kajian = await prisma.kajianRiwayatMenyusui.update({
        where: { no_registrasi },
        data
      });
    } else {
      // Create new record
      kajian = await prisma.kajianRiwayatMenyusui.create({
        data
      });
    }

    res.status(200).json({
      success: true,
      message: existingKajian ? 'Data berhasil diperbarui' : 'Data berhasil disimpan',
      data: kajian
    });

  } catch (error) {
    console.error('Error saving kajian riwayat menyusui:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menyimpan data',
      error: error.message
    });
  }
};

// Get Kajian Riwayat Menyusui by No Registrasi
const getKajianRiwayatMenyusuiByNoRegistrasi = async (req, res) => {
  try {
    const { no_registrasi } = req.params;

    const kajian = await prisma.kajianRiwayatMenyusui.findUnique({
      where: { no_registrasi }
    });

    if (!kajian) {
      return res.status(404).json({
        success: false,
        message: 'Data kajian riwayat menyusui tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: kajian
    });

  } catch (error) {
    console.error('Error fetching kajian riwayat menyusui:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
      error: error.message
    });
  }
};

// Get all Kajian Riwayat Menyusui
const getAllKajianRiwayatMenyusui = async (req, res) => {
  try {
    const kajianList = await prisma.kajianRiwayatMenyusui.findMany({
      include: {
        registrasi: {
          include: {
            pasien: true,
            user: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: kajianList
    });

  } catch (error) {
    console.error('Error fetching all kajian riwayat menyusui:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
      error: error.message
    });
  }
};

module.exports = {
  createOrUpdateKajianRiwayatMenyusui,
  getKajianRiwayatMenyusuiByNoRegistrasi,
  getAllKajianRiwayatMenyusui
};
