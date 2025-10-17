import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StepsOverview = () => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Steps',
                data: [3000, 4000, 3500, 4500, 5000, 2500, 6000],
                backgroundColor: '#00bcd4',
                borderColor: '#00a1b5',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', 
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='bar-chart' style={{ width: '100%', height: '400px', }}>
            <h2>Weekly Steps Overview</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default StepsOverview;