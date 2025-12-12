import React from 'react'
import { useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import getMetrics from '../../utils/getMetrics';

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HealthMetricTracker = () => {

  const [steps, setSteps] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];
  const existingMetrics = JSON.parse(localStorage.getItem('healthMetrics')) || [];

  const todayMetrics = existingMetrics.find(metric => metric.date === currentDate);

  // If today's metrics do not exist, initialize them with 0 as the default value
  if (!todayMetrics) {
    const newMetrics = { date: currentDate, steps: 0, waterIntake: 0, sleepHours: 0, caloriesBurned: 0 };
    existingMetrics.push(newMetrics);
    localStorage.setItem('healthMetrics', JSON.stringify(existingMetrics));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Validate inputs
    if (steps < 0 || waterIntake < 0 || sleepHours < 0 || caloriesBurned < 0) {
      setError('Fields cannot be negative. Please fill in all metrics.');
      return;
    }

    const healthMetrics = { date: currentDate, steps, waterIntake, sleepHours, caloriesBurned };
    const existingMetrics = JSON.parse(localStorage.getItem('healthMetrics')) || [];
    // Check if today's metrics already exist by accessing the date property
    const todayMetricsIndex = existingMetrics.findIndex(metric => metric.date === currentDate);

    // If they exist, update them; otherwise, add new entry
    if (todayMetricsIndex !== -1) {
      existingMetrics[todayMetricsIndex] = healthMetrics;
    } else {
      const newMetrics = { date: currentDate, steps, waterIntake, sleepHours, caloriesBurned };
      existingMetrics.push(newMetrics);
    }

    // Save back to localStorage
    localStorage.setItem('healthMetrics', JSON.stringify(existingMetrics));
    // Show confirmation message
    setConfirmation(true);
    // Clear input fields
    setSteps(0);
    setWaterIntake(0);
    setSleepHours(0);
    setCaloriesBurned(0);
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
          Today's Health Metrics
        </Typography>
        <Typography variant="h6" align="left" color="var(--primary-colour)" gutterBottom>
          Track your daily health and wellness metrics.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            fullWidth
            label="Steps *"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            margin="normal"
          >
          </TextField>

          <TextField
            type="number"
            fullWidth
            label="Water Intake *"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
            margin="normal"
          />

          <TextField
            type="number"
            fullWidth
            label="Hours of Sleep *"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            margin="normal"
          />

          <TextField
            type="number"
            fullWidth
            label="Calories Burned *"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: '16px', backgroundColor: "var(--primary-colour)" }}
          >
            Save Metrics
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h5" align="left" color="var(--primary-colour)" gutterBottom>
          Today's Summary
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "center", alignItems: "center", }}>
          <Grid size={{ sm: "auto", lg: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="var(--primary-colour)">{getMetrics('steps')} steps</Typography>
                <Typography color="var(--primary-colour)">steps</Typography>
              </CardContent>
            </Card>
          </Grid >
          <Grid size={{ sm: "auto", lg: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="var(--primary-colour)">{getMetrics('waterIntake')} ml</Typography>
                <Typography color="var(--primary-colour)">water</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ sm: "auto", lg: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="var(--primary-colour)">{getMetrics('sleepHours')} hours</Typography>
                <Typography color="var(--primary-colour)">sleep</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ sm: "auto", lg: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="var(--primary-colour)">{getMetrics('caloriesBurned')} calories</Typography>
                <Typography color="var(--primary-colour)">burned</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={confirmation} autoHideDuration={6000} onClose={handleConfirmationClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success">
          {"Metrics saved successfully!"}
        </Alert>
      </Snackbar>

    </Container>
  )
}

export default HealthMetricTracker