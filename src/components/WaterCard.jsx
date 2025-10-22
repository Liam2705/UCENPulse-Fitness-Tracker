import BaseCard from './BaseCard';
import waterIcon from '../assets/images/water.svg';

const WaterCard = () => {
    const water = 500;
    const goal = 3000;
    const progress = (water / goal) * 100;

    return (
        <div className="water-card">
            <BaseCard 
                title="Water Intake"
                value={water}
                progress={progress}
                color="#FF7443" // Your specific color
                icon={<img src={waterIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            >
            </BaseCard>
        </div>
    );
};

export default WaterCard;
