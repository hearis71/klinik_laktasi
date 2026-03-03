import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
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
import Asesmen from './pages/Asesmen';
import ManajemenUser from './pages/ManajemenUser';
import KajianRiwayatMenyusui from './pages/Formulir/KajianRiwayatMenyusui';
import FormulirLayout from './pages/Formulir/FormulirLayout';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pasien" element={<Pasien />} />
            <Route path="tarif" element={<Tarif />} />
            <Route path="obat" element={<Obat />} />
            <Route path="registrasi" element={<Registrasi />} />
            <Route path="registrasi/edit/:id" element={<Registrasi />} />
            <Route path="antrian" element={<Antrian />} />
            {/* <Route path="antrian/:noRawat/asesmen" element={<Asesmen />} /> */}
            <Route path="rekam-medis" element={<Rekam />} />
            <Route path="farmasi" element={<Farmasi />} />
            <Route path="pembayaran" element={<Pembayaran />} />
            <Route path="kunjungan" element={<Kunjungan />} />
            <Route path="manajemen-user" element={<ManajemenUser />} />
            <Route path="setting" element={<Setting />} />
            <Route path="asesmen" element={<Asesmen />} />
            
            {/* Formulir Layout dengan nested routes */}
            <Route path="formulir" element={<FormulirLayout />}>
              <Route path="kajian-riwayat-menyusui" element={<KajianRiwayatMenyusui />} />
              {/* Tambahkan route formulir lain di sini */}
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;