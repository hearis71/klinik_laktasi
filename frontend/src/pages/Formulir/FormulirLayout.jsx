import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Outlet, useLocation } from 'react-router-dom';
import HeaderFormulir from './HeaderFormulir';

const FormulirLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const noRegistrasi = searchParams.get('no_registrasi');

  const [currentForm, setCurrentForm] = useState('kajian-riwayat-menyusui');
  const [formList, setFormList] = useState([
    {
      id: 'kajian-riwayat-menyusui',
      label: 'Kajian Riwayat Menyusui',
      path: '/formulir/kajian-riwayat-menyusui'
    },
    // Tambahkan formulir lain di sini sesuai kebutuhan
    // {
    //   id: 'asesmen-ibu',
    //   label: 'Asesmen Ibu',
    //   path: '/formulir/asesmen-ibu'
    // },
    // {
    //   id: 'pemeriksaan-fisik',
    //   label: 'Pemeriksaan Fisik',
    //   path: '/formulir/pemeriksaan-fisik'
    // }
  ]);

  // Set active form based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeForm = formList.find(form => currentPath.includes(form.id));
    if (activeForm) {
      setCurrentForm(activeForm.id);
    }
  }, [location, formList]);

  const handleFormChange = (formId) => {
    const form = formList.find(f => f.id === formId);
    if (form) {
      navigate(`${form.path}?no_registrasi=${noRegistrasi}`);
    }
  };

  const handleBack = () => {
    navigate(`/antrian`);
  };

  return (
    <div className="formulir-layout-container">
      <div className="formulir-layout-header">
        <div className="formulir-layout-title">
          <h2>Formulir Pengkajian</h2>
        </div>
        <div className="formulir-layout-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleBack}
          >
            ← Kembali ke Antrian
          </button>
        </div>
      </div>

      {/* Header Formulir (Data Ibu & Bayi) */}
      <HeaderFormulir />

      {/* Tab Navigasi Formulir */}
      <div className="formulir-tabs">
        {formList.map((form) => (
          <button
            key={form.id}
            className={`formulir-tab ${currentForm === form.id ? 'active' : ''}`}
            onClick={() => handleFormChange(form.id)}
          >
            {form.label}
          </button>
        ))}
      </div>

      {/* Body Content - Outlet untuk render child route */}
      <div className="formulir-body">
        <Outlet />
      </div>
    </div>
  );
};

export default FormulirLayout;
