import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import menu from '../../assets/images/menu.svg';
import dashboard from '../../assets/images/dashboard.svg';
import logActivity from '../../assets/images/log-activity.svg';
import healthMetrics from '../../assets/images/health-metrics.svg';
import analytics from '../../assets/images/analytics.svg';
import settings from '../../assets/images/settings.svg';
import AccountMenu from './AccountMenu';
import SettingsModal from '../../utils/SettingsModal';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [stepsGoal, setStepsGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).stepsGoal : 0);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).waterIntakeGoal : 0);
  const [caloriesBurnedGoal, setCaloriesBurnedGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).caloriesBurnedGoal : 0);
  const [sleepHoursGoal, setSleepHoursGoal] = useState(localStorage.getItem('metricGoals') ? JSON.parse(localStorage.getItem('metricGoals')).sleepHoursGoal : 0);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const metricGoals = { stepsGoal: stepsGoal, waterIntakeGoal: waterIntakeGoal, caloriesBurnedGoal: caloriesBurnedGoal, sleepHoursGoal: sleepHoursGoal };
    localStorage.setItem('metricGoals', JSON.stringify(metricGoals));

    handleClose();
  };
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: dashboard, path: '/' },
    { text: 'Log Activity', icon: logActivity, path: '/log-activity' },
    { text: 'Health Metrics', icon: healthMetrics, path: '/health-metrics' },
    { text: 'Analytics', icon: analytics, path: '/analytics' },
  ];

  const handleMenuItemClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleClick = () => {
    setOpenModal(true);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
              <ListItemIcon>
                <img src={item.icon} alt={`${item.text} Icon`} style={{ width: '24px', height: '24px' }} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <img src={settings} alt={'Settings Icon'} style={{ width: '24px', height: '24px' }} />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <Button onClick={toggleDrawer(true)}><img src={menu} alt="menu button" /></Button>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          {DrawerList}
        </Drawer>
      </div>
      <SettingsModal 
                open={openModal} 
                handleClose={handleClose} 
                onSubmit={handleSubmit} 
            />
    </>
  );
}
