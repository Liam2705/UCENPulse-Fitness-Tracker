import BaseCard from './BaseCard';
import caloriesIcon from '../../assets/images/calories.svg';
import getMetrics from '../../utils/getMetrics';

const CaloriesCard = () => {
    const calories = getMetrics('caloriesBurned');
    const goal = 500;
    const progress = (calories / goal) * 100;

    return (
        <div className="calorie-card">
            <BaseCard 
                title="Calories Burned"
                value={calories}
                progress={progress}
                color="#F55E80"
                icon={<img src={caloriesIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            >
            </BaseCard>
        </div>
    );
};

export default CaloriesCard;
