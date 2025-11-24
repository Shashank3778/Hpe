import React, { useState, useEffect } from 'react';
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

  // Debug: Log course data to see structure
  useEffect(() => {
    console.log('Course List Data:', courseListData);
    console.log('Courses:', courseListData?.courses);
  }, [courseListData]);

  // Filter courses based on their courseStatus or certificate availability
  const getFilteredCourses = () => {
    const courses = courseListData?.courses || [];
    
    switch (activeTab) {
      case 'completed':
        // Check for completed courses (usually have certificate or courseStatus)
        return courses.filter(course => 
          course.courseStatus === 'completed' || 
          course.hasEnded === true ||
          course.certificate?.isAvailable === true ||
          course.isCompleted === true
        );
      
      case 'cancelled':
        // Check for cancelled/archived courses
        return courses.filter(course => 
          course.courseStatus === 'archived' ||
          course.isArchived === true ||
          course.cancelled === true
        );
      
      case 'enrolled':
      default:
        // Show active enrolled courses (not completed, not cancelled)
        return courses.filter(course => 
          course.courseStatus === 'active' ||
          (!course.hasEnded && !course.isArchived && !course.cancelled) ||
          course.courseStatus === 'in_progress' ||
          course.courseStatus === undefined // Default to enrolled if no status
        );
    }
  };

  const filteredCourses = getFilteredCourses();

  // Calculate counts for each tab
  const getCounts = () => {
    const courses = courseListData?.courses || [];
    return {
      enrolled: courses.filter(course => 
        course.courseStatus === 'active' ||
        (!course.hasEnded && !course.isArchived && !course.cancelled) ||
        course.courseStatus === 'in_progress' ||
        course.courseStatus === undefined
      ).length,
      completed: courses.filter(course => 
        course.courseStatus === 'completed' || 
        course.hasEnded === true ||
        course.certificate?.isAvailable === true ||
        course.isCompleted === true
      ).length,
      cancelled: courses.filter(course => 
        course.courseStatus === 'archived' ||
        course.isArchived === true ||
        course.cancelled === true
      ).length,
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
        {filteredCourses?.length === 0 ? (
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
