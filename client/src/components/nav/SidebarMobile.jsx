import logo from '../../assets/images/logo.svg';
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