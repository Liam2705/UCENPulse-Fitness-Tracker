import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, CircularProgress,
} from '@mui/material';
import { getGoals, updateGoals } from '../services/api.js';

const SettingsModal = ({ open, handleClose }) => {
    const [stepsGoal, setStepsGoal] = useState(0);
    const [waterIntakeGoal, setWaterIntakeGoal] = useState(0);
    const [caloriesBurnedGoal, setCaloriesBurnedGoal] = useState(0);
    const [sleepHoursGoal, setSleepHoursGoal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Load current goals whenever the modal opens
    useEffect(() => {
        if (!open) return
        setLoading(true)
        getGoals().then(data => {
            setStepsGoal(data.stepsGoal ?? 0)
            setWaterIntakeGoal(data.waterGoal ?? 0)
            setCaloriesBurnedGoal(data.caloriesGoal ?? 0)
            setSleepHoursGoal(data.sleepGoal ?? 0)
            setLoading(false)
        })
    }, [open])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true)
        try {
            await updateGoals({
                stepsGoal: Number(stepsGoal),
                waterGoal: Number(waterIntakeGoal),
                caloriesGoal: Number(caloriesBurnedGoal),
                sleepGoal: Number(sleepHoursGoal),
            })
            handleClose()
        } catch (err) {
            console.error('Failed to save goals', err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle color='#214984'>Modify your goals</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField autoFocus margin="dense" id="steps" label="Steps"
                            value={stepsGoal} onChange={(e) => setStepsGoal(e.target.value)}
                            type="number" fullWidth variant="outlined" />
                        <TextField margin="dense" id="waterIntake" label="Water Intake (litres)"
                            value={waterIntakeGoal} onChange={(e) => setWaterIntakeGoal(e.target.value)}
                            type="number" fullWidth variant="outlined" />
                        <TextField margin="dense" id="sleepHours" label="Hours of Sleep"
                            value={sleepHoursGoal} onChange={(e) => setSleepHoursGoal(e.target.value)}
                            type="number" fullWidth variant="outlined" />
                        <TextField margin="dense" id="caloriesBurned" label="Calories Burned"
                            value={caloriesBurnedGoal} onChange={(e) => setCaloriesBurnedGoal(e.target.value)}
                            type="number" fullWidth variant="outlined" />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" disabled={submitting}>
                                {submitting ? 'Saving...' : 'Submit'}
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal