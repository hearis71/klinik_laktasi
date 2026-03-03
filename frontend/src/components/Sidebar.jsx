import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaCog, FaTags, FaPills, FaUsers, FaClipboardList,
  FaClock, FaFileMedical, FaPrescriptionBottleAlt, FaMoneyBillWave,
  FaChartLine, FaUserCog, FaChevronRight
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard', path: '/' },

    // { id: 'tarif', icon: FaTags, label: 'Management Tarif', path: '/tarif' },
    // { id: 'obat', icon: FaPills, label: 'Management Obat & BHP', path: '/obat' },
    { id: 'pasien', icon: FaUsers, label: 'Daftar Pasien', path: '/pasien' },
    // { id: 'registrasi', icon: FaClipboardList, label: 'Registrasi', path: '/registrasi' },
    { id: 'antrian', icon: FaClock, label: 'Antrean Perawatan', path: '/antrian' },
    { id: 'rekam', icon: FaFileMedical, label: 'Rekam Medis', path: '/rekam-medis' },
    // { id: 'farmasi', icon: FaPrescriptionBottleAlt, label: 'Farmasi', path: '/farmasi' },
    // { id: 'pembayaran', icon: FaMoneyBillWave, label: 'Pembayaran', path: '/pembayaran' },
    { id: 'kunjungan', icon: FaChartLine, label: 'Riwayat Kunjungan', path: '/kunjungan' },
    // { id: 'komisi', icon: FaChartLine, label: 'Komisi', path: '/komisi' },

    { 
      id: 'account', 
      icon: FaUserCog, 
      label: 'Account Setting', 
      hasSubmenu: true,
      submenu: [
        { id: 'profile', label: 'Profil' },
        { id: 'security', label: 'Keamanan' },
      ]
    },
    {
        id: 'settings',
        icon: FaCog,
        label: 'Setting Management',
        hasSubmenu: true,
        submenu: [
          { id: 'clinic', label: 'Pengaturan Klinik', path: '/setting' },
          { id: 'user', label: 'Manajemen User', path: '/manajemen-user' },
        ]
      },
    { id: 'setting', icon: FaCog, label: 'Setting', path: '/setting' },
  ];

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      setActiveMenu(item.id);
      if (item.path) {
        navigate(item.path);
      }
    }
  };

  const handleSubmenuClick = (subItem) => {
    if (subItem.path) {
      navigate(subItem.path);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">IKMI care+</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item-wrapper">
            <button
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <item.icon className="menu-icon" />
              <span className="menu-label">{item.label}</span>
              {item.hasSubmenu && (
                <FaChevronRight className={`submenu-arrow ${expandedMenu === item.id ? 'rotated' : ''}`} />
              )}
            </button>
            
            {item.hasSubmenu && (
              <div className={`submenu ${expandedMenu === item.id ? 'open' : ''}`}>
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    className="submenu-item"
                    onClick={() => handleSubmenuClick(subItem)}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;