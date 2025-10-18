import React, { useState } from 'react';
import { Popover, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DateDisplay = () => {
  const currentDate = new Date();

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const formattedDate = currentDate.toLocaleDateString('en-UK', options);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CalendarTodayIcon />
      <Typography variant="h6" component="span" style={{ margin: '0 8px' }}>
        {formattedDate}
      </Typography>
    </div>
  );
};

export default DateDisplay;
