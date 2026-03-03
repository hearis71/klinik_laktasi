import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEdit, FaTrash, FaUsers, FaSearch, FaFileMedical } from 'react-icons/fa';

const API_URL = 'http://localhost:3000/api';

const Pasien = () => {
  const navigate = useNavigate();
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    tanggalLahir: '',
    alamat: '',
    noHp: ''
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPasien();
  }, []);

  const fetchPasien = async () => {
    try {
      const response = await fetch(`${API_URL}/pasien`);
      const result = await response.json();
      if (response.ok) {
        setPasien(result);
      }
    } catch (err) {
      console.error('Error fetching pasien:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData({ nik: '', nama: '', tanggalLahir: '', alamat: '', noHp: '' });
    setFormError('');
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormError('');
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.nama || !formData.tanggalLahir) {
      setFormError('Nama dan tanggal lahir wajib diisi');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/pasien`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(`Pasien berhasil ditambahkan! No RM: ${result.no_rm}`);
        setTimeout(() => {
          handleCloseModal();
          fetchPasien();
        }, 2000);
      } else {
        setFormError(result.error || 'Gagal menambahkan pasien');
      }
    } catch (err) {
      setFormError('Terjadi kesalahan pada server');
    }
  };

  const handleDelete = async (id, nama) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus pasien "${nama}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/pasien/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuccessMessage('Pasien berhasil dihapus!');
        fetchPasien();
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting pasien:', err);
    }
  };

  const handleEditClick = (p) => {
    setSelectedPasien(p);
    setFormData({
      nik: p.nik || '',
      nama: p.nama,
      tanggalLahir: new Date(p.tanggalLahir).toISOString().split('T')[0],
      alamat: p.alamat || '',
      noHp: p.noHp || ''
    });
    setShowEditModal(true);
    setFormError('');
    setSuccessMessage('');
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPasien(null);
    setFormError('');
    setSuccessMessage('');
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.nama || !formData.tanggalLahir) {
      setFormError('Nama dan tanggal lahir wajib diisi');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/pasien/${selectedPasien.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Data pasien berhasil diupdate!');
        setTimeout(() => {
          handleCloseEditModal();
          fetchPasien();
        }, 1500);
      } else {
        setFormError(result.error || 'Gagal mengupdate data pasien');
      }
    } catch (err) {
      setFormError('Terjadi kesalahan pada server');
    }
  };

  const handleDeleteClick = (p) => {
    setSelectedPasien(p);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${API_URL}/pasien/${selectedPasien.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuccessMessage(`Pasien "${selectedPasien.nama}" berhasil dihapus!`);
        setShowDeleteModal(false);
        setSelectedPasien(null);
        fetchPasien();
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting pasien:', err);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedPasien(null);
  };

  const calculateAge = (tanggalLahir) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredPasien = pasien.filter(p =>
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.no_rm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          <FaUsers className="page-icon" />
          Daftar Pasien
        </h1>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <FaUserPlus className="btn-icon" />
          Tambah Pasien Baru
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <h3>Data Pasien</h3>
          <div className="table-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Cari pasien (nama, no RM, NIK)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>No RM</th>
                  <th>Nama</th>
                  <th>Tanggal Lahir</th>
                  <th>Usia</th>
                  <th>No HP</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasien.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      {searchTerm ? 'Tidak ada pasien yang ditemukan' : 'Belum ada data pasien'}
                    </td>
                  </tr>
                ) : (
                  filteredPasien.map((p, index) => (
                    <tr key={p.id}>
                      <td>{index + 1}</td>
                      <td><strong>{p.no_rm}</strong></td>
                      <td>{p.nama}</td>
                      <td>{new Date(p.tanggalLahir).toLocaleDateString('id-ID')}</td>
                      <td>{calculateAge(p.tanggalLahir)} tahun</td>
                      <td>{p.noHp || '-'}</td>
                      <td>{p.alamat || '-'}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditClick(p)}
                            title="Edit Pasien"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => navigate(`/registrasi?no_rm=${p.no_rm}`)}
                            title="Registrasi"
                          >
                            <FaFileMedical />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteClick(p)}
                            title="Hapus Pasien"
                          >
                            <FaTrash />
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
      </div>

      {/* Modal Tambah Pasien */}
      {showModal && (
        <div className="modal-bootstrap-overlay" onClick={handleCloseModal}>
          <div className="modal-bootstrap" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bootstrap-header">
              <h5 className="modal-title">
                <FaUserPlus className="modal-icon-primary" />
                Tambah Pasien Baru
              </h5>
              <button className="btn-close-modal" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-bootstrap-body">
              {formError && (
                <div className="alert alert-error">
                  <span className="alert-icon">⚠️</span>
                  {formError}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success">
                  <span className="alert-icon">✅</span>
                  {successMessage}
                </div>
              )}

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="nik" className="form-label">
                    NIK <span className="text-muted">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="Masukkan NIK (16 digit)"
                    className="form-control-rounded"
                    maxLength="16"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="nama" className="form-label">
                    Nama Lengkap <span className="text-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="form-control-rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="tanggalLahir" className="form-label">
                    Tanggal Lahir <span className="text-required">*</span>
                  </label>
                  <input
                    type="date"
                    id="tanggalLahir"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="form-control-rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="alamat" className="form-label">
                    Alamat <span className="text-muted">(Opsional)</span>
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap"
                    className="form-control-rounded textarea"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="noHp" className="form-label">
                    No HP / WhatsApp <span className="text-muted">(Opsional)</span>
                  </label>
                  <input
                    type="tel"
                    id="noHp"
                    name="noHp"
                    value={formData.noHp}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="form-control-rounded"
                  />
                </div>
              </div>

              <div className="modal-bootstrap-footer">
                <button
                  type="button"
                  className="btn btn-secondary-rounded"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary-rounded">
                  <FaUserPlus className="btn-icon" />
                  Simpan Pasien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Pasien */}
      {showEditModal && (
        <div className="modal-bootstrap-overlay" onClick={handleCloseEditModal}>
          <div className="modal-bootstrap" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bootstrap-header">
              <h5 className="modal-title">
                <FaEdit className="modal-icon-primary" />
                Edit Data Pasien
              </h5>
              <button className="btn-close-modal" onClick={handleCloseEditModal}>
                <span>&times;</span>
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="modal-bootstrap-body">
              {formError && (
                <div className="alert alert-error">
                  <span className="alert-icon">⚠️</span>
                  {formError}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success">
                  <span className="alert-icon">✅</span>
                  {successMessage}
                </div>
              )}

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="edit-nik" className="form-label">
                    NIK <span className="text-muted">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    id="edit-nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="Masukkan NIK (16 digit)"
                    className="form-control-rounded"
                    maxLength="16"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="edit-nama" className="form-label">
                    Nama Lengkap <span className="text-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="edit-nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="form-control-rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="edit-tanggalLahir" className="form-label">
                    Tanggal Lahir <span className="text-required">*</span>
                  </label>
                  <input
                    type="date"
                    id="edit-tanggalLahir"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="form-control-rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="edit-alamat" className="form-label">
                    Alamat <span className="text-muted">(Opsional)</span>
                  </label>
                  <textarea
                    id="edit-alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap"
                    className="form-control-rounded textarea"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-full">
                  <label htmlFor="edit-noHp" className="form-label">
                    No HP / WhatsApp <span className="text-muted">(Opsional)</span>
                  </label>
                  <input
                    type="tel"
                    id="edit-noHp"
                    name="noHp"
                    value={formData.noHp}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="form-control-rounded"
                  />
                </div>
              </div>

              <div className="modal-bootstrap-footer">
                <button
                  type="button"
                  className="btn btn-secondary-rounded"
                  onClick={handleCloseEditModal}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary-rounded">
                  <FaEdit className="btn-icon" />
                  Update Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="modal-bootstrap-overlay" onClick={handleDeleteCancel}>
          <div className="modal-bootstrap modal-bootstrap-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bootstrap-header modal-header-danger">
              <h5 className="modal-title">
                <FaTrash className="modal-icon-danger" />
                Konfirmasi Hapus
              </h5>
              <button className="btn-close-modal" onClick={handleDeleteCancel}>
                <span>&times;</span>
              </button>
            </div>

            <div className="modal-bootstrap-body text-center">
              <div className="confirm-icon-wrapper">
                <FaTrash className="confirm-icon" />
              </div>
              <p className="confirm-message">
                Apakah Anda yakin ingin menghapus data pasien ini?
              </p>
              <div className="confirm-info-card">
                <div className="confirm-patient-name">{selectedPasien?.nama}</div>
                <div className="confirm-patient-rm">No RM: {selectedPasien?.no_rm}</div>
              </div>
              <p className="confirm-warning">
                <span className="warning-icon">⚠️</span>
                Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>

            <div className="modal-bootstrap-footer">
              <button
                type="button"
                className="btn btn-secondary-rounded"
                onClick={handleDeleteCancel}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-danger-rounded"
                onClick={handleDeleteConfirm}
              >
                <FaTrash className="btn-icon" />
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Pasien;