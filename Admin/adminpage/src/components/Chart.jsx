import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 1200,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    Calicut: 59,
    paris: 57,
    USA: 86,
    China: 21,
    month: 'Jan',
  },
  {
    Calicut: 50,
    paris: 52,
    USA: 78,
    China: 28,
    month: 'Fev',
  },
  {
    Calicut: 47,
    paris: 53,
    USA: 106,
    China: 41,
    month: 'Mar',
  },
  {
    Calicut: 54,
    Jaipur: 56,
    USA: 92,
    China: 73,
    month: 'Apr',
  },
  {
    Calicut: 57,
    Jaipur: 69,
    USA: 92,
    China: 99,
    month: 'May',
  },
  {
    london: 60,
    Jaipur: 63,
    USA: 103,
    China: 144,
    month: 'June',
  },
  {
    Calicut: 59,
    Jaipur: 60,
    USA: 105,
    China: 319,
    month: 'July',
  },
  {
    Calicut: 65,
    Jaipur: 60,
    USA: 106,
    China: 249,
    month: 'Aug',
  },
  {
    Calicut: 51,
    Jaipur: 51,
    USA: 95,
    China: 131,
    month: 'Sept',
  },
  {
    Calicut: 60,
    Jaipur: 65,
    USA: 97,
    China: 55,
    month: 'Oct',
  },
  {
    Calicut: 67,
    Jaipur: 64,
    USA: 76,
    China: 48,
    month: 'Nov',
  },
  {
    Calicut: 61,
    Jaipur: 70,
    USA: 103,
    China: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

export default function Chart() {
    return (
      <><div>  <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Calicut', label: 'Calicut', valueFormatter },
        { dataKey: 'Jaipur', label: 'Jaipur', valueFormatter },
        { dataKey: 'USA', label: ' USA', valueFormatter },
        { dataKey: 'China', label: 'China', valueFormatter },
      ]}
      {...chartSetting}
    /></div>
    <div style={{display:"flex",}}>
    <PieChart 
      series= {[ 
        {
          data: [
            { id: 0, value: 10, label: 'Users' },
            { id: 1, value: 25, label: 'Hotels' },
            { id: 2, value: 20, label: 'Rooms' },
          ],
        },
      ]}
      width={500}
      height={250}
    />
    </div>
    
    </>
  );
}