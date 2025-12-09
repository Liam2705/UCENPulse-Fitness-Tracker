import * as React from 'react';
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const getPastDays = (numDays) => {
  const dates = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

// Helper function to get ordinal suffix for a number (example: 1st, 2nd, 3rd, 4th)
const getOrdinalSuffix = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export default function CustomLineChart({ label, numDays = 7, metricType }) {
  const [metricData, setMetricData] = useState([]);

  // Load health metric from localStorage based on metricType and numDays
  useEffect(() => {
    const existingMetrics = JSON.parse(localStorage.getItem('healthMetrics')) || [];
    const pastDays = getPastDays(numDays);
    
    const dataForPastDays = pastDays.map(date => {
      const formattedDate = date.toISOString().split('T')[0];
      const metrics = existingMetrics.find(metric => metric.date === formattedDate);
      return metrics ? metrics[metricType] : 0;
    });

    setMetricData(dataForPastDays);
  }, [numDays, metricType]);

  const daysData = getPastDays(numDays);

  return (
    <div className="line-chart">
      <h2>{label}</h2>
      <LineChart
        xAxis={[
          {
            scaleType: 'band',
            data: daysData,
            valueFormatter: (date) => {
              const day = date.getDate();
              const month = date.toLocaleString('en-US', { month: 'short' });
              return `${day}${getOrdinalSuffix(day)} ${month}`;
            },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => {
              return metricType === 'waterIntake' ? `${value} ml` : `${value.toLocaleString()} ${metricType}`;
            },
          },
        ]}
        series={[
          {
            data: metricData,
            valueFormatter: (value) => {
              return metricType === 'waterIntake' ? `${value} ml` : `${value.toLocaleString()} ${metricType}`;
            },
            connectNulls: true,
          },
        ]}
        height={300}
        margin={{ left: 0, right: 0, top: 30, bottom: 30 }}
      />
    </div>
  );
}
