import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

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

    const filteredActivities = activities.filter(activity => 
      pastDays.includes(activity.date)
    );

    const activityCount = filteredActivities.reduce((acc, activity) => {
      acc[activity.activityType] = (acc[activity.activityType] || 0) + activity.duration;
      return acc;
    }, {});

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
            data: activityData.length > 0 ? activityData : [{ id: 0, value: 1, label: 'No Activities' }]
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
}
