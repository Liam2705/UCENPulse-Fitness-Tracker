import BaseCard from './BaseCard';
import caloriesIcon from '../../assets/images/calories.svg';

const CaloriesCard = ({calories, goal}) => {
    const progress = (calories / goal) * 100;

    return (
        // Custom card for displaying calories burned based on BaseCard props
        <div className="calorie-card">
            <BaseCard 
                title="Calories Burned"
                value={calories}
                progress={progress}
                color="#d13741"
                icon={<img src={caloriesIcon} alt="Steps icon" style={{ width: 24, height: 24, marginRight: 8 }} />}
            >
            </BaseCard>
        </div>
    );
};

export default CaloriesCard;
