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

export default function BasicPie({ numDays = 7, activities = [] }) {
  const pastDays = getPastDays(numDays);

  const filteredActivities = activities.filter(activity =>
    pastDays.includes(activity.date?.split('T')[0])
  );

  const activityCount = filteredActivities.reduce((acc, activity) => {
    const key = activity.type
    acc[key] = (acc[key] || 0) + activity.duration;
    return acc;
  }, {});

  const activityData = Object.entries(activityCount).map(([label, value], index) => ({
    id: index,
    value,
    label,
  }));

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
        aria-label={'Activity-Breakdown-Pie-Chart-Duration-mins'}
      />
    </div>
  );
}
