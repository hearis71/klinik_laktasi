import { useNavigate } from 'react-router-dom';

const Pasien = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Daftar Pasien</h1>
      {/* <p>Halaman manajemen data pasien akan ditampilkan di sini.</p> */}

        <div className="d-flex gap-2" style={{ marginBottom: 10 }}>
          <input type="text" className="form-control" placeholder="Cari Pasien" />
          <button className="btn btn-primary">Cari</button>
        </div>

      <table><thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Usia</th>
            <th>Jenis Kelamin</th>
            <th>No HP</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead><tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>2000-01-01</td>
            <td>20</td>
            <td>Laki-laki</td>
            <td>081234567890</td>
            <td>john.doe@example.com</td>
            <td>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">Edit</button>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate('/registrasi')}
                >
                  Registrasi
                </button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </td>
          </tr>
        </tbody></table>
    </div>
  );
};

export default Pasien;