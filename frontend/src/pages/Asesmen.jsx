import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeaderFormulir from './Formulir/HeaderFormulir';
import api from '../services/api';

const Asesmen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noRegistrasi = searchParams.get('no_registrasi');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Data Ibu
    namaIbu: '',
    usiaIbu: '',
    noHP: '',
    alamat: '',
    // Data Bayi
    namaBayi: '',
    tanggalLahirBayi: '',
    jenisKelamin: '',
    beratBadanLahir: '',
    panjangBadan: '',
    usiaKehamilan: '',
    // Riwayat Menyusui
    riwayatMenyusui: '',
    hambatanMenyusui: '',
    frekuensiMenyusui: '',
    durasiMenyusui: '',
    // Pemeriksaan Fisik
    kondisiPayudara: '',
    puttingSusuk: '',
    refleksLetDown: '',
    // Asesmen
    diagnosis: '',
    rencanaTindakLanjut: '',
    edukasi: '',
  });

  useEffect(() => {
    if (noRegistrasi) {
      fetchRegistrasiData();
    }
  }, [noRegistrasi]);

  const fetchRegistrasiData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/registrasi/no-registrasi/${noRegistrasi}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const reg = response.data;
      setFormData(prev => ({
        ...prev,
        namaIbu: reg.namaIbu || '',
        usiaIbu: reg.usiaIbu || '',
        namaBayi: reg.namaBayi || '',
        tanggalLahirBayi: reg.tanggalLahirBayi ? new Date(reg.tanggalLahirBayi).toISOString().split('T')[0] : ''
      }));
    } catch (err) {
      console.error('Error fetching registrasi data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save assessment
    console.log('Form submitted:', formData);
    navigate('/antrian');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Asesmen Konseling Laktasi</h1>
        <p>No. Registrasi: {noRegistrasi || '-'}</p>
      </div>

      <HeaderFormulir />

      <form onSubmit={handleSubmit} className="asesmen-form">
        {/* Data Ibu */}
        <div className="form-section">
          <h3 className="section-title">Data Ibu</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nama Ibu</label>
              <input
                type="text"
                name="namaIbu"
                className="form-control"
                value={formData.namaIbu}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Usia</label>
              <input
                type="number"
                name="usiaIbu"
                className="form-control"
                value={formData.usiaIbu}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>No. HP</label>
              <input
                type="text"
                name="noHP"
                className="form-control"
                value={formData.noHP}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Alamat</label>
              <input
                type="text"
                name="alamat"
                className="form-control"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Data Bayi */}
        <div className="form-section">
          <h3 className="section-title">Data Bayi</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nama Bayi</label>
              <input
                type="text"
                name="namaBayi"
                className="form-control"
                value={formData.namaBayi}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tanggal Lahir</label>
              <input
                type="date"
                name="tanggalLahirBayi"
                className="form-control"
                value={formData.tanggalLahirBayi}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Jenis Kelamin</label>
              <select
                name="jenisKelamin"
                className="form-control"
                value={formData.jenisKelamin}
                onChange={handleChange}
                required
              >
                <option value="">Pilih</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Berat Badan Lahir (gram)</label>
              <input
                type="number"
                name="beratBadanLahir"
                className="form-control"
                value={formData.beratBadanLahir}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Panjang Badan (cm)</label>
              <input
                type="number"
                name="panjangBadan"
                className="form-control"
                value={formData.panjangBadan}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Usia Kehamilan (minggu)</label>
              <input
                type="number"
                name="usiaKehamilan"
                className="form-control"
                value={formData.usiaKehamilan}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Riwayat Menyusui */}
        <div className="form-section">
          <h3 className="section-title">Riwayat Menyusui</h3>
          <div className="form-group">
            <label>Riwayat Menyusui Sebelumnya</label>
            <textarea
              name="riwayatMenyusui"
              className="form-control"
              rows="3"
              value={formData.riwayatMenyusui}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Hambatan/Keluhan Menyusui</label>
            <textarea
              name="hambatanMenyusui"
              className="form-control"
              rows="3"
              value={formData.hambatanMenyusui}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Frekuensi Menyusui (kali/hari)</label>
              <input
                type="number"
                name="frekuensiMenyusui"
                className="form-control"
                value={formData.frekuensiMenyusui}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Durasi Menyusui (menit)</label>
              <input
                type="number"
                name="durasiMenyusui"
                className="form-control"
                value={formData.durasiMenyusui}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Pemeriksaan Fisik */}
        <div className="form-section">
          <h3 className="section-title">Pemeriksaan Fisik</h3>
          <div className="form-group">
            <label>Kondisi Payudara</label>
            <textarea
              name="kondisiPayudara"
              className="form-control"
              rows="2"
              value={formData.kondisiPayudara}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Putting Susuk</label>
            <select
              name="puttingSusuk"
              className="form-control"
              value={formData.puttingSusuk}
              onChange={handleChange}
            >
              <option value="">Pilih</option>
              <option value="Normal">Normal</option>
              <option value="Datar">Datar</option>
              <option value="Terdorong">Terdorong</option>
              <option value="Lecet">Lecet</option>
            </select>
          </div>
          <div className="form-group">
            <label>Refleks Let-Down</label>
            <select
              name="refleksLetDown"
              className="form-control"
              value={formData.refleksLetDown}
              onChange={handleChange}
            >
              <option value="">Pilih</option>
              <option value="Baik">Baik</option>
              <option value="Cukup">Cukup</option>
              <option value="Kurang">Kurang</option>
            </select>
          </div>
        </div>

        {/* Asesmen dan Rencana */}
        <div className="form-section">
          <h3 className="section-title">Asesmen dan Rencana Tindak Lanjut</h3>
          <div className="form-group">
            <label>Diagnosis/Masalah</label>
            <textarea
              name="diagnosis"
              className="form-control"
              rows="3"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Rencana Tindak Lanjut</label>
            <textarea
              name="rencanaTindakLanjut"
              className="form-control"
              rows="3"
              value={formData.rencanaTindakLanjut}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Edukasi yang Diberikan</label>
            <textarea
              name="edukasi"
              className="form-control"
              rows="3"
              value={formData.edukasi}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/antrian')}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan Asesmen
          </button>
        </div>
      </form>
    </div>
  );
};

export default Asesmen;
