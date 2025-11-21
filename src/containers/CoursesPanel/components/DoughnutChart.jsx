import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import './DoughnutChart.scss';

/**
 * DoughnutChart component
 * Displays statistics in a doughnut chart format
 */
const DoughnutChart = ({ stats }) => {
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
      type: 'doughnut',
      data: {
        labels: ['Enrolled', 'Completed', 'Expired', 'Cancelled'],
        datasets: [
          {
            data: [
              stats.enrolled || 0,
              stats.completed || 0,
              stats.expired || 0,
              stats.cancelled || 0,
            ],
            backgroundColor: ['#b3b9ff', '#99f6e0', '#fed7aa', '#fca5a5'],
            borderWidth: 0,
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
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [stats]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

DoughnutChart.propTypes = {
  stats: PropTypes.shape({
    enrolled: PropTypes.number,
    completed: PropTypes.number,
    expired: PropTypes.number,
    cancelled: PropTypes.number,
  }).isRequired,
};

export default DoughnutChart;
