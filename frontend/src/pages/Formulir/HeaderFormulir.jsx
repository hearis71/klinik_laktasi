import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const HeaderFormulir = () => {
  const [searchParams] = useSearchParams();
  const noRegistrasi = searchParams.get('no_registrasi');
  
  const [data, setData] = useState({
    no_registrasi: '',
    namaIbu: '',
    tanggalLahirIbu: '',
    usiaIbu: '',
    namaBayi: '',
    tanggalLahirBayi: '',
    usiaBayi: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noRegistrasi) {
      fetchRegistrasiByNoRegistrasi(noRegistrasi);
    }
  }, [noRegistrasi]);

  const fetchRegistrasiByNoRegistrasi = async (noReg) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/registrasi/no-registrasi/${noReg}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data) {
        const reg = response.data;
        setData({
          no_registrasi: reg.no_registrasi || '',
          namaIbu: reg.namaIbu || '',
          tanggalLahirIbu: reg.tanggalLahirIbu ? new Date(reg.tanggalLahirIbu).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : '',
          usiaIbu: reg.usiaIbu || '',
          namaBayi: reg.namaBayi || '-',
          tanggalLahirBayi: reg.tanggalLahirBayi ? new Date(reg.tanggalLahirBayi).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : '-',
          usiaBayi: reg.usiaBayi || '-'
        });
      }
    } catch (err) {
      console.error('Error fetching registrasi:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="header-formulir">
        <div className="loading">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="header-formulir">
      <div className="header-section">
        <h3>Data Ibu</h3>
        <table className="header-table">
          <tbody>
            <tr>
              <td width="150">No. Registrasi</td>
              <td width="10">:</td>
              <td>{data.no_registrasi || '-'}</td>
            </tr>
            <tr>
              <td>Nama Ibu</td>
              <td>:</td>
              <td>{data.namaIbu || '-'}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>:</td>
              <td>{data.tanggalLahirIbu || '-'}</td>
            </tr>
            <tr>
              <td>Usia</td>
              <td>:</td>
              <td>{data.usiaIbu || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="header-section">
        <h3>Data Bayi</h3>
        <table className="header-table">
          <tbody>
            <tr>
              <td width="150">Nama Bayi</td>
              <td width="10">:</td>
              <td>{data.namaBayi || '-'}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>:</td>
              <td>{data.tanggalLahirBayi || '-'}</td>
            </tr>
            <tr>
              <td>Usia</td>
              <td>:</td>
              <td>{data.usiaBayi || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeaderFormulir;
