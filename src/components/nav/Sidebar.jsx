import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import dashboard from '../../assets/images/dashboard.svg';
import logActivity from '../../assets/images/log-activity.svg';
import healthMetrics from '../../assets/images/health-metrics.svg';
import analytics from '../../assets/images/analytics.svg';
import '../../styles/Dashboard.css';
import settings from '../../assets/images/settings.svg';
import account from '../../assets/images/account.svg';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

function Sidebar() {

    const [open, setOpen] = useState(false);
    const [stepsGoal, setStepsGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).stepsGoal : 0);
    const [waterIntakeGoal, setWaterIntakeGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).waterIntakeGoal : 0);
    const [caloriesBurnedGoal, setCaloriesBurnedGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).caloriesBurnedGoal : 0);
    const [sleepHoursGoal, setSleepHoursGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).sleepHoursGoal : 0);

    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const metricGoals = {stepsGoal: stepsGoal, waterIntakeGoal: waterIntakeGoal, caloriesBurnedGoal: caloriesBurnedGoal, sleepHoursGoal: sleepHoursGoal};
        localStorage.setItem('metricGoals', JSON.stringify(metricGoals));

        handleClose();
    };


    return (
        <>
            <nav className="sidebar">
                <img src={logo} alt="logo" className="logo" />
                <ul className="menu">
                    <h3 className="menu-title">Menu</h3>
                    <a href="/" className="menu-text"><li className="menu-item"><img src={dashboard} className="menu-icon" /><p className="menu-text">Dashboard</p></li></a>
                    <a href="log-activity" className="menu-text"><li className="menu-item"><img src={logActivity} className="menu-icon" /><p href="log-activity" className="menu-text">Log Activity</p></li></a>
                    <a href="health-metrics" className="menu-text"><li className="menu-item"><img src={healthMetrics} className="menu-icon" /><p href="health-metrics" className="menu-text">Health Metrics</p></li></a>
                    <a href="analytics" className="menu-text"><li className="menu-item"><img src={analytics} className="menu-icon" /><p href="analytics" className="menu-text">Analytics</p></li></a>
                </ul>
                <div className="account-menu">
                    <h3 className="menu-title">User</h3>
                    <div className="account-info">
                        <img src={account} alt="account-icon" />
                        <p className="menu-text">John Doe</p>
                        <div className="settings">
                            <button className="settings-button" onClick={handleClickOpen}>
                                <img src={settings} className="settings-icon" />
                            </button>
                        </div>

                    </div>
                </div>
            </nav>
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
    );
}

export { Sidebar };