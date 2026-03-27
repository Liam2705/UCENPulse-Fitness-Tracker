import { useState } from 'react';
import '../../styles/Dashboard.css';
import settings from '../../assets/images/settings.svg';
import account from '../../assets/images/account.svg';
import SettingsModal from '../../utils/SettingsModal';
import { logout } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { LogoutOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import useUser from '../../hooks/useUser'

const AccountMenu = () => {
    const navigate = useNavigate()

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
        // Save the updated goals to localStorage
        const metricGoals = { stepsGoal: stepsGoal, waterIntakeGoal: waterIntakeGoal, caloriesBurnedGoal: caloriesBurnedGoal, sleepHoursGoal: sleepHoursGoal };
        localStorage.setItem('metricGoals', JSON.stringify(metricGoals));

        handleClose();
    };

    const user = useUser()

    return (
        <>
            <div className="account-menu">
                <h3 className="menu-title">User</h3>
                <div className="account-info">
                    <img src={account} alt="account-icon" />
                    <p className="menu-text">{user?.firstName} {user?.lastName}</p>
                    <div className="settings">
                        <Tooltip title="Settings">
                            <button className="settings-button" onClick={handleOpen}>
                                <img src={settings} alt='settings' className="menu-icon" />
                            </button>
                        </Tooltip>
                        <Tooltip title="Logout">
                            <IconButton
                                onClick={() => logout(navigate)}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '8px',
                                    color: '#838383',
                                    '&:hover': {
                                        backgroundColor: 'var(--accent-colour)',
                                    }
                                }}
                            >
                                <LogoutOutlined sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <SettingsModal
                // Pass functions as props to SettingsModal
                open={open}
                handleClose={handleClose}
                onSubmit={handleSubmit}
            />
        </>

    )
}

export default AccountMenu