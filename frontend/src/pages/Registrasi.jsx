import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

function formatMonthsDays(diff) {
  if (!diff) return '';
  return `${diff.months} bulan ${diff.days} hari`;
}

const Registrasi = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [tanggalPengkajian, setTanggalPengkajian] = useState(
    now.toISOString().slice(0, 10)
  );
  const [waktuPengkajian, setWaktuPengkajian] = useState(
    now.toTimeString().slice(0, 5)
  );

  const [namaIbu, setNamaIbu] = useState('');
  const [tanggalLahirIbu, setTanggalLahirIbu] = useState('');
  const [namaBayi, setNamaBayi] = useState('');
  const [tanggalLahirBayi, setTanggalLahirBayi] = useState('');

  const petugasPengkaji = useMemo(() => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = decodeJwt(token);
    if (!payload) return '';
    return (
      payload.name ||
      payload.nama ||
      payload.username ||
      payload.email ||
      payload.sub ||
      ''
    );
  }, []);

  const usiaIbu = useMemo(() => {
    if (!tanggalLahirIbu) return '';
    const diff = diffMonthsDays(new Date(tanggalLahirIbu), new Date());
    return formatMonthsDays(diff);
  }, [tanggalLahirIbu]);

  const usiaBayi = useMemo(() => {
    if (!tanggalLahirBayi) return '';
    const diff = diffMonthsDays(new Date(tanggalLahirBayi), new Date());
    return formatMonthsDays(diff);
  }, [tanggalLahirBayi]);

  return (
    <div className="page-container">
      <h1>Registrasi Pasien </h1>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <label>
          Tanggal Pengkajian:
          <input
            type="date"
            value={tanggalPengkajian}
            onChange={(e) => setTanggalPengkajian(e.target.value)}
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Waktu Pengkajian: (Jam &amp; Menit)
          <input
            type="time"
            value={waktuPengkajian}
            onChange={(e) => setWaktuPengkajian(e.target.value)}
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Petugas Pengkaji: (data akun login)
          <input
            type="text"
            value={petugasPengkaji}
            placeholder="(akan terisi dari akun login)"
            readOnly
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Nama Ibu:
          <input
            type="text"
            value={namaIbu}
            onChange={(e) => setNamaIbu(e.target.value)}
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Tanggal lahir ibu:
          <input
            type="date"
            value={tanggalLahirIbu}
            onChange={(e) => setTanggalLahirIbu(e.target.value)}
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Usia Ibu: (otomatis terisi bila tanggal lahir sudah diisi) dalam format
          bulan dan hari
          <input
            type="text"
            value={usiaIbu}
            readOnly
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Nama Bayi:
          <input
            type="text"
            value={namaBayi}
            onChange={(e) => setNamaBayi(e.target.value)}
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Tanggal lahir bayi:
          <input
            type="date"
            value={tanggalLahirBayi}
            onChange={(e) => setTanggalLahirBayi(e.target.value)}
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>

        <label>
          Usia Bayi: (otomatis terisi bila tanggal lahir sudah diisi) dalam format
          bulan dan hari
          <input
            type="text"
            value={usiaBayi}
            readOnly
            style={{ display: 'block', marginTop: 6, padding: 10, width: '100%' }}
          />
        </label>
      </div>
      <button className="btn btn-success" onClick={() => navigate('/antrian')}>Simpan</button>
    </div>
  );
};

export default Registrasi;