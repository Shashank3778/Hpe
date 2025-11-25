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
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();

  const [activeTab, setActiveTab] = useState('enrolled');

  // Calculate counts
  const totalCourses = courseListData?.courses?.length || 0;
  
  const tabs = [
    { id: 'enrolled', label: 'Enrolled', count: totalCourses },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 },
  ];

  return (
    <div className="course-list-container custom-dashboard-container">
      
      {/* Header with Title and Filters */}
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>

      {/* Tabs */}
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

      {/* Course List Content */}
      <div className="tab-content">
        {activeTab === 'enrolled' ? (
          hasCourses ? (
            <div className="cards-grid">
              <CourseListSlot courseListData={courseListData} />
            </div>
          ) : (
            <NoCoursesViewSlot />
          )
        ) : (
          <div className="empty-state">
            <p>No courses in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;
