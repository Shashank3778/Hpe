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

  // 🔍 DEBUG: Log the FULL course structure
  useEffect(() => {
    if (courseListData?.courses && courseListData.courses.length > 0) {
      console.log('=== FULL COURSE DATA ===');
      console.log('Total courses:', courseListData.courses.length);
      
      courseListData.courses.forEach((course, index) => {
        console.log(`\n--- Course ${index + 1} ---`);
        console.log('Full course object:', course);
        console.log('All keys:', Object.keys(course));
        
        // Log specific properties we might use for filtering
        console.log('Title:', course.title);
        console.log('Course Run Status:', course.courseRunStatus);
        console.log('Has Ended:', course.hasEnded);
        console.log('Is Archived:', course.isArchived);
        console.log('Certificate:', course.certificate);
        console.log('Progress:', course.progress);
        console.log('Completed:', course.completed);
        console.log('Is Completed:', course.isCompleted);
        console.log('End Date:', course.endDate);
        console.log('Course Status:', course.courseStatus);
      });
    }
  }, [courseListData]);

  // For now, show all courses in Enrolled tab
  const getFilteredCourses = () => {
    if (activeTab === 'enrolled') {
      return courseListData?.courses || [];
    } else {
      return [];
    }
  };

  const filteredCourses = getFilteredCourses();

  const getCounts = () => {
    const totalCourses = courseListData?.courses?.length || 0;
    return {
      enrolled: totalCourses,
      completed: 0,
      cancelled: 0
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
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>

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

      <div className="tab-content">
        {!hasCourses ? (
          <NoCoursesViewSlot />
        ) : filteredCourses.length === 0 ? (
          <div className="empty-state">
            <p>No courses in this category yet.</p>
          </div>
        ) : (
          <CourseListSlot courseListData={{ ...courseListData, courses: filteredCourses }} />
        )}
      </div>
    </div>
  );
};

export default CoursesPanel;
