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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActivityForm = () => {
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

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

    const activityData = { activityType, duration: Number(duration), date, notes };
    console.log(activityData);


    const existingActivities = JSON.parse(localStorage.getItem('activities')) || [];
    existingActivities.push(activityData);
    
    localStorage.setItem('activities', JSON.stringify(existingActivities));

    setActivityType('');
    setDuration('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  const handleClose = () => {
    setError('');
  };

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
                style={{ marginTop: '16px', backgroundColor: "var(--primary-colour)"}}
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
    </Container>
  );
};

export default ActivityForm;
