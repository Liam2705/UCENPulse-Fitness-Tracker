import BaseCard from './BaseCard';
import sleepIcon from '../../assets/images/sleep.svg';

const SleepCard = ({sleep, goal}) => {
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
