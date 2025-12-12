import BaseCard from './BaseCard';
import sleepIcon from '../../assets/images/sleep.svg';
import getMetrics from '../../utils/getMetrics';

const SleepCard = () => {
    const sleep = getMetrics('sleepHours');
    const goal = localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).sleepHoursGoal : 8;
    const progress = (sleep / goal) * 100;

    return (
        // Custom card for displaying hours sleep based on BaseCard props
        <div className="sleep-card">
            <BaseCard 
                title="Sleep Hours"
                value={sleep}
                progress={progress}
                color="#6554EE"
                icon={<img src={sleepIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            >
            </BaseCard>
        </div>
    );
};

export default SleepCard;
