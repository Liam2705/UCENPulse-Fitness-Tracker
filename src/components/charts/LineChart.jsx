import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const getPastSevenDays = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
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

// Temporary data for steps (in thousands)
const temporaryStepsData = [5, 7, 6, 9, 8, 12, 10]; // e.g., 5 means 5000 steps

const daysData = getPastSevenDays();

export default function WeeklyStepsLineChart() {
  return (
    <div className="line-chart">
      <h2>Weekly Steps Overview</h2>
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
            valueFormatter: (value) => `${(value * 1000).toLocaleString()}`, // Format as 10,000
          },
        ]}
        series={[
          {
            data: temporaryStepsData,
            valueFormatter: (value) => `${(value * 1000).toLocaleString()}`, // Format tooltip values as 2,000
            connectNulls: true,
          },
        ]}
        height={300}
        margin={{ left: 0, right: 0, top: 30, bottom: 30 }}
      />
    </div>
  );
}