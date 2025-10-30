import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];


const getOrdinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
};

// Helper function to get the last 7 days as Date objects
const getPastSevenDays = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date);
    }
    return dates;
};

const daysData = getPastSevenDays();


export default function AreaChart() {
    return (
        <div className="area-chart">
            <h2>Calories Burned Overview</h2>
            <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                    series={[{ data: uData, label: 'Calories Burned', area: true, showMark: false, connectNulls: true }]}
                    xAxis={[{
                        scaleType: 'band', // Use 'band' for categorical data like days
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

                />
            </Box>
        </div>
    );
}