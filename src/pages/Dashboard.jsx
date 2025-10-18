import {Sidebar} from '../components/Sidebar.jsx';
import {SidebarMobile} from '../components/SidebarMobile.jsx';
import {Header} from '../components/Header.jsx';
import '../styles/Dashboard.css';
import { useMediaQuery } from 'react-responsive'
import StepsCard from '../components/StepsCard.jsx';
import WaterCard from '../components/WaterCard.jsx';
import CaloriesCard from '../components/CaloriesCard.jsx';
import SleepCard from '../components/SleepCard.jsx';
import PieChart from '../components/PieChart.jsx';
import DoughnutChart from '../components/DoughnutChart.jsx';
import WeeklyStepsLineChart from '../components/LineChart.jsx';
import AreaChart from '../components/AreaChart.jsx';

function Dashboard() {

const isMobile = useMediaQuery({ query: '(max-width: 981px)' });

    return (
            <div className="dashboard-grid">
                {isMobile ? <SidebarMobile /> : <Sidebar />}
                <Header />
                <main className="main-content">
                    <div className="content-grid">
                        <StepsCard />
                        <WaterCard />
                        <CaloriesCard />
                        <SleepCard />
                        <WeeklyStepsLineChart />
                        <PieChart />
                        <DoughnutChart />
                        <AreaChart />
                    </div>
                </main>
            </div>

    );        
}

export {Dashboard};