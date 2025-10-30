import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import menu from '../../assets/images/menu.svg';
import dashboard from '../../assets/images/dashboard.svg';
import logActivity from '../../assets/images/log-activity.svg';
import healthMetrics from '../../assets/images/health-metrics.svg';
import analytics from '../../assets/images/analytics.svg';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
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
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><img src={menu} alt="menu button" /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
}
