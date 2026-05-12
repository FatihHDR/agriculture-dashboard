import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';

const categories = ['60% / 40%', '70% / 30%', '80% / 20%', '90% / 10%'];

const state: Props['series'] = [
   {
      name: 'TF-IDF + SVM',
      data: [78.5, 81.2, 84.7, 85.1],
   },
   {
      name: 'FastText + SVM',
      data: [75.2, 79.1, 82.3, 83.5],
   },
   {
      name: 'TF-IDF + Naive Bayes',
      data: [76.8, 80.5, 84.7, 85.0],
   },
];

const options: Props['options'] = {
   chart: {
      type: 'line',
      fontFamily: 'Montserrat, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      toolbar: {
         show: false,
      },
      animations: {
         enabled: true,
         easing: 'easeinout',
         speed: 800,
      },
   },
   colors: ['#6366f1', '#10b981', '#f59e0b'],
   stroke: {
      curve: 'smooth',
      width: 3,
   },
   markers: {
      size: 5,
      colors: ['#6366f1', '#10b981', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
         size: 7,
      }
   },
   xaxis: {
      categories,
      title: {
         text: 'Train / Test Split',
         style: {
            color: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
         },
      },
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
         },
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
      axisTicks: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
         },
         formatter: (val: number) => `${val}%`,
      },
      title: {
         text: 'Akurasi',
         style: {
            color: 'var(--nextui-colors-accents8)',
            fontFamily: 'Montserrat, sans-serif',
         },
      },
   },
   legend: {
      position: 'top',
      labels: {
         colors: 'var(--nextui-colors-accents8)',
      },
   },
   tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
         formatter: (val: number) => `${val}%`,
      },
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 3,
      position: 'back',
   },
   dataLabels: {
      enabled: false,
   },
};

export const ModelAccuracyChart = () => {
   return (
      <Box
         css={{
            width: '100%',
            zIndex: 5,
         }}
      >
         <div id="accuracy-line-chart">
            <Chart
               options={options}
               series={state}
               type="line"
               height={380}
            />
         </div>
      </Box>
   );
};
