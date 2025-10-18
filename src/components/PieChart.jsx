import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <div className="pie-chart">
      <h2 style={{}}>Activity Breakdown</h2>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'Running' },
              { id: 1, value: 15, label: 'Swimming' },
              { id: 2, value: 20, label: 'Cycling' },
              
            ],
          },
        ]}
        width={400}
        height={300}
      />
    </div>
  );
}