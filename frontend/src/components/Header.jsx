import { FaBell, FaUserCircle, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header">
      <div className="header-left">
        <div className="breadcrumb">
          <span className="breadcrumb-item">BERANDA</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">DASHBOARD</span>
        </div>
        <h2 className="page-title">Dashboard Klinik Laktasi</h2>
      </div>

      <div className="header-right">
        <div className="current-date">
          <strong>Hari ini, {currentDate}</strong>
        </div>

        <button className="notification-btn">
          <FaBell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-menu">
          <FaUserCircle size={32} />
          <span className="user-name">{user?.nama || 'User'}</span>
          <button className="logout-btn" onClick={logout} title="Logout">
            <FaSignOutAlt size={18} />
          </button>
          <FaChevronDown size={12} />
        </div>
      </div>
    </header>
  );
};

export default Header;