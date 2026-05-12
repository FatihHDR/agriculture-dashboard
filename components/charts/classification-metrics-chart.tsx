import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';
import {classificationResults} from '../../lib/nlp-data';

const perClass = classificationResults.tfidf.perClass;
const labels = perClass.map((c) => c.label);

const state: Props['series'] = [
   {
      name: 'Precision',
      data: perClass.map((c) => Math.round(c.precision * 100)),
   },
   {
      name: 'Recall',
      data: perClass.map((c) => Math.round(c.recall * 100)),
   },
   {
      name: 'F1-Score',
      data: perClass.map((c) => Math.round(c.f1 * 100)),
   },
];

const options: Props['options'] = {
   chart: {
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      toolbar: {
         show: false,
      },
   },
   colors: ['#6366f1', '#10b981', '#f59e0b'],
   plotOptions: {
      bar: {
         horizontal: false,
         borderRadius: 4,
         columnWidth: '65%',
         grouped: true,
      },
   },
   xaxis: {
      categories: labels,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
         },
         rotate: -15,
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      min: 60,
      max: 100,
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
         },
         formatter: (val: number) => `${val}%`,
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
   },
   dataLabels: {
      enabled: false,
   },
};

export const ClassificationMetricsChart = () => {
   return (
      <Box css={{width: '100%', zIndex: 5}}>
         <div id="classification-chart">
            <Chart
               options={options}
               series={state}
               type="bar"
               height={360}
            />
         </div>
      </Box>
   );
};
