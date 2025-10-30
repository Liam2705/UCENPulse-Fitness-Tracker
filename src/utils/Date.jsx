import React, { useState } from 'react';
import { Popover, Typography, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const DateDisplay = () => {
  const currentDate = new Date();
  const [anchorEl, setAnchorEl] = useState(null);

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = currentDate.toLocaleDateString('en-UK', options);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CalendarTodayIcon />
        <Typography variant="h6" component="span" style={{ margin: '0 8px' }}>
          {formattedDate}
        </Typography>
        <IconButton onClick={handleClick}>
          <KeyboardArrowDownIcon />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ padding: '16px' }}>
            <DateCalendar />
          </div>
        </Popover>
      </div>
    </LocalizationProvider>
  );
};

export default DateDisplay;
