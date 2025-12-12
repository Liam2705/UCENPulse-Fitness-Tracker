import React from 'react';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import CustomLineChart from '../charts/LineChart.jsx';
import DoughnutChart from '../charts/DoughnutChart.jsx';
import BasicPie from '../charts/PieChart.jsx';

const DataVisualization = () => {

  const [value, setValue] = React.useState(0);
  const [healthMetric, setHealthMetric] = React.useState('steps');
  const [timeMetric, setTimeMetric] = React.useState(7);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // Dynamically changes graph label to current selection
  const lineGraphLabel = healthMetric.charAt(0).toUpperCase() + healthMetric.slice(1).replace(/([A-Z])/g, ' $1') + ' Overview';

  const renderChart = () => {
    switch (value) {
      case 0: // Trends tab
        return <CustomLineChart label={lineGraphLabel} numDays={timeMetric} metricType={healthMetric} />;
      case 1: // Activities tab
        return <BasicPie numDays={timeMetric} />;
      case 2: // Distribution tab
        return <DoughnutChart numDays={timeMetric} />;
      default:
        return null;
    }
  };

  // Disable metric selection for Activities and Distribution tabs
  const disableMetricSelection = value === 1 || value === 2;

  return (

    <div>
      <Container component="main" padding="10px" maxWidth="xl">
        <Paper elevation={3} style={{ padding: '26px' }}>
          <Typography variant="h4" align="left" color="var(--primary-colour)" gutterBottom>
            Analytics and Insights
          </Typography>
          <Typography variant="h6" align="left" color="var(--primary-colour)" gutterBottom>
            Visualize your fitness data and track your progress over time.
          </Typography>
          <Divider></Divider>
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <Typography variant="h6" fontWeight={900} align="left" color="var(--primary-colour)" sx={{ flexGrow: 1 }}>
              Data Visualisation
            </Typography>
            <Box display="flex" alignItems="center" flexWrap={"wrap"}>
              <TextField
                select
                label="Health Metric"
                value={healthMetric}
                onChange={(e) => setHealthMetric(e.target.value)}
                margin="normal"
                sx={{ marginLeft: '10px' }}
                disabled={disableMetricSelection}
              >
                <MenuItem value="steps">Steps</MenuItem>
                <MenuItem value="waterIntake">Water Intake</MenuItem>
                <MenuItem value="sleepHours">Sleep Hours</MenuItem>
                <MenuItem value="caloriesBurned">Calories Burned</MenuItem>
              </TextField>
              <TextField
                select
                label="Time"
                value={timeMetric}
                onChange={(e) => setTimeMetric(e.target.value)}
                margin="normal"
                sx={{ marginLeft: '10px' }}
              >
                <MenuItem value="7">7 Days</MenuItem>
                <MenuItem value="14">14 Days</MenuItem>
                <MenuItem value="30">30 Days</MenuItem>
              </TextField>
            </Box>
          </Box>
          <Divider></Divider>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
            sx={{ margin: '10px' }}
          >
            <Tab label="Trends" />
            <Tab label="Activities" />
            <Tab label="Distribution" />
          </Tabs>
          {renderChart()}
        </Paper>
      </Container>
    </div>
  );
};

export default DataVisualization;
