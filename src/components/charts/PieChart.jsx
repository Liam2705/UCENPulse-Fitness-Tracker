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

export default function BasicPie({ numDays = 7 }) {
  const [activityData, setActivityData] = useState([]);

  
  useEffect(() => {
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    const pastDays = getPastDays(numDays);
    // Filter activities to include only those within the past specified by numDays prop
    const filteredActivities = activities.filter(activity => 
      pastDays.includes(activity.date)
    );

    // Filter out activities with zero duration
    const activityCount = filteredActivities.reduce((acc, activity) => {
      acc[activity.activityType] = (acc[activity.activityType] || 0) + activity.duration;
      return acc;
    }, {});

    // Convert the activityCount object into an array suitable for the PieChart component
    const pieChartData = Object.entries(activityCount).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));
    
    setActivityData(pieChartData);
  }, [numDays]);

  return (
    <div className="pie-chart">
      <h2>Activity Breakdown Duration (mins)</h2>
      <PieChart
        series={[
          {
            // Provide default data if no activities are found
            data: activityData.length > 0 ? activityData : [{ id: 0, value: 1, label: 'No Activities' }]
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
}
