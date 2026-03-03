import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';

const API_URL = 'http://localhost:3000/api';

const Antrian = () => {
  const navigate = useNavigate();
  const [registrasiList, setRegistrasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrasi();
  }, []);

  const fetchRegistrasi = async () => {
    try {
      setLoading(true);
      const response = await api.get('/registrasi');
      setRegistrasiList(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data registrasi');
      console.error('Error fetching registrasi:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }
    if (today.getDate() < birth.getDate()) {
      months--;
    }
    
    if (years > 0) {
      return `${years} tahun ${months} bulan`;
    } else if (months > 0) {
      return `${months} bulan`;
    } else {
      return '0 bulan';
    }
  };

  const handleAsesmen = (noRegistrasi) => {
    navigate(`/formulir/kajian-riwayat-menyusui?no_registrasi=${noRegistrasi}`);
  };

  const handleUbah = (id) => {
    navigate(`/registrasi/edit/${id}`);
  };

  const handleBatal = (id, noRegistrasi) => {
    Swal.fire({
      title: 'Hapus Registrasi?',
      text: `Apakah Anda yakin ingin menghapus registrasi ${noRegistrasi}? Data yang dihapus tidak dapat dikembalikan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_URL}/registrasi/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            Swal.fire({
              title: 'Terhapus!',
              text: 'Data registrasi berhasil dihapus.',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            });
            fetchRegistrasi(); // Refresh data
          } else {
            const error = await response.json();
            Swal.fire({
              title: 'Gagal!',
              text: `Gagal menghapus data: ${error.error}`,
              icon: 'error',
              confirmButtonColor: '#3085d6'
            });
          }
        } catch (err) {
          console.error('Error deleting registrasi:', err);
          Swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menghapus data',
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
        }
      }
    });
  };

  return (
    <div className="page-container">
      <h1>Antrean</h1>
      <p>Halaman pemantauan antrean pasien</p>

      {loading && <div className="alert alert-info">Memuat data...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No. Registrasi</th>
              <th>No. RM</th>
              <th>Nama Ibu</th>
              <th>Tanggal Lahir Ibu</th>
              <th>Usia Ibu</th>
              <th>Nama Bayi</th>
              <th>Tanggal Lahir Bayi</th>
              <th>Usia Bayi</th>
              <th>Tanggal Pengkajian</th>
              <th>Waktu Pengkajian</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {registrasiList.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">Belum ada data registrasi</td>
              </tr>
            ) : (
              registrasiList.map((reg, index) => (
                <tr key={reg.id}>
                  <td>{reg.no_registrasi}</td>
                  <td>{reg.pasien?.no_rm || '-'}</td>
                  <td>{reg.pasien?.nama || '-'}</td>
                  <td>
                    {reg.tanggalLahirIbu 
                      ? new Date(reg.tanggalLahirIbu).toLocaleDateString('id-ID')
                      : '-'
                    }
                  </td>
                  <td>{reg.usiaIbu || '-'}</td>
                  <td>{reg.namaBayi || '-'}</td>
                  <td>
                    {reg.tanggalLahirBayi 
                      ? new Date(reg.tanggalLahirBayi).toLocaleDateString('id-ID')
                      : '-'
                    }
                  </td>
                  <td>{reg.usiaBayi || '-'}</td>
                  <td>
                    {new Date(reg.tanggalPengkajian).toLocaleDateString('id-ID')}
                  </td>
                  <td>{reg.waktuPengkajian || '-'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUbah(reg.id)}
                      >
                        Ubah
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleAsesmen(reg.no_registrasi)}
                      >
                        Asesmen
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleBatal(reg.id, reg.no_registrasi)}
                      >
                        Batal
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Antrian;
