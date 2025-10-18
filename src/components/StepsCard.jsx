import BaseCard from './BaseCard';
import { AccessAlarm } from '@mui/icons-material';
import stepsIcon from '../assets/images/steps.svg';

const StepsCard = () => {
    const steps = 1200;
    const goal = 5000;
    const progress = (steps / goal) * 100;

    return (
        <div className="steps-card">
            <BaseCard 
                title="Steps"
                value={steps}
                progress={progress}
                color="#1AB0B0" // Your specific color
                icon={<img src={stepsIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            />
        </div>
    );
};

export default StepsCard;
