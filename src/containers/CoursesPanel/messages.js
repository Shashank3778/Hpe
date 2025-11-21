import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  myCourses: {
    id: 'learner-dash.coursesPanel.myCourses',
    description: 'My Courses section title',
    defaultMessage: 'My Courses',
  },
  // ADD THESE NEW MESSAGES:
  courseStatistics: {
    id: 'learner-dash.coursesPanel.courseStatistics',
    description: 'Course Statistics section title',
    defaultMessage: 'Course Statistics',
  },
  courseDistribution: {
    id: 'learner-dash.coursesPanel.courseDistribution',
    description: 'Course Distribution chart title',
    defaultMessage: 'Course Distribution',
  },
  completionProgress: {
    id: 'learner-dash.coursesPanel.completionProgress',
    description: 'Completion Progress chart title',
    defaultMessage: 'Completion Progress',
  },
  enrolledTab: {
    id: 'learner-dash.coursesPanel.enrolledTab',
    description: 'Enrolled tab label',
    defaultMessage: 'Enrolled',
  },
  completedTab: {
    id: 'learner-dash.coursesPanel.completedTab',
    description: 'Completed tab label',
    defaultMessage: 'Completed',
  },
  cancelledTab: {
    id: 'learner-dash.coursesPanel.cancelledTab',
    description: 'Cancelled tab label',
    defaultMessage: 'Cancelled',
  },
  noCoursesInCategory: {
    id: 'learner-dash.coursesPanel.noCoursesInCategory',
    description: 'Empty state message for tab',
    defaultMessage: 'No courses in this category yet.',
  },
  noCoursesEnrolled: {
    id: 'learner-dash.coursesPanel.noCoursesEnrolled',
    description: 'Empty state message when no courses',
    defaultMessage: 'No courses enrolled yet.',
  },
});

export default messages;
