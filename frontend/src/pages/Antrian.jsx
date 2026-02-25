const Antrian = () => {
  return (
    <div className="page-container">
      <h1>Antrean</h1>
      <p>Halaman pemantauan antrean pasien</p>
      <table><thead>
        <tr>
          <th>No. Antrian</th>
          <th>No. Rawat</th>
          <th>Np. RM</th>
          <th>Nama</th>
          <th>Tanggal Lahir</th>
          <th>Usia</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1234567890</td>
          <td>1234567890</td>
          <td>John Doe</td>
          <td>2000-01-01</td>
          <td>20</td>
          <td>
          <div className="d-flex gap-2">
            <button className="btn btn-warning">Ubah</button>
            <button className="btn btn-success">Asesmen</button>
            <button className="btn btn-danger">Batal</button>
          </div>
          </td>
        </tr>
      </tbody></table>
    </div>
  );
};
export default Antrian;
