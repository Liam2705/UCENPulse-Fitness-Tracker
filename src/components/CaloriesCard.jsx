import BaseCard from './BaseCard';
import caloriesIcon from '../assets/images/calories.svg';

const CaloriesCard = () => {
    const calories = 1300;
    const goal = 3000;
    const progress = (calories / goal) * 100;

    return (
        <div className="calorie-card">
            <BaseCard 
                title="Calories Burned"
                value={calories}
                progress={progress}
                color="#F55E80" // Your specific color
                icon={<img src={caloriesIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            >
            </BaseCard>
        </div>
    );
};

export default CaloriesCard;
