import React, { useState } from 'react';
import '../../styles/Dashboard.css';
import settings from '../../assets/images/settings.svg';
import account from '../../assets/images/account.svg';
import SettingsModal from '../../utils/SettingsModal';

const AccountMenu = () => {
    const [open, setOpen] = useState(false);
    const [stepsGoal, setStepsGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).stepsGoal : 0);
    const [waterIntakeGoal, setWaterIntakeGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).waterIntakeGoal : 0);
    const [caloriesBurnedGoal, setCaloriesBurnedGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).caloriesBurnedGoal : 0);
    const [sleepHoursGoal, setSleepHoursGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).sleepHoursGoal : 0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const metricGoals = { stepsGoal: stepsGoal, waterIntakeGoal: waterIntakeGoal, caloriesBurnedGoal: caloriesBurnedGoal, sleepHoursGoal: sleepHoursGoal };
        localStorage.setItem('metricGoals', JSON.stringify(metricGoals));

        handleClose();
    };

    return (
        <>
            <div className="account-menu">
                <h3 className="menu-title">User</h3>
                <div className="account-info">
                    <img src={account} alt="account-icon" />
                    <p className="menu-text">John Smith</p>
                    <div className="settings">
                        <button className="settings-button" onClick={handleOpen}>
                            <img src={settings} className="settings-icon" />
                        </button>
                    </div>
                </div>
            </div>
            <SettingsModal 
                open={open} 
                handleClose={handleClose} 
                onSubmit={handleSubmit} 
            />
        </>

    )
}

export default AccountMenu