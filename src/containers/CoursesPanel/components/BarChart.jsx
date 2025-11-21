import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import './BarChart.scss';

/**
 * BarChart component
 * Displays progress data in a bar chart format
 */
const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Courses Completed',
            data: data.coursesCompleted || [2, 3, 1, 4, 3, 2],
            backgroundColor: '#b3b9ff',
          },
          {
            label: 'Learning Paths Completed',
            data: data.pathsCompleted || [0, 1, 0, 1, 0, 1],
            backgroundColor: '#99f6e0',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    coursesCompleted: PropTypes.arrayOf(PropTypes.number),
    pathsCompleted: PropTypes.arrayOf(PropTypes.number),
  }),
};

BarChart.defaultProps = {
  data: {
    coursesCompleted: [2, 3, 1, 4, 3, 2],
    pathsCompleted: [0, 1, 0, 1, 0, 1],
  },
};

export default BarChart;
