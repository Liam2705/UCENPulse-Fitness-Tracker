import { Sidebar } from '../components/nav/Sidebar.jsx';
import { SidebarMobile } from '../components/nav/SidebarMobile.jsx';
import { Header } from '../components/nav/Header.jsx';
import '../styles/Dashboard.css';
import { useMediaQuery } from 'react-responsive'
import StepsCard from '../components/cards/StepsCard.jsx';
import WaterCard from '../components/cards/WaterCard.jsx';
import CaloriesCard from '../components/cards/CaloriesCard.jsx';
import SleepCard from '../components/cards/SleepCard.jsx';
import PieChart from '../components/charts/PieChart.jsx';
import DoughnutChart from '../components/charts/DoughnutChart.jsx';
import CustomLineChart from '../components/charts/LineChart.jsx';
import AreaChart from '../components/charts/AreaChart.jsx';

function Dashboard() {

    const isMobile = useMediaQuery({ query: '(max-width: 981px)' });

    if (localStorage.getItem("metricGoals") === null) {
        const metricGoals = { stepsGoal: 10000, waterIntakeGoal: 2000, caloriesBurnedGoal: 500, sleepHoursGoal: 8 };
        localStorage.setItem("metricGoals", JSON.stringify(metricGoals));
    }


    return (
        <div className="dashboard-grid">
            {isMobile ? <SidebarMobile /> : <Sidebar />}
            <Header pageTitle={"Welcome Back!"} />
            <main className="main-content">
                <div className="content-grid">
                    <StepsCard />
                    <WaterCard />
                    <CaloriesCard />
                    <SleepCard />
                    <CustomLineChart label={"Weekly Steps Overview"} numDays={7} metricType={"steps"} />
                    <PieChart numDays={7} />
                    <DoughnutChart numDays={7} />
                    <AreaChart label={"Calories Burned Overview"} numDays={7} metricType={"caloriesBurned"} />
                </div>
            </main>
        </div>

    );
}

export { Dashboard };