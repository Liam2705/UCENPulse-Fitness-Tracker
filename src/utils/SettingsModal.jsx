import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

const SettingsModal = ({open, handleClose}) => {    
    // State variables for each health metric goal, initialized from localStorage if available
    const [stepsGoal, setStepsGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).stepsGoal : 0);
    const [waterIntakeGoal, setWaterIntakeGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).waterIntakeGoal : 0);
    const [caloriesBurnedGoal, setCaloriesBurnedGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).caloriesBurnedGoal : 0);
    const [sleepHoursGoal, setSleepHoursGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).sleepHoursGoal : 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Save goals to localStorage
        const metricGoals = { stepsGoal: stepsGoal, waterIntakeGoal: waterIntakeGoal, caloriesBurnedGoal: caloriesBurnedGoal, sleepHoursGoal: sleepHoursGoal };
        localStorage.setItem('metricGoals', JSON.stringify(metricGoals));

        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color='#214984'>Modify your goals</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="steps"
                            label="Steps"
                            value={stepsGoal}
                            onChange={(e) => setStepsGoal(e.target.value)}
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="waterIntake"
                            label="Water Intake (ml)"
                            value={waterIntakeGoal}
                            onChange={(e) => setWaterIntakeGoal(e.target.value)}
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="sleepHours"
                            label="Hours of Sleep"
                            value={sleepHoursGoal}
                            onChange={(e) => setSleepHoursGoal(e.target.value)}
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="caloriesBurned"
                            label="Calories Burned"
                            value={caloriesBurnedGoal}
                            onChange={(e) => setCaloriesBurnedGoal(e.target.value)}
                            type="number"
                            fullWidth
                            variant="outlined"
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default SettingsModal