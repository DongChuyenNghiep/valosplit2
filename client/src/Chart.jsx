import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const maxValues = {
  KDA: 2.8,
  HS: 40,
  ADR: 320,
  ACS: 400,
  KAST: 100,
  KPM:30,
};

const normalizeData = (value, category) => {
  return (value / maxValues[category]) * 100;
};

const RadarChart = ({ data }) => {


  const chartData = {
    labels: ['KDA',"KPM", 'HS', 'ADR', 'ACS', 'KAST'],
    datasets: [
      {
        label: 'Me',
        data: [
          normalizeData(data.KDA, 'KDA'),
          normalizeData(data.KPM, 'KPM'),
          normalizeData(data.averageHS, 'HS'),
          normalizeData(data.averageADR, 'ADR'),
          normalizeData(data.averageACS, 'ACS'),
          normalizeData(data.averageKAST, 'KAST')
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        originalData: [
          data.KDA,
          data.KPM,
          data.averageHS,
          data.averageADR,
          data.averageACS,
          data.averageKAST
        ],
      },
      {
        label: 'Average',
        data: [
          normalizeData(data.KDAAll, 'KDA'),
          normalizeData(data.KPMAll, 'KPM'),
          normalizeData(data.averageHSAll, 'HS'),
          normalizeData(data.averageADRAll, 'ADR'),
          normalizeData(data.averageACSAll, 'ACS'),
          normalizeData(data.averageKASTAll, 'KAST')
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        originalData: [
          data.KDAAll,
          data.KPMAll,
          data.averageHSAll,
          data.averageADRAll,
          data.averageACSAll,
          data.averageKASTAll
        ],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgb(158, 158, 158)' // Border color for angle lines
        },
        grid: {
          color: 'rgb(158, 158, 158)' // Grid lines color
        },
        pointLabels: {
          color: 'white' // Labels color
        },
        min: 0, // Minimum value for the scale
        max: 100, // Maximum value for the scale
        ticks: {
          display: false, // Hide the ticks
          beginAtZero: true,
          stepSize: 100, // Control the number of grid lines
          color: 'white', // Color for the ticks
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white' // Color for the legend labels
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const datasetIndex = context.datasetIndex;
            const index = context.dataIndex;
            const originalValue = context.dataset.originalData[index];
            return `${context.dataset.label}: ${originalValue}`;
          }
        }
      }
    },
    maintainAspectRatio: false // Ensure the chart maintains its aspect ratio
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
