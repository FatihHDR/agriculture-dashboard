import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';
import {categoryDistribution} from '../../lib/nlp-data';

const categories = categoryDistribution.map((c) => c.name);
const originalData = categoryDistribution.map((c) => c.original);
const augmentedData = categoryDistribution.map((c) => c.augmented - c.original);

const state: Props['series'] = [
   {
      name: 'Dokumen Asli',
      data: originalData,
   },
   {
      name: 'Hasil Augmentasi',
      data: augmentedData,
   },
];

const options: Props['options'] = {
   chart: {
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      stacked: true,
      toolbar: {
         show: false,
      },
   },
   colors: ['#6366f1', '#10b981'],
   plotOptions: {
      bar: {
         horizontal: false,
         borderRadius: 6,
         columnWidth: '50%',
      },
   },
   xaxis: {
      categories,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
         },
         rotate: -20,
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
            fontFamily: 'Inter, sans-serif',
         },
      },
      title: {
         text: 'Jumlah Dokumen',
         style: {
            color: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
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
         formatter: (val: number) => `${val} dokumen`,
      },
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 3,
      position: 'back',
   },
   fill: {
      opacity: 1,
   },
   dataLabels: {
      enabled: false,
   },
};

export const CategoryDistributionChart = () => {
   return (
      <>
         <Box
            css={{
               width: '100%',
               zIndex: 5,
            }}
         >
            <div id="category-chart">
               <Chart
                  options={options}
                  series={state}
                  type="bar"
                  height={380}
               />
            </div>
         </Box>
      </>
   );
};
