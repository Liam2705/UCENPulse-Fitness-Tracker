import React, { useState } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActivityForm = () => {
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  // The MET values for different activities
  const activityValues = {
    Running: 9.8,
    Cycling: 7.5,
    Swimming: 7.0,
    Gym: 5.0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];


    if (!activityType) {
      setError('Activity Type must be selected.');
      return;
    }

    if (duration < 1 || duration > 1440) {
      setError('Duration must be between 1 and 1440 minutes.');
      return;
    }

    setError('');

    const activityData = { activityType, duration: Number(duration), caloriesBurned, date, notes };

    // Calculating the estimated calories burned based on activity type and duration using MET values
    const MET = activityValues[activityType];
    const weightKg = 70;
    const calories = (MET * 3.5 * weightKg / 200) * Number(duration);
    activityData.caloriesBurned = Math.round(calories);
    setCaloriesBurned(activityData.caloriesBurned);

    // Retrieve current metrics from localStorage
    let healthMetrics = JSON.parse(localStorage.getItem('healthMetrics')) || [];
    
    // Find today's metrics entry
    const todayMetricsIndex = healthMetrics.findIndex(data => data.date === currentDate);

    if (todayMetricsIndex > -1) {
        // Update the existing entry for current day
        healthMetrics[todayMetricsIndex].caloriesBurned += activityData.caloriesBurned;
    } else {
        // Create a new entry if none exists for today
        healthMetrics.push({ date: currentDate, steps: 0, waterIntake: 0, sleepHours: 0, caloriesBurned: activityData.caloriesBurned });
    }

    localStorage.setItem('healthMetrics', JSON.stringify(healthMetrics));

    const existingActivities = JSON.parse(localStorage.getItem('activities')) || [];
    existingActivities.push(activityData);

    localStorage.setItem('activities', JSON.stringify(existingActivities));

    setConfirmation(true);

    setActivityType('');
    setDuration('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  const handleClose = () => {
    setError('');
  };

  const handleConfirmationClose = () => {
    setConfirmation(false);
  }

  return (
    <Container component="main" padding="10px">
      <Paper elevation={3} style={{ padding: '26px' }}>
        <Typography variant="h4" align="left" color="var(--primary-colour)" gutterBottom>
          Log a New Activity
        </Typography>
        <Typography variant="h6" align="left" color="var(--primary-colour)" gutterBottom>
          Record your workout and activities to track your fitness progress.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Activity Type *"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            margin="normal"
            error={!!error}
            helperText={error.includes('ActivityType') ? error : ''}
          >
            <MenuItem value="Running">Running</MenuItem>
            <MenuItem value="Cycling">Cycling</MenuItem>
            <MenuItem value="Swimming">Swimming</MenuItem>
            <MenuItem value="Gym">Gym</MenuItem>
          </TextField>

          <TextField
            type="number"
            fullWidth
            label="Duration (minutes) *"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            margin="normal"
            error={!!error}
            helperText={error.includes('Duration') ? error : ''}
          />

          <TextField
            type="date"
            fullWidth
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: '16px', backgroundColor: "var(--primary-colour)" }}
          >
            Log Activity
          </Button>
        </form>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={confirmation} autoHideDuration={6000} onClose={handleConfirmationClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success">
          {"Activity logged successfully!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ActivityForm;
