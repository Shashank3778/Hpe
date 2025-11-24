import React, { useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import CourseListSlot from 'plugin-slots/CourseListSlot';
import NoCoursesViewSlot from 'plugin-slots/NoCoursesViewSlot';
import { CourseFilterControls } from 'containers/CourseFilterControls';

import { useCourseListData } from './hooks';
import messages from './messages';

import './index.scss';

export const CoursesPanel = () => {
  const { formatMessage } = useIntl();

  const courseListData = useCourseListData();
  const hasCourses = reduxHooks.useHasCourses();

  const [activeTab, setActiveTab] = useState('enrolled');

  // Get filtered courses based on active tab
  const getFilteredCourses = () => {
    const courses = courseListData?.courses || [];
    
    switch (activeTab) {
      case 'completed':
        // Filter completed courses (have certificate or 100% progress)
        return courses.filter(course => 
          course.certificate?.isAvailable === true ||
          course.certificate?.isEarned === true ||
          course.courseRunStatus === 'completed' ||
          course.isCompleted === true ||
          (course.progress && course.progress >= 100)
        );
      
      case 'cancelled':
        // Filter cancelled/archived courses
        return courses.filter(course => 
          course.isArchived === true ||
          course.courseRunStatus === 'archived' ||
          course.cancelled === true
        );
      
      case 'enrolled':
      default:
        // For enrolled tab: Show all courses that are NOT completed or cancelled
        // If a course has no status markers, it defaults to enrolled
        return courses.filter(course => {
          const isCompleted = course.certificate?.isAvailable === true ||
                            course.certificate?.isEarned === true ||
                            course.courseRunStatus === 'completed' ||
                            course.isCompleted === true ||
                            (course.progress && course.progress >= 100);
          
          const isCancelled = course.isArchived === true ||
                            course.courseRunStatus === 'archived' ||
                            course.cancelled === true;
          
          // Show course if it's NOT completed AND NOT cancelled
          // This means new courses with no status will show in enrolled
          return !isCompleted && !isCancelled;
        });
    }
  };

  const filteredCourses = getFilteredCourses();

  // Calculate course counts for each tab
  const getCounts = () => {
    const courses = courseListData?.courses || [];
    
    const completedCount = courses.filter(course => 
      course.certificate?.isAvailable === true ||
      course.certificate?.isEarned === true ||
      course.courseRunStatus === 'completed' ||
      course.isCompleted === true ||
      (course.progress && course.progress >= 100)
    ).length;

    const cancelledCount = courses.filter(course => 
      course.isArchived === true ||
      course.courseRunStatus === 'archived' ||
      course.cancelled === true
    ).length;

    const enrolledCount = courses.length - completedCount - cancelledCount;

    return {
      enrolled: enrolledCount,
      completed: completedCount,
      cancelled: cancelledCount
    };
  };

  const counts = getCounts();

  const tabs = [
    { id: 'enrolled', label: 'Enrolled', count: counts.enrolled },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return (
    <div className="course-list-container custom-dashboard-container">

      {/* Title + Filters Row */}
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>

        <div className="course-filter-controls-container">
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>

      {/* Custom Tabs with Counts */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Course List / No Courses Section */}
      <div className="tab-content">
        {!hasCourses ? (
          <NoCoursesViewSlot />
        ) : filteredCourses.length === 0 ? (
          <div className="empty-state">
            <p>No courses in this category yet.</p>
          </div>
        ) : (
          <div className="custom-course-grid">
            <CourseListSlot courseListData={{ ...courseListData, courses: filteredCourses }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPanel;