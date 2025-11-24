import React, { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import CourseListSlot from 'plugin-slots/CourseListSlot';
import NoCoursesViewSlot from 'plugin-slots/NoCoursesViewSlot';
import { CourseFilterControls } from 'containers/CourseFilterControls';

import { useCourseListData } from './hooks';
import messages from './messages';

import './index.scss';

/*
  Updated CoursesPanel:
  - Keeps original logic: filter controls, CourseListSlot, NoCoursesViewSlot
  - Adds your tabs layout for Enrolled / Completed / Cancelled
  - Never breaks backend logic
*/

export const CoursesPanel = () => {
  const { formatMessage } = useIntl();

  const courseListData = useCourseListData();
  const hasCourses = reduxHooks.useHasCourses();

  // Tabs: based on existing course statuses
  const [activeTab, setActiveTab] = useState('enrolled');

  const tabs = [
    { id: 'enrolled', label: 'Enrolled' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  // frontend filtering (non breaking)
  const filteredCourses = courseListData?.courses?.filter(course => {
    if (activeTab === 'completed') return course.completed === true;
    if (activeTab === 'cancelled') return course.cancelled === true;
    return true; // default enrolled
  });

  return (
    <div className="course-list-container custom-dashboard-container">

      {/* Title + Filters Row (kept same logic) */}
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>

        <div className="course-filter-controls-container">
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>

      {/* Your Custom Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course List / No Courses Section */}
      <div className="tab-content">
        {filteredCourses?.length === 0 ? (
          <NoCoursesViewSlot />
        ) : (
          <div className="custom-course-grid">
            {/* ★ Keep CourseListSlot → Do not break logic */}
            <CourseListSlot courseListData={{ ...courseListData, courses: filteredCourses }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPanel;
