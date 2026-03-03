import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const KajianRiwayatMenyusui = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noRegistrasi = searchParams.get('no_registrasi');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Pemberian Makan Bayi Sekarang
    pemberianMakan: {
      asi: false,
      susuLain: false,
      keteranganSusuLain: '',
    },
    frekuensiMenyusui: '',
    keteranganFrekuensiMenyusui: '',
    lamaMenyusui: '',
    menyusui: '',
    menyusuiMalamHari: '',
    jumlahFrekuensiSusuLain: '',
    cairanTambahan: {
      kapanDimulai: '',
      apaYangDiberikan: '',
      frekuensiPemberian: '',
      berapaBanyak: '',
    },
    makananTambahan: {
      kapanDimulai: '',
      apaYangDiberikan: '',
      frekuensiPemberian: '',
      berapaBanyak: '',
    },
    menggunakanBotol: '',
    keteranganBotol: '',

    // Kesehatan & Perilaku Bayi
    bbSaatLahir: '',
    bbSaatIni: '',
    perubahanBB: '',
    jenisKelahiran: {
      prematur: false,
      kembar: false,
    },
    frekuensiBAK: '',
    warnaBAK: '',
    frekuensiBAB: '',
    kosistensiBAB: '',
    perilakuMakan: '',
    perilakuTidur: '',
    perilakuMenangis: '',
    riwayatSakit: '',
    kelainanBawaan: '',

    // Kehamilan, Kelahiran dan Pemberian Makan Bayi
    tempatANC: {
      rs: false,
      tpmb: false,
      puskesmas: false,
      polindes: false,
      lainnya: false,
      keteranganLainnya: '',
    },
    yangMelakukanANC: {
      dokterKandungan: false,
      bidan: false,
      dokterUmum: false,
      lainnya: false,
      keteranganLainnya: '',
    },
    diskusiPemberianMakan: '',
    jenisPersalinan: '',
    riwayatIMD: '',
    menyusui1Jam: '',
    rawatGabung: '',
    pemberianPrelaktal: '',
    bantuanMenyusui: '',
    menerimaSampleFormula: '',

    // Kondisi Ibu & KB
    riwayatKesehatanIbu: '',
    obatDikonsumsi: '',
    giziIbu: '',
    kebiasaanKopi: '',
    minumanAlkohol: '',
    kebiasaanMerokok: '',
    narkoba: '',
    kondisiPayudara: '',
    penggunaanKB: '',
    keteranganKB: '',
    motivasiMenyusui: '',

    // Pengalaman Menyusui Bayi/Anak Sebelumnya
    jumlahAnakSebelumnya: '',
    jumlahAnakDisusui: '',
    riwayatASIEksklusif: '',
    cairanTambahanSebelumnya: {
      kapanDimulai: '',
      apaYangDiberikan: '',
      frekuensiPemberian: '',
      berapaBanyak: '',
    },
    makananTambahanSebelumnya: {
      kapanDimulai: '',
      apaYangDiberikan: '',
      frekuensiPemberian: '',
      berapaBanyak: '',
    },
    menggunakanBotolSebelumnya: '',
    alasanBotol: '',

    // Situasi Keluarga & Sosial
    pekerjaanOrangTua: '',
    keadaanEkonomi: '',
    pendidikanOrangTua: '',
    sikapKeluarga: '',
    bantuanPerawatanAnak: '',

    // Interpretasi KMS
    pertumbuhanSesuaiKurva: '',
  });

  // Load existing data if available
  useEffect(() => {
    if (noRegistrasi) {
      fetchKajianData();
    }
  }, [noRegistrasi]);

  // Calculate weight change when BB changes
  useEffect(() => {
    if (formData.bbSaatLahir && formData.bbSaatIni) {
      const lahir = parseInt(formData.bbSaatLahir) || 0;
      const sekarang = parseInt(formData.bbSaatIni) || 0;
      const selisih = sekarang - lahir;
      const tanda = selisih >= 0 ? '+' : '';
      setFormData((prev) => ({
        ...prev,
        perubahanBB: `${tanda}${selisih}`,
      }));
    }
  }, [formData.bbSaatLahir, formData.bbSaatIni]);

  const fetchKajianData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/kajian-riwayat-menyusui/no-registrasi/${noRegistrasi}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setFormData({
          // Pemberian Makan Bayi Sekarang
          pemberianMakan: {
            asi: data.pemberianMakanASI || false,
            susuLain: data.pemberianMakanSusuLain || false,
            keteranganSusuLain: data.keteranganSusuLain || '',
          },
          frekuensiMenyusui: data.frekuensiMenyusui || '',
          keteranganFrekuensiMenyusui: data.keteranganFrekuensiMenyusui || '',
          lamaMenyusui: data.lamaMenyusui || '',
          menyusui: data.menyusui || '',
          menyusuiMalamHari: data.menyusuiMalamHari || '',
          jumlahFrekuensiSusuLain: data.jumlahFrekuensiSusuLain || '',
          cairanTambahan: {
            kapanDimulai: data.cairanTambahanKapanDimulai || '',
            apaYangDiberikan: data.cairanTambahanApaYangDiberikan || '',
            frekuensiPemberian: data.cairanTambahanFrekuensiPemberian || '',
            berapaBanyak: data.cairanTambahanBerapaBanyak || '',
          },
          makananTambahan: {
            kapanDimulai: data.makananTambahanKapanDimulai || '',
            apaYangDiberikan: data.makananTambahanApaYangDiberikan || '',
            frekuensiPemberian: data.makananTambahanFrekuensiPemberian || '',
            berapaBanyak: data.makananTambahanBerapaBanyak || '',
          },
          menggunakanBotol: data.menggunakanBotol || '',
          keteranganBotol: data.keteranganBotol || '',

          // Kesehatan & Perilaku Bayi
          bbSaatLahir: data.bbSaatLahir?.toString() || '',
          bbSaatIni: data.bbSaatIni?.toString() || '',
          perubahanBB: data.perubahanBB || '',
          jenisKelahiran: {
            prematur: data.jenisKelahiranPrematur || false,
            kembar: data.jenisKelahiranKembar || false,
          },
          frekuensiBAK: data.frekuensiBAK || '',
          warnaBAK: data.warnaBAK || '',
          frekuensiBAB: data.frekuensiBAB || '',
          kosistensiBAB: data.kosistensiBAB || '',
          perilakuMakan: data.perilakuMakan || '',
          perilakuTidur: data.perilakuTidur || '',
          perilakuMenangis: data.perilakuMenangis || '',
          riwayatSakit: data.riwayatSakit || '',
          kelainanBawaan: data.kelainanBawaan || '',

          // Kehamilan, Kelahiran dan Pemberian Makan Bayi
          tempatANC: {
            rs: data.tempatANCRS || false,
            tpmb: data.tempatANCTPMB || false,
            puskesmas: data.tempatANCPuskesmas || false,
            polindes: data.tempatANCPolindes || false,
            lainnya: data.tempatANCLainnya || false,
            keteranganLainnya: data.tempatANCKeteranganLainnya || '',
          },
          yangMelakukanANC: {
            dokterKandungan: data.yangMelakukanANCDokterKandungan || false,
            bidan: data.yangMelakukanANCBidan || false,
            dokterUmum: data.yangMelakukanANCDokterUmum || false,
            lainnya: data.yangMelakukanANCLainnya || false,
            keteranganLainnya: data.yangMelakukanANCKeteranganLainnya || '',
          },
          diskusiPemberianMakan: data.diskusiPemberianMakan || '',
          jenisPersalinan: data.jenisPersalinan || '',
          riwayatIMD: data.riwayatIMD || '',
          menyusui1Jam: data.menyusui1Jam || '',
          rawatGabung: data.rawatGabung || '',
          pemberianPrelaktal: data.pemberianPrelaktal || '',
          bantuanMenyusui: data.bantuanMenyusui || '',
          menerimaSampleFormula: data.menerimaSampleFormula || '',

          // Kondisi Ibu & KB
          riwayatKesehatanIbu: data.riwayatKesehatanIbu || '',
          obatDikonsumsi: data.obatDikonsumsi || '',
          giziIbu: data.giziIbu || '',
          kebiasaanKopi: data.kebiasaanKopi || '',
          minumanAlkohol: data.minumanAlkohol || '',
          kebiasaanMerokok: data.kebiasaanMerokok || '',
          narkoba: data.narkoba || '',
          kondisiPayudara: data.kondisiPayudara || '',
          penggunaanKB: data.penggunaanKB || '',
          keteranganKB: data.keteranganKB || '',
          motivasiMenyusui: data.motivasiMenyusui || '',

          // Pengalaman Menyusui Bayi/Anak Sebelumnya
          jumlahAnakSebelumnya: data.jumlahAnakSebelumnya || '',
          jumlahAnakDisusui: data.jumlahAnakDisusui || '',
          riwayatASIEksklusif: data.riwayatASIEksklusif || '',
          cairanTambahanSebelumnya: {
            kapanDimulai: data.cairanTambahanSebelumnyaKapanDimulai || '',
            apaYangDiberikan: data.cairanTambahanSebelumnyaApaYangDiberikan || '',
            frekuensiPemberian: data.cairanTambahanSebelumnyaFrekuensiPemberian || '',
            berapaBanyak: data.cairanTambahanSebelumnyaBerapaBanyak || '',
          },
          makananTambahanSebelumnya: {
            kapanDimulai: data.makananTambahanSebelumnyaKapanDimulai || '',
            apaYangDiberikan: data.makananTambahanSebelumnyaApaYangDiberikan || '',
            frekuensiPemberian: data.makananTambahanSebelumnyaFrekuensiPemberian || '',
            berapaBanyak: data.makananTambahanSebelumnyaBerapaBanyak || '',
          },
          menggunakanBotolSebelumnya: data.menggunakanBotolSebelumnya || '',
          alasanBotol: data.alasanBotol || '',

          // Situasi Keluarga & Sosial
          pekerjaanOrangTua: data.pekerjaanOrangTua || '',
          keadaanEkonomi: data.keadaanEkonomi || '',
          pendidikanOrangTua: data.pendidikanOrangTua || '',
          sikapKeluarga: data.sikapKeluarga || '',
          bantuanPerawatanAnak: data.bantuanPerawatanAnak || '',

          // Interpretasi KMS
          pertumbuhanSesuaiKurva: data.pertumbuhanSesuaiKurva || '',
        });
      }
    } catch (err) {
      // Data not found or error - start with empty form
      console.log('No existing data found or error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate weight change when BB changes
  useEffect(() => {
    if (formData.bbSaatLahir && formData.bbSaatIni) {
      const lahir = parseInt(formData.bbSaatLahir) || 0;
      const sekarang = parseInt(formData.bbSaatIni) || 0;
      const selisih = sekarang - lahir;
      const tanda = selisih >= 0 ? '+' : '';
      setFormData((prev) => ({
        ...prev,
        perubahanBB: `${tanda}${selisih}`,
      }));
    }
  }, [formData.bbSaatLahir, formData.bbSaatIni]);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleCheckboxChange = (section, field, checked) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/kajian-riwayat-menyusui', {
        no_registrasi: noRegistrasi,
        ...formData,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        alert(response.data.message);
        // Stay on same page or navigate as needed
        navigate(`/formulir/kajian-riwayat-menyusui?no_registrasi=${noRegistrasi}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      const errorMessage = error.response?.data?.message || 'Gagal menyimpan data. Silakan coba lagi.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/antrian`);
  };

  if (loading && !formData.pemberianMakan) {
    return (
      <div className="kajian-riwayat-menyusui-content">
        <div className="loading">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="kajian-riwayat-menyusui-content">
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Pemberian Makan Bayi Sekarang */}
        <div className="form-section">
          <h3 className="section-title">Pemberian Makan Bayi Sekarang</h3>

          <div className="form-group">
            <label>1. Pemberian Makan</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.pemberianMakan.asi}
                  onChange={(e) =>
                    handleCheckboxChange('pemberianMakan', 'asi', e.target.checked)
                  }
                />
                ASI
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.pemberianMakan.susuLain}
                  onChange={(e) =>
                    handleCheckboxChange('pemberianMakan', 'susuLain', e.target.checked)
                  }
                />
                Susu Lain
              </label>
              {formData.pemberianMakan.susuLain && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Keterangan"
                  value={formData.pemberianMakan.keteranganSusuLain}
                  onChange={(e) =>
                    handleInputChange('pemberianMakan', 'keteranganSusuLain', e.target.value)
                  }
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>2. Frekuensi Menyusui</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiMenyusui"
                  value="<8x/hari"
                  checked={formData.frekuensiMenyusui === '<8x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiMenyusui', e.target.value)}
                />
                &lt;8x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiMenyusui"
                  value="8-12x/hari"
                  checked={formData.frekuensiMenyusui === '8-12x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiMenyusui', e.target.value)}
                />
                8-12x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiMenyusui"
                  value=">12x/hari"
                  checked={formData.frekuensiMenyusui === '>12x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiMenyusui', e.target.value)}
                />
                &gt;12x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiMenyusui"
                  value="lain"
                  checked={formData.frekuensiMenyusui === 'lain'}
                  onChange={(e) => handleInputChange(null, 'frekuensiMenyusui', e.target.value)}
                />
                Lain
              </label>
              {formData.frekuensiMenyusui === 'lain' && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Keterangan"
                  value={formData.keteranganFrekuensiMenyusui}
                  onChange={(e) =>
                    handleInputChange(null, 'keteranganFrekuensiMenyusui', e.target.value)
                  }
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>3. Lama Menyusui</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="lamaMenyusui"
                  value="<10 menit"
                  checked={formData.lamaMenyusui === '<10 menit'}
                  onChange={(e) => handleInputChange(null, 'lamaMenyusui', e.target.value)}
                />
                &lt;10 menit
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="lamaMenyusui"
                  value="10-30 menit"
                  checked={formData.lamaMenyusui === '10-30 menit'}
                  onChange={(e) => handleInputChange(null, 'lamaMenyusui', e.target.value)}
                />
                10-30 menit
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="lamaMenyusui"
                  value=">30 menit"
                  checked={formData.lamaMenyusui === '>30 menit'}
                  onChange={(e) => handleInputChange(null, 'lamaMenyusui', e.target.value)}
                />
                &gt;30 menit
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>4. Menyusui</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="menyusui"
                  value="satu payudara"
                  checked={formData.menyusui === 'satu payudara'}
                  onChange={(e) => handleInputChange(null, 'menyusui', e.target.value)}
                />
                Di satu payudara
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="menyusui"
                  value="kedua payudara"
                  checked={formData.menyusui === 'kedua payudara'}
                  onChange={(e) => handleInputChange(null, 'menyusui', e.target.value)}
                />
                Di kedua payudara
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>5. Menyusui Waktu Malam Hari</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="menyusuiMalamHari"
                  value="Ya"
                  checked={formData.menyusuiMalamHari === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'menyusuiMalamHari', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="menyusuiMalamHari"
                  value="Tidak"
                  checked={formData.menyusuiMalamHari === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'menyusuiMalamHari', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>6. Jumlah dan Frekuensi Pemberian Susu Lain</label>
            <input
              type="text"
              className="form-control"
              value={formData.jumlahFrekuensiSusuLain}
              onChange={(e) => handleInputChange(null, 'jumlahFrekuensiSusuLain', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>7. Cairan Lain sebagai Tambahan ASI</label>
            <div className="form-subgroup">
              <input
                type="text"
                className="form-control"
                placeholder="a. Kapan dimulai"
                value={formData.cairanTambahan.kapanDimulai}
                onChange={(e) =>
                  handleInputChange('cairanTambahan', 'kapanDimulai', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="b. Apa yang diberikan"
                value={formData.cairanTambahan.apaYangDiberikan}
                onChange={(e) =>
                  handleInputChange('cairanTambahan', 'apaYangDiberikan', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="c. Frekuensi pemberian"
                value={formData.cairanTambahan.frekuensiPemberian}
                onChange={(e) =>
                  handleInputChange('cairanTambahan', 'frekuensiPemberian', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="d. Berapa banyak diberikan sekali minum"
                value={formData.cairanTambahan.berapaBanyak}
                onChange={(e) =>
                  handleInputChange('cairanTambahan', 'berapaBanyak', e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>8. Makanan Lain sebagai Tambahan ASI</label>
            <div className="form-subgroup">
              <input
                type="text"
                className="form-control"
                placeholder="a. Kapan dimulai"
                value={formData.makananTambahan.kapanDimulai}
                onChange={(e) =>
                  handleInputChange('makananTambahan', 'kapanDimulai', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="b. Apa yang diberikan"
                value={formData.makananTambahan.apaYangDiberikan}
                onChange={(e) =>
                  handleInputChange('makananTambahan', 'apaYangDiberikan', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="c. Frekuensi pemberian"
                value={formData.makananTambahan.frekuensiPemberian}
                onChange={(e) =>
                  handleInputChange('makananTambahan', 'frekuensiPemberian', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="d. Berapa banyak diberikan sekali makan"
                value={formData.makananTambahan.berapaBanyak}
                onChange={(e) =>
                  handleInputChange('makananTambahan', 'berapaBanyak', e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>9. Apakah Menggunakan Botol/DOT/Empeng?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="menggunakanBotol"
                  value="Ya"
                  checked={formData.menggunakanBotol === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'menggunakanBotol', e.target.value)}
                />
                Ya
              </label>
              {formData.menggunakanBotol === 'Ya' && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Bagaimana membersihkannya?"
                  value={formData.keteranganBotol}
                  onChange={(e) => handleInputChange(null, 'keteranganBotol', e.target.value)}
                />
              )}
              <label className="radio-label">
                <input
                  type="radio"
                  name="menggunakanBotol"
                  value="Tidak"
                  checked={formData.menggunakanBotol === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'menggunakanBotol', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>
        </div>

        {/* Kesehatan & Perilaku Bayi */}
        <div className="form-section">
          <h3 className="section-title">Kesehatan & Perilaku Bayi</h3>

          <div className="form-row-double">
            <div className="form-group">
              <label>1. BB Saat Lahir (gram)</label>
              <input
                type="number"
                className="form-control"
                value={formData.bbSaatLahir}
                onChange={(e) => handleInputChange(null, 'bbSaatLahir', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>BB Saat Ini (gram)</label>
              <input
                type="number"
                className="form-control"
                value={formData.bbSaatIni}
                onChange={(e) => handleInputChange(null, 'bbSaatIni', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Perubahan BB (gram)</label>
            <input
              type="text"
              className="form-control"
              value={formData.perubahanBB}
              disabled
              placeholder="Otomatis terisi"
            />
          </div>

          <div className="form-group">
            <label>2. Jenis Kelahiran</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.jenisKelahiran.prematur}
                  onChange={(e) =>
                    handleCheckboxChange('jenisKelahiran', 'prematur', e.target.checked)
                  }
                />
                Prematur
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.jenisKelahiran.kembar}
                  onChange={(e) =>
                    handleCheckboxChange('jenisKelahiran', 'kembar', e.target.checked)
                  }
                />
                Kembar
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>3. Frekuensi BAK</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAK"
                  value="<6x/hari"
                  checked={formData.frekuensiBAK === '<6x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAK', e.target.value)}
                />
                &lt;6x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAK"
                  value=">6x/hari"
                  checked={formData.frekuensiBAK === '>6x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAK', e.target.value)}
                />
                &gt;6x/hari
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>4. Warna BAK</label>
            <input
              type="text"
              className="form-control"
              value={formData.warnaBAK}
              onChange={(e) => handleInputChange(null, 'warnaBAK', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>5. Frekuensi BAB</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAB"
                  value="1x/hari"
                  checked={formData.frekuensiBAB === '1x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAB', e.target.value)}
                />
                1x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAB"
                  value="2-5x/hari"
                  checked={formData.frekuensiBAB === '2-5x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAB', e.target.value)}
                />
                2-5x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAB"
                  value=">5x/hari"
                  checked={formData.frekuensiBAB === '>5x/hari'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAB', e.target.value)}
                />
                &gt;5x/hari
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAB"
                  value="2-3 hari sekali"
                  checked={formData.frekuensiBAB === '2-3 hari sekali'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAB', e.target.value)}
                />
                2-3 hari sekali
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="frekuensiBAB"
                  value=">7 hari sekali"
                  checked={formData.frekuensiBAB === '>7 hari sekali'}
                  onChange={(e) => handleInputChange(null, 'frekuensiBAB', e.target.value)}
                />
                &gt;7 hari sekali
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>6. Kosistensi BAB</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="kosistensiBAB"
                  value="cair"
                  checked={formData.kosistensiBAB === 'cair'}
                  onChange={(e) => handleInputChange(null, 'kosistensiBAB', e.target.value)}
                />
                Cair
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="kosistensiBAB"
                  value="lunak"
                  checked={formData.kosistensiBAB === 'lunak'}
                  onChange={(e) => handleInputChange(null, 'kosistensiBAB', e.target.value)}
                />
                Lunak
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="kosistensiBAB"
                  value="padat"
                  checked={formData.kosistensiBAB === 'padat'}
                  onChange={(e) => handleInputChange(null, 'kosistensiBAB', e.target.value)}
                />
                Padat
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>7. Perilaku Makan Bayi</label>
            <input
              type="text"
              className="form-control"
              value={formData.perilakuMakan}
              onChange={(e) => handleInputChange(null, 'perilakuMakan', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>8. Perilaku Tidur Bayi</label>
            <input
              type="text"
              className="form-control"
              value={formData.perilakuTidur}
              onChange={(e) => handleInputChange(null, 'perilakuTidur', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>9. Perilaku Menangis Bayi</label>
            <input
              type="text"
              className="form-control"
              value={formData.perilakuMenangis}
              onChange={(e) => handleInputChange(null, 'perilakuMenangis', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>10. Riwayat Sakit/Penyakit</label>
            <input
              type="text"
              className="form-control"
              value={formData.riwayatSakit}
              onChange={(e) => handleInputChange(null, 'riwayatSakit', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>11. Kelainan Bawaan</label>
            <input
              type="text"
              className="form-control"
              value={formData.kelainanBawaan}
              onChange={(e) => handleInputChange(null, 'kelainanBawaan', e.target.value)}
            />
          </div>
        </div>

        {/* Kehamilan, Kelahiran dan Pemberian Makan Bayi */}
        <div className="form-section">
          <h3 className="section-title">Kehamilan, Kelahiran dan Pemberian Makan Bayi</h3>

          <div className="form-group">
            <label>1. Tempat ANC / Perawatan Kehamilan</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.tempatANC.rs}
                  onChange={(e) => handleCheckboxChange('tempatANC', 'rs', e.target.checked)}
                />
                RS
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.tempatANC.tpmb}
                  onChange={(e) => handleCheckboxChange('tempatANC', 'tpmb', e.target.checked)}
                />
                TPMB
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.tempatANC.puskesmas}
                  onChange={(e) =>
                    handleCheckboxChange('tempatANC', 'puskesmas', e.target.checked)
                  }
                />
                PUSKESMAS
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.tempatANC.polindes}
                  onChange={(e) => handleCheckboxChange('tempatANC', 'polindes', e.target.checked)}
                />
                POLINDES
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.tempatANC.lainnya}
                  onChange={(e) => handleCheckboxChange('tempatANC', 'lainnya', e.target.checked)}
                />
                Lainnya
              </label>
              {formData.tempatANC.lainnya && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Keterangan"
                  value={formData.tempatANC.keteranganLainnya}
                  onChange={(e) =>
                    handleInputChange('tempatANC', 'keteranganLainnya', e.target.value)
                  }
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>2. Yang Melakukan ANC</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.yangMelakukanANC.dokterKandungan}
                  onChange={(e) =>
                    handleCheckboxChange('yangMelakukanANC', 'dokterKandungan', e.target.checked)
                  }
                />
                Dokter Kandungan
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.yangMelakukanANC.bidan}
                  onChange={(e) =>
                    handleCheckboxChange('yangMelakukanANC', 'bidan', e.target.checked)
                  }
                />
                Bidan
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.yangMelakukanANC.dokterUmum}
                  onChange={(e) =>
                    handleCheckboxChange('yangMelakukanANC', 'dokterUmum', e.target.checked)
                  }
                />
                Dokter Umum
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.yangMelakukanANC.lainnya}
                  onChange={(e) =>
                    handleCheckboxChange('yangMelakukanANC', 'lainnya', e.target.checked)
                  }
                />
                Lainnya
              </label>
              {formData.yangMelakukanANC.lainnya && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Keterangan"
                  value={formData.yangMelakukanANC.keteranganLainnya}
                  onChange={(e) =>
                    handleInputChange('yangMelakukanANC', 'keteranganLainnya', e.target.value)
                  }
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>3. Diskusi tentang Pemberian Makan saat ANC</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="diskusiPemberianMakan"
                  value="Pernah"
                  checked={formData.diskusiPemberianMakan === 'Pernah'}
                  onChange={(e) =>
                    handleInputChange(null, 'diskusiPemberianMakan', e.target.value)
                  }
                />
                Pernah
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="diskusiPemberianMakan"
                  value="Belum"
                  checked={formData.diskusiPemberianMakan === 'Belum'}
                  onChange={(e) =>
                    handleInputChange(null, 'diskusiPemberianMakan', e.target.value)
                  }
                />
                Belum
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>4. Jenis Persalinan</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="jenisPersalinan"
                  value="Normal"
                  checked={formData.jenisPersalinan === 'Normal'}
                  onChange={(e) => handleInputChange(null, 'jenisPersalinan', e.target.value)}
                />
                Persalinan Normal
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="jenisPersalinan"
                  value="SC"
                  checked={formData.jenisPersalinan === 'SC'}
                  onChange={(e) => handleInputChange(null, 'jenisPersalinan', e.target.value)}
                />
                Persalinan SC
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>5. Riwayat IMD</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="riwayatIMD"
                  value="Ya"
                  checked={formData.riwayatIMD === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'riwayatIMD', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="riwayatIMD"
                  value="Tidak"
                  checked={formData.riwayatIMD === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'riwayatIMD', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>6. Menyusui dalam 1 Jam Pertama</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="menyusui1Jam"
                  value="Ya"
                  checked={formData.menyusui1Jam === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'menyusui1Jam', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="menyusui1Jam"
                  value="Tidak"
                  checked={formData.menyusui1Jam === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'menyusui1Jam', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>7. Rawat Gabung</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="rawatGabung"
                  value="Ya"
                  checked={formData.rawatGabung === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'rawatGabung', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="rawatGabung"
                  value="Tidak"
                  checked={formData.rawatGabung === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'rawatGabung', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>8. Pemberian Makanan Prelaktal Bayi</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="pemberianPrelaktal"
                  value="Ya"
                  checked={formData.pemberianPrelaktal === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'pemberianPrelaktal', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="pemberianPrelaktal"
                  value="Tidak"
                  checked={formData.pemberianPrelaktal === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'pemberianPrelaktal', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>9. Bantuan Menyusui Setelah Melahirkan</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="bantuanMenyusui"
                  value="Ya"
                  checked={formData.bantuanMenyusui === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'bantuanMenyusui', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="bantuanMenyusui"
                  value="Tidak"
                  checked={formData.bantuanMenyusui === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'bantuanMenyusui', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>10. Menerima Sample Formula yang Diberikan kepada Ibu</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="menerimaSampleFormula"
                  value="Ya"
                  checked={formData.menerimaSampleFormula === 'Ya'}
                  onChange={(e) =>
                    handleInputChange(null, 'menerimaSampleFormula', e.target.value)
                  }
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="menerimaSampleFormula"
                  value="Tidak"
                  checked={formData.menerimaSampleFormula === 'Tidak'}
                  onChange={(e) =>
                    handleInputChange(null, 'menerimaSampleFormula', e.target.value)
                  }
                />
                Tidak
              </label>
            </div>
          </div>
        </div>

        {/* Kondisi Ibu & KB */}
        <div className="form-section">
          <h3 className="section-title">Kondisi Ibu & KB</h3>

          <div className="form-group">
            <label>1. Riwayat Kesehatan Ibu</label>
            <input
              type="text"
              className="form-control"
              value={formData.riwayatKesehatanIbu}
              onChange={(e) => handleInputChange(null, 'riwayatKesehatanIbu', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>2. Obat yang Biasa Dikonsumsi</label>
            <input
              type="text"
              className="form-control"
              value={formData.obatDikonsumsi}
              onChange={(e) => handleInputChange(null, 'obatDikonsumsi', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>3. Gizi Ibu (Pola Makan)</label>
            <input
              type="text"
              className="form-control"
              value={formData.giziIbu}
              onChange={(e) => handleInputChange(null, 'giziIbu', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>4. Kebiasaan Minum Kopi</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="kebiasaanKopi"
                  value="Ya"
                  checked={formData.kebiasaanKopi === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'kebiasaanKopi', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="kebiasaanKopi"
                  value="Tidak"
                  checked={formData.kebiasaanKopi === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'kebiasaanKopi', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>5. Mengkonsumsi Minuman Beralkohol</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="minumanAlkohol"
                  value="Ya"
                  checked={formData.minumanAlkohol === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'minumanAlkohol', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="minumanAlkohol"
                  value="Tidak"
                  checked={formData.minumanAlkohol === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'minumanAlkohol', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>6. Kebiasaan Merokok</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="kebiasaanMerokok"
                  value="Ya"
                  checked={formData.kebiasaanMerokok === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'kebiasaanMerokok', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="kebiasaanMerokok"
                  value="Tidak"
                  checked={formData.kebiasaanMerokok === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'kebiasaanMerokok', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>7. Menggunakan Narkoba</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="narkoba"
                  value="Ya"
                  checked={formData.narkoba === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'narkoba', e.target.value)}
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="narkoba"
                  value="Tidak"
                  checked={formData.narkoba === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'narkoba', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>8. Kondisi Payudara</label>
            <input
              type="text"
              className="form-control"
              value={formData.kondisiPayudara}
              onChange={(e) => handleInputChange(null, 'kondisiPayudara', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>9. Penggunaan KB</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="penggunaanKB"
                  value="Ya"
                  checked={formData.penggunaanKB === 'Ya'}
                  onChange={(e) => handleInputChange(null, 'penggunaanKB', e.target.value)}
                />
                Ya
              </label>
              {formData.penggunaanKB === 'Ya' && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Sebutkan"
                  value={formData.keteranganKB}
                  onChange={(e) => handleInputChange(null, 'keteranganKB', e.target.value)}
                />
              )}
              <label className="radio-label">
                <input
                  type="radio"
                  name="penggunaanKB"
                  value="Tidak"
                  checked={formData.penggunaanKB === 'Tidak'}
                  onChange={(e) => handleInputChange(null, 'penggunaanKB', e.target.value)}
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>10. Motivasi Menyusui</label>
            <input
              type="text"
              className="form-control"
              value={formData.motivasiMenyusui}
              onChange={(e) => handleInputChange(null, 'motivasiMenyusui', e.target.value)}
            />
          </div>
        </div>

        {/* Pengalaman Menyusui Bayi/Anak Sebelumnya */}
        <div className="form-section">
          <h3 className="section-title">Pengalaman Menyusui Bayi/Anak Sebelumnya</h3>

          <div className="form-group">
            <label>1. Jumlah Anak Sebelumnya</label>
            <input
              type="text"
              className="form-control"
              value={formData.jumlahAnakSebelumnya}
              onChange={(e) => handleInputChange(null, 'jumlahAnakSebelumnya', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>2. Berapa Jumlah Anak yang Disusui dan Berapa Lama</label>
            <input
              type="text"
              className="form-control"
              value={formData.jumlahAnakDisusui}
              onChange={(e) => handleInputChange(null, 'jumlahAnakDisusui', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>3. Riwayat ASI Eksklusif</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="riwayatASIEksklusif"
                  value="Ya"
                  checked={formData.riwayatASIEksklusif === 'Ya'}
                  onChange={(e) =>
                    handleInputChange(null, 'riwayatASIEksklusif', e.target.value)
                  }
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="riwayatASIEksklusif"
                  value="Tidak"
                  checked={formData.riwayatASIEksklusif === 'Tidak'}
                  onChange={(e) =>
                    handleInputChange(null, 'riwayatASIEksklusif', e.target.value)
                  }
                />
                Tidak
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>4. Cairan Lain sebagai Tambahan ASI</label>
            <div className="form-subgroup">
              <input
                type="text"
                className="form-control"
                placeholder="a. Kapan dimulai"
                value={formData.cairanTambahanSebelumnya.kapanDimulai}
                onChange={(e) =>
                  handleInputChange('cairanTambahanSebelumnya', 'kapanDimulai', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="b. Apa yang diberikan"
                value={formData.cairanTambahanSebelumnya.apaYangDiberikan}
                onChange={(e) =>
                  handleInputChange('cairanTambahanSebelumnya', 'apaYangDiberikan', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="c. Frekuensi pemberian"
                value={formData.cairanTambahanSebelumnya.frekuensiPemberian}
                onChange={(e) =>
                  handleInputChange(
                    'cairanTambahanSebelumnya',
                    'frekuensiPemberian',
                    e.target.value
                  )
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="d. Berapa banyak diberikan sekali minum"
                value={formData.cairanTambahanSebelumnya.berapaBanyak}
                onChange={(e) =>
                  handleInputChange('cairanTambahanSebelumnya', 'berapaBanyak', e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>5. Makanan Lain sebagai Tambahan ASI</label>
            <div className="form-subgroup">
              <input
                type="text"
                className="form-control"
                placeholder="a. Kapan dimulai"
                value={formData.makananTambahanSebelumnya.kapanDimulai}
                onChange={(e) =>
                  handleInputChange('makananTambahanSebelumnya', 'kapanDimulai', e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="b. Apa yang diberikan"
                value={formData.makananTambahanSebelumnya.apaYangDiberikan}
                onChange={(e) =>
                  handleInputChange(
                    'makananTambahanSebelumnya',
                    'apaYangDiberikan',
                    e.target.value
                  )
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="c. Frekuensi pemberian"
                value={formData.makananTambahanSebelumnya.frekuensiPemberian}
                onChange={(e) =>
                  handleInputChange(
                    'makananTambahanSebelumnya',
                    'frekuensiPemberian',
                    e.target.value
                  )
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="d. Berapa banyak diberikan sekali makan"
                value={formData.makananTambahanSebelumnya.berapaBanyak}
                onChange={(e) =>
                  handleInputChange('makananTambahanSebelumnya', 'berapaBanyak', e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>6. Apakah Menggunakan Botol/DOT/Empeng?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="menggunakanBotolSebelumnya"
                  value="Ya"
                  checked={formData.menggunakanBotolSebelumnya === 'Ya'}
                  onChange={(e) =>
                    handleInputChange(null, 'menggunakanBotolSebelumnya', e.target.value)
                  }
                />
                Ya
              </label>
              {formData.menggunakanBotolSebelumnya === 'Ya' && (
                <input
                  type="text"
                  className="form-control-inline"
                  placeholder="Alasan"
                  value={formData.alasanBotol}
                  onChange={(e) => handleInputChange(null, 'alasanBotol', e.target.value)}
                />
              )}
              <label className="radio-label">
                <input
                  type="radio"
                  name="menggunakanBotolSebelumnya"
                  value="Tidak"
                  checked={formData.menggunakanBotolSebelumnya === 'Tidak'}
                  onChange={(e) =>
                    handleInputChange(null, 'menggunakanBotolSebelumnya', e.target.value)
                  }
                />
                Tidak
              </label>
            </div>
          </div>
        </div>

        {/* Situasi Keluarga & Sosial */}
        <div className="form-section">
          <h3 className="section-title">Situasi Keluarga & Sosial</h3>

          <div className="form-group">
            <label>1. Pekerjaan Orang Tua Bayi</label>
            <input
              type="text"
              className="form-control"
              value={formData.pekerjaanOrangTua}
              onChange={(e) => handleInputChange(null, 'pekerjaanOrangTua', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>2. Keadaan Ekonomi</label>
            <input
              type="text"
              className="form-control"
              value={formData.keadaanEkonomi}
              onChange={(e) => handleInputChange(null, 'keadaanEkonomi', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>3. Pendidikan Terakhir Orang Tua Bayi</label>
            <input
              type="text"
              className="form-control"
              value={formData.pendidikanOrangTua}
              onChange={(e) => handleInputChange(null, 'pendidikanOrangTua', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>4. Sikap dan Perilaku Keluarga terhadap Menyusui</label>
            <input
              type="text"
              className="form-control"
              value={formData.sikapKeluarga}
              onChange={(e) => handleInputChange(null, 'sikapKeluarga', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>5. Bantuan terhadap Perawatan Anak di Rumah</label>
            <input
              type="text"
              className="form-control"
              value={formData.bantuanPerawatanAnak}
              onChange={(e) => handleInputChange(null, 'bantuanPerawatanAnak', e.target.value)}
            />
          </div>
        </div>

        {/* Interpretasi KMS */}
        <div className="form-section">
          <h3 className="section-title">Interpretasi KMS</h3>

          <div className="form-group">
            <label>1. Pertumbuhan Sesuai Kurva Referensi</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="pertumbuhanSesuaiKurva"
                  value="Ya"
                  checked={formData.pertumbuhanSesuaiKurva === 'Ya'}
                  onChange={(e) =>
                    handleInputChange(null, 'pertumbuhanSesuaiKurva', e.target.value)
                  }
                />
                Ya
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="pertumbuhanSesuaiKurva"
                  value="Tidak"
                  checked={formData.pertumbuhanSesuaiKurva === 'Tidak'}
                  onChange={(e) =>
                    handleInputChange(null, 'pertumbuhanSesuaiKurva', e.target.value)
                  }
                />
                Tidak
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KajianRiwayatMenyusui;
