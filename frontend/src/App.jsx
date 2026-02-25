import React from 'react'; // ← Tambahkan baris ini
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Pasien from './pages/Pasien';
import Tarif from './pages/Tarif';
import Obat from './pages/Obat';
import Registrasi from './pages/Registrasi';
import Antrian from './pages/Antrian';
import Rekam from './pages/Rekam';
import Farmasi from './pages/Farmasi';
import Pembayaran from './pages/Pembayaran';
import Kunjungan from './pages/Kunjungan';
import Setting from './pages/Setting';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pasien" element={<Pasien />} />
          <Route path="tarif" element={<Tarif />} />
          <Route path="obat" element={<Obat />} />
          <Route path="registrasi" element={<Registrasi />} />
          <Route path="antrian" element={<Antrian />} />
          <Route path="rekam-medis" element={<Rekam />} />
          <Route path="farmasi" element={<Farmasi />} />
          <Route path="pembayaran" element={<Pembayaran />} />
          <Route path="kunjungan" element={<Kunjungan />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;