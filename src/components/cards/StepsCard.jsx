import BaseCard from './BaseCard';
import stepsIcon from '../../assets/images/steps.svg';
import getMetrics from '../../utils/getMetrics';

const StepsCard = () => {

    let steps = getMetrics('steps');
    
    const goal = 10000;
    const progress = (steps / goal) * 100;

    return (
        <div className="steps-card">
            <BaseCard 
                title="Steps Today"
                value={steps}
                progress={progress}
                color="#1AB0B0"
                icon={<img src={stepsIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            />
        </div>
    );
};

export default StepsCard;
