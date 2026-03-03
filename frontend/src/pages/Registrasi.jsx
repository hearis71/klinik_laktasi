import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function toUtcMidnightMs(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function addMonthsPreserveDay(date, monthsToAdd) {
  const d = new Date(date.getTime());
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + monthsToAdd);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}

function diffMonthsDays(fromDate, toDate) {
  if (!fromDate || Number.isNaN(fromDate.getTime())) return null;
  const from = new Date(fromDate.getTime());
  const to = new Date(toDate.getTime());
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);
  if (to < from) return { months: 0, days: 0 };

  let months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());

  let anchor = addMonthsPreserveDay(from, months);
  if (anchor > to) {
    months -= 1;
    anchor = addMonthsPreserveDay(from, months);
  }

  const days = Math.max(
    0,
    Math.floor((toUtcMidnightMs(to) - toUtcMidnightMs(anchor)) / 86400000)
  );

  return { months: Math.max(0, months), days };
}

function diffYearsMonthsDays(fromDate, toDate) {
  if (!fromDate || Number.isNaN(fromDate.getTime())) return null;
  const from = new Date(fromDate.getTime());
  const to = new Date(toDate.getTime());
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);
  if (to < from) return { years: 0, months: 0, days: 0 };

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
}

function formatMonthsDays(diff) {
  if (!diff) return '';
  return `${diff.months} bulan ${diff.days} hari`;
}

function formatYearsMonthsDays(diff) {
  if (!diff) return '';
  return `${diff.years} Tahun ${diff.months} Bulan ${diff.days} Hari`;
}

