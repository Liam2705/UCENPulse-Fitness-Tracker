import BaseCard from './BaseCard';
import stepsIcon from '../../assets/images/steps.svg';

const StepsCard = ({steps, goal}) => {
    const progress = (steps / goal) * 100;

    return (
        // Custom card for displaying steps based on BaseCard props
        <div className="steps-card">
            <BaseCard 
                title="Steps Today"
                value={steps}
                progress={progress}
                color="#04842a"
                icon={<img src={stepsIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            />
        </div>
    );
};

export default StepsCard;
