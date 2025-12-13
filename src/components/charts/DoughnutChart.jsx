import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

// Helper function to get dates for a given number of days based on the numDays prop
const getPastDays = (numDays) => {
  const dates = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

export default function DoughnutChart({ numDays = 7 }) {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    const pastDays = getPastDays(numDays);
    // Filter activities to include only those within the past numDays
    const filteredActivities = activities.filter(activity => 
      pastDays.includes(activity.date)
    );
    // Count occurrences of each activity type
    const activityCount = filteredActivities.reduce((acc, activity) => {
      acc[activity.activityType] = (acc[activity.activityType] || 0) + 1; 
      return acc;
    }, {});
    // Convert the activityCount object into an array suitable for the PieChart
    const doughnutData = Object.entries(activityCount).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));

    setActivityData(doughnutData);
  }, [numDays]);

  return (
    <div className="doughnut-chart">
      <h2>Activity Breakdown Distribution</h2>
      <PieChart 
          series={[{ data: activityData.length > 0 ? activityData : [{ id: 0, value: 1, label: 'No Activities' }], innerRadius: 40 }]} 
          width={400}
          height={300}
          aria-label={'Activity-Breakdown-Doughnut-Chart-Distribution'}
      />
    </div>
  );
}
