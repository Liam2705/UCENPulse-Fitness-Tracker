import {Sidebar} from '../components/Sidebar.jsx';
import {SidebarMobile} from '../components/SidebarMobile.jsx';
import {Header} from '../components/Header.jsx';
import '../styles/Dashboard.css';
import MediaQuery from 'react-responsive';
import { useMediaQuery } from 'react-responsive'

function Dashboard() {

const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

    return (
            <div className="dashboard-container">
                {isMobile ? <SidebarMobile /> : <Sidebar />}
                <div className="main-content">
                    <Header />
                </div>
                
            </div>
        );
    
}

export {Dashboard};