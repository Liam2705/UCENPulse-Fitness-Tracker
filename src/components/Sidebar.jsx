import logo from '../assets/images/logo.svg';
import dashboard from '../assets/images/dashboard.svg';
import logActivity from '../assets/images/log-activity.svg';
import healthMetrics from '../assets/images/health-metrics.svg';
import analytics from '../assets/images/analytics.svg';
import '../styles/Dashboard.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <img src={logo} alt="logo" className="logo" />
            <ul className = "menu">
                <h3 className="menu-title">Menu</h3>
                <li className="menu-item"><img src={dashboard} className="menu-icon"/><a href="#" className="menu-text">Dashboard</a></li>
                <li className="menu-item"><img src={logActivity} className="menu-icon"/><a href="#" className="menu-text">Log Activity</a></li>
                <li className="menu-item"><img src={healthMetrics} className="menu-icon"/><a href="#" className="menu-text">Health Metrics</a></li>
                <li className="menu-item"><img src={analytics} className="menu-icon"/><a href="#" className="menu-text">Analytics</a></li>
            </ul>
        </div>
    );
}

export {Sidebar};