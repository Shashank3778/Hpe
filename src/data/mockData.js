/**
 * Mock data for development and testing
 * This file provides sample data structure for charts and courses
 * Replace with real API data in production
 */

export const mockCourseData = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    progress: 75,
    enrolled: '2024-01-15',
    status: 'enrolled',
    thumbnail: 'https://via.placeholder.com/300x180/5f6aff/ffffff?text=CS101',
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms',
    instructor: 'Prof. Michael Chen',
    progress: 45,
    enrolled: '2024-02-01',
    status: 'enrolled',
    thumbnail: 'https://via.placeholder.com/300x180/22c55e/ffffff?text=DSA201',
  },
  {
    id: 3,
    title: 'Web Development Fundamentals',
    instructor: 'Emma Rodriguez',
    progress: 100,
    enrolled: '2023-11-10',
    status: 'completed',
    thumbnail: 'https://via.placeholder.com/300x180/f59e0b/ffffff?text=WEB101',
  },
];

export const mockStatistics = {
  totalCourses: 3,
  activeCourses: 2,
  completedCourses: 1,
  cancelledCourses: 0,
};

export const mockChartData = {
  doughnut: {
    labels: ['Active Courses', 'Completed', 'Cancelled'],
    datasets: [{
      data: [2, 1, 0],
      backgroundColor: [
        'rgba(95, 106, 255, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgba(95, 106, 255, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
    }],
  },
  bar: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Completion %',
      data: [20, 45, 60, 75],
      backgroundColor: 'rgba(95, 106, 255, 0.8)',
      borderColor: 'rgba(95, 106, 255, 1)',
      borderWidth: 2,
    }],
  },
};

export default {
  mockCourseData,
  mockStatistics,
  mockChartData,
};
