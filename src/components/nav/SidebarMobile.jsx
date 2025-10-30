import logo from '../../assets/images/logo.svg';
import dashboard from '../../assets/images/dashboard.svg';
import logActivity from '../../assets/images/log-activity.svg';
import healthMetrics from '../../assets/images/health-metrics.svg';
import analytics from '../../assets/images/analytics.svg';
import menu from '../../assets/images/menu.svg';
import '../../styles/Dashboard.css';
import Drawer from './Drawer.jsx';

function SidebarMobile() {
    return (
        <>
        <nav className="sidebar-mobile">
            <img src={logo} alt="logo" className="logo" />
            <Drawer />
        </nav>
        </>
    );
}

export {SidebarMobile};