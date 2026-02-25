import { FaHospital, FaUserMd, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import StatCard from '../components/StatCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Dashboard = () => {
  const visitData = [
    { month: 'Jan', visits: 4 },
    { month: 'Feb', visits: 5 },
    { month: 'Mar', visits: 7 },
    { month: 'Apr', visits: 8 },
    { month: 'May', visits: 6 },
    { month: 'Jun', visits: 6 },
    { month: 'Jul', visits: 5 },
    { month: 'Aug', visits: 7 },
    { month: 'Sep', visits: 0 },
    { month: 'Okt', visits: 0 },
    { month: 'Nov', visits: 0 },
    { month: 'Des', visits: 0 },
  ];

  const queueStatusData = [
    { name: 'Menunggu', value: 10, percentage: 40, color: '#FFB800' },
    { name: 'Konsultasi', value: 5, percentage: 20, color: '#3B82F6' },
    { name: 'Selesai', value: 7, percentage: 30, color: '#A78BFA' },
  ];

  const diagnosisData = [
    { kode: 'A010', nama: 'Demam Tifoid', h0_7: { l: 1, p: 2 }, h8_28: { l: 3, p: 4 }, h29_1th: { l: 5, p: 6 }, th1_4: { l: 7, p: 8 }, th5_14: { l: 9, p: 10 }, jumlah: { l: 81, p: 90 }, total: 171 },
    { kode: 'A011', nama: 'Demam Paratifoid A', h0_7: { l: 1, p: 2 }, h8_28: { l: 3, p: 4 }, h29_1th: { l: 5, p: 6 }, th1_4: { l: 7, p: 8 }, th5_14: { l: 9, p: 10 }, jumlah: { l: 81, p: 90 }, total: 171 },
    { kode: 'A012', nama: 'Demam Paratifoid B', h0_7: { l: 1, p: 2 }, h8_28: { l: 3, p: 4 }, h29_1th: { l: 5, p: 6 }, th1_4: { l: 7, p: 8 }, th5_14: { l: 9, p: 10 }, jumlah: { l: 81, p: 90 }, total: 171 },
    { kode: 'A013', nama: 'Demam Paratifoid C', h0_7: { l: 1, p: 2 }, h8_28: { l: 3, p: 4 }, h29_1th: { l: 5, p: 6 }, th1_4: { l: 7, p: 8 }, th5_14: { l: 9, p: 10 }, jumlah: { l: 81, p: 90 }, total: 171 },
    { kode: 'A014', nama: 'Demam paratifoid', h0_7: { l: 1, p: 2 }, h8_28: { l: 3, p: 4 }, h29_1th: { l: 5, p: 6 }, th1_4: { l: 7, p: 8 }, th5_14: { l: 9, p: 10 }, jumlah: { l: 81, p: 90 }, total: 171 },
  ];

  const tindakanData = [
    { kode: 'A010', nama: 'Demam Tifoid', jumlah: 205 },
    { kode: 'A011', nama: 'Demam Paratifoid A', jumlah: 109 },
    { kode: 'A012', nama: 'Demam Paratifoid B', jumlah: 90 },
    { kode: 'A013', nama: 'Demam Paratifoid C', jumlah: 70 },
    { kode: 'A014', nama: 'Demam paratifoid', jumlah: 65 },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h3>Hallo,</h3>
            <p>
              Selamat datang di Aplikasi Manajemen Klinik Laktasi,
              <br />
              by : Ikatan Konselor Menyusui Indonesia (IKMI)
            </p>
          </div>
          <div className="welcome-illustration">
            <img src="/love.png" alt="Medical Team" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <h3>Profil</h3>
          <div className="profile-content">
            <FaHospital size={48} className="profile-icon" />
            <div>
              <p className="profile-name">Klinik Laktasi</p>
              <p className="profile-type">Umum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard 
          title="Total Antrean Pasien Hari Ini" 
          value="34" 
          color="blue"
          icon={FaUserMd}
        />
        <StatCard 
          title="Jumlah Dokter" 
          value="89" 
          color="teal"
          icon={FaUserMd}
        />
        <StatCard 
          title="Menu3" 
          value="-" 
          color="purple"
        //   icon={FaMoneyBillWave}
        />
        <StatCard 
          title="Menu4" 
          value="-" 
          color="indigo"
        //   icon={FaCalendarAlt}
        />
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Visit Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Total Kunjungan Pasien</h3>
          <p className="chart-subtitle">tahun 2026</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Queue Status */}
        <div className="chart-card">
          <h3 className="chart-title">Status Antrean Pasien</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={queueStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {queueStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center">
            <p className="pie-percentage">Overall<br />70%</p>
          </div>
        </div>

        {/* Package Info */}
        <div className="package-card">
          <div className="package-header">
            <h3>Menu6</h3>
            <p className="package-validity">(-)</p>
          </div>
          <div className="package-content">
            {/* <div className="package-item">
              <span className="package-label">Jenis Paket</span>
              <span className="package-value">300 visit pasien</span>
              <span className="package-remaining">Sisa visit pasien: 232</span>
            </div> */}
            <div className="package-item">
              <span className="package-label">Jenis Add On</span>
              <div className="addon-list">
                <div>WhatsApp <span>232</span></div>
                <div>SMS <span>123</span></div>
              </div>
            </div>
            <button className="btn-extend">Chat Lebih Lanjut</button>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="tables-grid">
        {/* Top 10 Diagnosis */}
        <div className="table-card">
          <div className="table-header">
            <h3>Top 10 Diagnosis</h3>
            <div className="table-controls">
              <select className="period-select">
                <option>Pilih Periode: Oktober 2026</option>
              </select>
              <button className="btn-download">Download</button>
            </div>
          </div>
          <div className="table-responsive">
            <table><thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Penyakit</th>
                  <th colSpan="2">0 - 7 Hari</th>
                  <th colSpan="2">8 - 28 Hari</th>
                  <th colSpan="2">29 Hari - &lt;1 Th</th>
                  <th colSpan="2">1 - 4 Th</th>
                  <th colSpan="2">5 - 14 Th</th>
                  <th colSpan="2">Jumlah</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th>L</th>
                  <th>P</th>
                  <th>L</th>
                  <th>P</th>
                  <th>L</th>
                  <th>P</th>
                  <th>L</th>
                  <th>P</th>
                  <th>L</th>
                  <th>P</th>
                  <th>L</th>
                  <th>P</th>
                  <th></th>
                </tr>
              </thead><tbody>
                {diagnosisData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.kode}</td>
                    <td>{row.nama}</td>
                    <td>{row.h0_7.l}</td>
                    <td>{row.h0_7.p}</td>
                    <td>{row.h8_28.l}</td>
                    <td>{row.h8_28.p}</td>
                    <td>{row.h29_1th.l}</td>
                    <td>{row.h29_1th.p}</td>
                    <td>{row.th1_4.l}</td>
                    <td>{row.th1_4.p}</td>
                    <td>{row.th5_14.l}</td>
                    <td>{row.th5_14.p}</td>
                    <td>{row.jumlah.l}</td>
                    <td>{row.jumlah.p}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              </tbody></table>
          </div>
        </div>

        {/* Top 10 Tindakan */}
        <div className="table-card">
          <div className="table-header">
            <h3>Top 10 Tindakan</h3>
            <div className="table-controls">
              <select className="period-select">
                <option>Pilih Periode: Oktober 2026</option>
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <table><thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Tindakan</th>
                  <th>Jumlah</th>
                </tr>
              </thead><tbody>
                {tindakanData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.kode}</td>
                    <td>{row.nama}</td>
                    <td>{row.jumlah}</td>
                  </tr>
                ))}
              </tbody></table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;