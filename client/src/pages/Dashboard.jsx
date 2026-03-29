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
import useUser from '../hooks/useUser.js';
import { useState, useEffect } from 'react';
import { getMetrics, getGoals, getActivities } from '../services/api.js';

function Dashboard() {
    const isMobile = useMediaQuery({ query: '(max-width: 981px)' });
    const user = useUser()

    const [loading, setLoading] = useState(true)
    const [metrics, setMetrics] = useState([])
    const [activities, setActivities] = useState([])
    const [goals, setGoals] = useState({
        stepsGoal: 10000,
        waterGoal: 2.5,
        caloriesGoal: 1000,
        sleepGoal: 8
    });

    useEffect(() => {
        Promise.all([getMetrics(), getGoals(), getActivities()])
            .then(([metricsData, goalsData, activitiesData]) => {
                setMetrics(metricsData);
                setGoals(goalsData);
                setActivities(activitiesData)
                setLoading(false);
            });
    }, []);

    // Gets the most recent metric entry
    const todayStr = new Date().toISOString().split('T')[0]
    const latest = metrics.find(m => m.date?.split('T')[0] === todayStr) ?? {}

    if (loading) return <div className="dashboard-loading">Loading...</div>



    return (
        <div className="dashboard-grid">
            {isMobile ? <SidebarMobile /> : <Sidebar />}
            <Header pageTitle={`Welcome Back ${user?.firstName}!`} />
            <main className="main-content">
                <div className="content-grid">
                    <StepsCard steps={latest.steps ?? 0} goal={goals.stepsGoal} />
                    <WaterCard water={latest.waterIntake ?? 0} goal={goals.waterGoal} />
                    <CaloriesCard calories={latest.caloriesBurned ?? 0} goal={goals.caloriesGoal} />
                    <SleepCard sleep={latest.sleepHours ?? 0} goal={goals.sleepGoal} />
                    <CustomLineChart label={"Weekly Steps Overview"} numDays={7} metricType={"steps"} metrics={metrics} />
                    <PieChart numDays={7} activities={activities} />
                    <DoughnutChart numDays={7} activities={activities} />
                    <AreaChart label={"Calories Burned Overview"} numDays={7} metricType={"caloriesBurned"} metrics={metrics} />
                </div>
            </main>
        </div>

    );
}

export { Dashboard };