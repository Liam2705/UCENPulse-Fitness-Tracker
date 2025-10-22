import BaseCard from './BaseCard';
import sleepIcon from '../assets/images/sleep.svg';

const SleepCard = () => {
    const sleep = 6;
    const goal = 8;
    const progress = (sleep / goal) * 100;

    return (
        <div className="sleep-card">
            <BaseCard 
                title="Sleep Hours"
                value={sleep}
                progress={progress}
                color="#8676FE" // Your specific color
                icon={<img src={sleepIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            >
            </BaseCard>
        </div>
    );
};

export default SleepCard;
