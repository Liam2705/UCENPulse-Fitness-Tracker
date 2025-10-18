import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 5, label: 'Running' },
  { value: 10, label: 'Swimming' },
  { value: 15, label: 'Cycling' },
  { value: 20, label: 'Gym' },
];

const size = {
  width: 200,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));



export default function DoughnutChart() {
  return (
    <div className="doughnut-chart">
        <h2>Test Label</h2>
        <PieChart 
            series={[{ data, innerRadius: 40 }]} 
            width={400}
            height={300}>
        </PieChart>
    </div>
  );
}