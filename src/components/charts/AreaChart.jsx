import { useEffect, useState } from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';

const margin = { right: 24 };

// Helper function to get ordinal suffix for a number (example: 1st, 2nd, 3rd, 4th)
const getOrdinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
};

// Helper function to get dates for a given number of days based on the numDays prop
const getPastDays = (numDays) => {
  const dates = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

export default function AreaChart({label, numDays = 7, metricType}) {

    const [metricData, setMetricData] = useState([]);
    const daysData = getPastDays(numDays);
    
      // Load health metric from localStorage based on metricType and numDays
      useEffect(() => {
        const existingMetrics = JSON.parse(localStorage.getItem('healthMetrics')) || [];
        const pastDays = getPastDays(numDays);
        // Map dates to corresponding metric values, defaulting to 0 if no data exists
        const dataForPastDays = pastDays.map(date => {
          const formattedDate = date.toISOString().split('T')[0];
          const metrics = existingMetrics.find(metric => metric.date === formattedDate);
          return metrics ? metrics[metricType] : 0;
        });
    
        setMetricData(dataForPastDays);
      }, [numDays, metricType]);


    return (
        <div className="area-chart">
            <h2>{label}</h2>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[{ data: metricData, label: label, area: true, showMark: false, connectNulls: true }]}
                    xAxis={[{
                        scaleType: 'band',
                        data: daysData,
                        valueFormatter: (date) => {
                            const day = date.getDate();
                            const month = date.toLocaleString('en-US', { month: 'short' });
                            return `${day}${getOrdinalSuffix(day)} ${month}`;
                        },
                    }]}
                    sx={{
                        [`& .${lineElementClasses.root}`]: {
                            display: 'none',
                        },
                    }}
                    margin={margin}
                    aria-label={`${label} Chart`}
                />
            </Box>
        </div>
    );
}