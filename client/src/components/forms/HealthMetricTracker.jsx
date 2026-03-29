import React, { useState, useEffect } from 'react'
import {
  Container, TextField, Grid, Card, CardContent,
  Button, Typography, Paper, Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { createMetric, getMetrics } from '../../services/api';

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
  const [todaySummary, setTodaySummary] = useState({
    steps: 0, waterIntake: 0, sleepHours: 0, caloriesBurned: 0
  });

  // Load today's existing metrics for the summary cards
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    getMetrics().then(data => {
      const todayEntry = data.find(m => m.date?.split('T')[0] === today);
      if (todayEntry) setTodaySummary(todayEntry);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (steps < 0 || waterIntake < 0 || sleepHours < 0 || caloriesBurned < 0) {
      setError('Fields cannot be negative. Please fill in all metrics.');
      return;
    }

    try {
      const saved = await createMetric({
        steps: Number(steps),
        waterIntake: Number(waterIntake),
        sleepHours: Number(sleepHours),
        caloriesBurned: Number(caloriesBurned),
      });

      // Update summary cards with the saved values
      setTodaySummary(saved);
      setConfirmation(true);
      setSteps('');
      setWaterIntake('');
      setSleepHours('');
      setCaloriesBurned('');
    } catch (error) {
      console.error(error.message);
      setError('Failed to save metrics. Please try again.');
    }
  };

  const handleClose = () => setError('');
  const handleConfirmationClose = () => setConfirmation(false);

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
            onChange={(e) => setSteps(e.target.value)} margin="normal" />
          <TextField
            type="number"
            fullWidth
            label="Water Intake (litres) *"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)} margin="normal" />
          <TextField
            type="number"
            fullWidth
            label="Hours of Sleep *"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)} margin="normal" />
          <TextField
            type="number"
            fullWidth
            label="Calories Burned *"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)} margin="normal" />
          <Button type="submit" variant="contained" fullWidth
            style={{ marginTop: '16px', backgroundColor: "var(--primary-colour)" }}>
            Save Metrics
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h5" align="left" color="var(--primary-colour)" gutterBottom>
          Today's Summary
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "center", alignItems: "center" }}>
          {[
            { value: todaySummary.steps, label: 'steps', unit: 'steps' },
            { value: todaySummary.waterIntake, label: 'water', unit: 'ml' },
            { value: todaySummary.sleepHours, label: 'sleep', unit: 'hours' },
            { value: todaySummary.caloriesBurned, label: 'burned', unit: 'calories' },
          ].map(({ value, label, unit }) => (
            <Grid key={label} size={{ sm: "auto", lg: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="var(--primary-colour)">{value ?? 0} {unit}</Typography>
                  <Typography color="var(--primary-colour)">{label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar open={confirmation} autoHideDuration={6000} onClose={handleConfirmationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleConfirmationClose} severity="success">Metrics saved successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default HealthMetricTracker;