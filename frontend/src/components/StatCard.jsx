const StatCard = ({ title, value, color = 'blue', icon: Icon }) => {
    const colorClasses = {
      blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
      teal: 'bg-gradient-to-br from-teal-400 to-teal-500',
      purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
      indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    };
  
    return (
      <div className={`stat-card ${colorClasses[color]}`}>
        <div className="stat-content">
          <h3 className="stat-title">{title}</h3>
          <p className="stat-value">{value}</p>
        </div>
        {Icon && <Icon className="stat-icon" size={48} />}
      </div>
    );
  };
  
  export default StatCard;