const Registrasi = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams(); // Get ID from URL for edit mode
  const isEditMode = !!id;
  
  const no_rm = searchParams.get('no_rm');

  const now = new Date();
  const [tanggalPengkajian, setTanggalPengkajian] = useState(
    now.toISOString().slice(0, 10)
  );
  const [waktuPengkajian, setWaktuPengkajian] = useState(
    now.toTimeString().slice(0, 5)
  );

  const [noRM, setNoRM] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [tanggalLahirIbu, setTanggalLahirIbu] = useState('');
  const [namaBayi, setNamaBayi] = useState('');
  const [tanggalLahirBayi, setTanggalLahirBayi] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pasienId, setPasienId] = useState('');
  const [registrasiData, setRegistrasiData] = useState(null); // Store existing data for edit

  useEffect(() => {
    if (isEditMode) {
      fetchRegistrasiById(id);
    } else if (no_rm) {
      fetchPasienByNoRM(no_rm);
    }
  }, [id, no_rm, isEditMode]);

  const fetchPasienByNoRM = async (noRm) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/pasien/no-rm/${noRm}`);
      if (response.ok) {
        const data = await response.json();
        setNoRM(data.no_rm);
        setNamaIbu(data.nama);
        setTanggalLahirIbu(new Date(data.tanggalLahir).toISOString().split('T')[0]);
        setPasienId(data.id);
      }
    } catch (err) {
      console.error('Error fetching pasien:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrasiById = async (registrasiId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/registrasi/${registrasiId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrasiData(data);
        setNoRM(data.pasien?.no_rm || '');
        setNamaIbu(data.namaIbu || '');
        setTanggalLahirIbu(new Date(data.tanggalLahirIbu).toISOString().split('T')[0]);
        setNamaBayi(data.namaBayi || '');
        setTanggalLahirBayi(data.tanggalLahirBayi ? new Date(data.tanggalLahirBayi).toISOString().split('T')[0] : '');
        setTanggalPengkajian(new Date(data.tanggalPengkajian).toISOString().slice(0, 10));
        setWaktuPengkajian(data.waktuPengkajian || '');
        setPasienId(data.pasienId || '');
      } else {
        const error = await response.json();
        alert(`Gagal memuat data: ${error.error}`);
      }
    } catch (err) {
      console.error('Error fetching registrasi:', err);
      alert('Gagal memuat data registrasi');
    } finally {
      setLoading(false);
    }
  };

  const petugasPengkaji = useMemo(() => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = decodeJwt(token);
    if (!payload) return '';
    // Prioritaskan nama dari user, fallback ke username atau email
    return (
      payload.nama ||
      payload.name ||
      payload.username ||
      ''
    );
  }, []);

  const usiaIbu = useMemo(() => {
    if (!tanggalLahirIbu) return '';
    const diff = diffYearsMonthsDays(new Date(tanggalLahirIbu), new Date());
    return formatYearsMonthsDays(diff);
  }, [tanggalLahirIbu]);

  const usiaBayi = useMemo(() => {
    if (!tanggalLahirBayi) return '';
    const diff = diffMonthsDays(new Date(tanggalLahirBayi), new Date());
    return formatMonthsDays(diff);
  }, [tanggalLahirBayi]);

  const handleSimpan = async () => {
    if (!noRM || !namaIbu || !tanggalLahirIbu) {
      alert('Mohon lengkapi data ibu (No RM, Nama, Tanggal Lahir)');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const formData = {
        tanggalPengkajian,
        waktuPengkajian,
        namaIbu,
        tanggalLahirIbu,
        usiaIbu,
        namaBayi: namaBayi || null,
        tanggalLahirBayi: tanggalLahirBayi || null,
        usiaBayi: usiaBayi || null
      };

      const url = isEditMode ? `${API_URL}/registrasi/${id}` : `${API_URL}/registrasi`;
      const method = isEditMode ? 'PUT' : 'POST';

      // For update, also send pasienId
      if (isEditMode && pasienId) {
        formData.pasienId = pasienId;
      } else if (!isEditMode) {
        formData.no_rm = noRM;
        formData.pasienId = pasienId || null;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Registrasi berhasil ${isEditMode ? 'diperbarui' : 'disimpan'}!${result.no_registrasi ? `\nNo Registrasi: ${result.no_registrasi}` : ''}`);
        navigate('/antrian');
      } else {
        const error = await response.json();
        alert(`Gagal ${isEditMode ? 'memperbarui' : 'menyimpan'}: ${error.error}`);
      }
    } catch (err) {
      console.error('Error saving registrasi:', err);
      alert('Terjadi kesalahan saat menyimpan data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-container">
      <h1>
        {isEditMode 
          ? `Ubah Registrasi : ${registrasiData?.no_registrasi || ''}` 
          : 'Registrasi Pasien'
        }
      </h1>

      {loading && <div className="loading">{isEditMode ? 'Memuat data registrasi...' : 'Memuat data pasien...'}</div>}

      <div className="form-grid">
        <div className="form-row-double">
          <div className="form-group">
            <label htmlFor="noRM">No RM</label>
            <input
              type="text"
              id="noRM"
              value={noRM}
              readOnly
              placeholder="Nomor Rekam Medis"
              className="form-control-rounded"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tanggalPengkajian">Tanggal Pengkajian</label>
            <input
              type="date"
              id="tanggalPengkajian"
              value={tanggalPengkajian}
              onChange={(e) => setTanggalPengkajian(e.target.value)}
              className="form-control-rounded"
            />
          </div>
        </div>

        <div className="form-row-double">
          <div className="form-group">
            <label htmlFor="waktuPengkajian">Waktu Pengkajian (Jam & Menit)</label>
            <input
              type="time"
              id="waktuPengkajian"
              value={waktuPengkajian}
              onChange={(e) => setWaktuPengkajian(e.target.value)}
              className="form-control-rounded"
            />
          </div>

          <div className="form-group">
            <label htmlFor="petugasPengkaji">Petugas Pengkaji</label>
            <input
              type="text"
              id="petugasPengkaji"
              value={petugasPengkaji}
              readOnly
              placeholder="Otomatis dari akun login"
              className="form-control-rounded"
            />
          </div>
        </div>

        <div className="form-row-full">
          <div className="form-group">
            <label htmlFor="namaIbu">Nama Ibu</label>
            <input
              type="text"
              id="namaIbu"
              value={namaIbu}
              onChange={(e) => setNamaIbu(e.target.value)}
              placeholder="Masukkan nama ibu"
              className="form-control-rounded"
              readOnly={!!noRM}
            />
            {noRM && <span className="form-hint">Data otomatis dari pasien</span>}
          </div>
        </div>

        <div className="form-row-double">
          <div className="form-group">
            <label htmlFor="tanggalLahirIbu">Tanggal Lahir Ibu</label>
            <input
              type="date"
              id="tanggalLahirIbu"
              value={tanggalLahirIbu}
              onChange={(e) => setTanggalLahirIbu(e.target.value)}
              className="form-control-rounded"
              readOnly={!!noRM}
            />
          </div>

          <div className="form-group">
            <label htmlFor="usiaIbu">Usia Ibu</label>
            <input
              type="text"
              id="usiaIbu"
              value={usiaIbu}
              readOnly
              placeholder="Otomatis terisi"
              className="form-control-rounded"
            />
            <span className="form-hint">Format: Tahun, Bulan, Hari</span>
          </div>
        </div>

        <div className="form-row-full">
          <div className="form-group">
            <label htmlFor="namaBayi">Nama Bayi</label>
            <input
              type="text"
              id="namaBayi"
              value={namaBayi}
              onChange={(e) => setNamaBayi(e.target.value)}
              placeholder="Masukkan nama bayi"
              className="form-control-rounded"
            />
          </div>
        </div>

        <div className="form-row-double">
          <div className="form-group">
            <label htmlFor="tanggalLahirBayi">Tanggal Lahir Bayi</label>
            <input
              type="date"
              id="tanggalLahirBayi"
              value={tanggalLahirBayi}
              onChange={(e) => setTanggalLahirBayi(e.target.value)}
              className="form-control-rounded"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usiaBayi">Usia Bayi</label>
            <input
              type="text"
              id="usiaBayi"
              value={usiaBayi}
              readOnly
              placeholder="Otomatis terisi"
              className="form-control-rounded"
            />
            <span className="form-hint">Format: bulan dan hari</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary-rounded" onClick={() => navigate('/antrian')} disabled={saving}>
          Kembali
        </button>
        <button className="btn btn-primary-rounded" onClick={handleSimpan} disabled={saving}>
          {saving ? (isEditMode ? 'Memperbarui...' : 'Menyimpan...') : (isEditMode ? 'Perbarui' : 'Simpan')}
        </button>
      </div>
    </div>
  );
};

export default Registrasi;