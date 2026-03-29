import { LineChart } from '@mui/x-charts/LineChart';

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

// Helper function to get ordinal suffix for a number (example: 1st, 2nd, 3rd, 4th)
const getOrdinalSuffix = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export default function CustomLineChart({ label, numDays, metricType, metrics = [] }) {
  const daysData = getPastDays(numDays);

  // Map each past day to a metric value from the DB data
  const metricData = daysData.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    const match = metrics.find(m => m.date?.split('T')[0] === dateStr);
    return match ? (match[metricType] ?? 0) : 0;
  });

  return (
    <div className="line-chart" role='region' >
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
            // Customize y-axis labels based on metric type
            valueFormatter: (value) => {
              return metricType === 'waterIntake' ? `${value} litres` : `${value.toLocaleString()} ${metricType}`;
            },
          },
        ]}
        series={[
          {
            data: metricData,
            valueFormatter: (value) => {
              return metricType === 'waterIntake' ? `${value} litres` : `${value.toLocaleString()} ${metricType}`;
            },
            connectNulls: true,
          },
        ]}
        height={300}
        margin={{ left: 0, right: 0, top: 30, bottom: 30 }}
        aria-label={`${label} Chart`}

      />
    </div>
  );
}
