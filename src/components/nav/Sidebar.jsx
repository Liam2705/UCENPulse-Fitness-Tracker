import logo from '../../assets/images/logo.svg';
import dashboard from '../../assets/images/dashboard.svg';
import logActivity from '../../assets/images/log-activity.svg';
import healthMetrics from '../../assets/images/health-metrics.svg';
import analytics from '../../assets/images/analytics.svg';
import '../../styles/Dashboard.css';
import AccountMenu from './AccountMenu';

function Sidebar() {
    return (
        <>
            <nav className="sidebar">
                <img src={logo} alt="logo" className="logo" />
                <ul className="menu">
                    <h3 className="menu-title">Menu</h3>
                    <a href="/" className="menu-text">
                        <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <img src={dashboard} alt='dashboard' className="menu-icon" />
                            <p className="menu-text">Dashboard</p>
                        </li>
                    </a>
                    <a href="log-activity" className="menu-text">
                        <li className={`menu-item ${location.pathname === '/log-activity' ? 'active' : ''}`}>
                            <img src={logActivity} alt='log-activity' className="menu-icon" />
                            <p href="log-activity" className="menu-text">Log Activity</p>
                        </li>
                    </a>
                    <a href="health-metrics" className="menu-text">
                        <li className={`menu-item ${location.pathname === '/health-metrics' ? 'active' : ''}`}>
                            <img src={healthMetrics} alt='health-metrics' className="menu-icon" />
                            <p href="health-metrics" className="menu-text">Health Metrics</p>
                        </li>
                    </a>
                    <a href="analytics" className="menu-text">
                        <li className={`menu-item ${location.pathname === '/analytics' ? 'active' : ''}`}>
                            <img src={analytics} alt='analytics' className="menu-icon" />
                            <p href="analytics" className="menu-text">Analytics</p>
                        </li>
                    </a>
                </ul>
                <AccountMenu/>
            </nav>

        </>
    );
}

export { Sidebar };