import React, { useState, useMemo } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';

import { reduxHooks } from 'hooks';
import CourseListSlot from 'plugin-slots/CourseListSlot';
import NoCoursesViewSlot from 'plugin-slots/NoCoursesViewSlot';

import { useCourseListData } from './hooks';
import messages from './messages';

import './index.scss';

export const CoursesPanel = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();
  
  // Access all course data from Redux store
  const allCourseData = useSelector(state => state.app.courseData);

  const [activeTab, setActiveTab] = useState('enrolled');

  // Categorize ALL courses (not just visibleList)
  const categorizedCourses = useMemo(() => {
    const enrolled = [];
    const completed = [];
    const cancelled = [];

    if (!allCourseData) {
      return { enrolled, completed, cancelled };
    }

    // Get all cardIds from allCourseData instead of visibleList
    const allCardIds = Object.keys(allCourseData);

    allCardIds.forEach((cardId) => {
      const course = allCourseData[cardId];

      if (!course) {
        return;
      }

      // Extract properties from the correct nested objects
      const courseRun = course.courseRun || {};
      const certificate = course.certificate || {};
      
      const isArchived = courseRun.isArchived === true;
      const isStarted = courseRun.isStarted === true;
      const isEarned = certificate.isEarned === true;
      const isDownloadable = certificate.isDownloadable === true;

      // Create the item object with cardId
      const item = { cardId };

      // Categorization logic with priority: Cancelled > Completed > Enrolled
      if (isArchived) {
        cancelled.push(item);
      } else if (isEarned || isDownloadable) {
        completed.push(item);
      } else if (isStarted) {
        enrolled.push(item);
      } else {
        enrolled.push(item);
      }
    });

    return { enrolled, completed, cancelled };
  }, [allCourseData]);

  // Create filtered courseListData for the active tab
  const filteredCourseListData = useMemo(() => {
    return {
      ...courseListData,
      visibleList: categorizedCourses[activeTab],
      numPages: 1,
      showFilters: false,
    };
  }, [courseListData, categorizedCourses, activeTab]);

  // Tab configuration with dynamic counts
  const tabs = [
    { id: 'enrolled', label: 'Enrolled', count: categorizedCourses.enrolled.length },
    { id: 'completed', label: 'Completed', count: categorizedCourses.completed.length },
    { id: 'cancelled', label: 'Cancelled', count: categorizedCourses.cancelled.length },
  ];

  const hasCoursesInTab = categorizedCourses[activeTab].length > 0;

  // If user has no courses at all, show NoCoursesViewSlot
  if (!hasCourses) {
    return (
      <div className="course-list-container custom-dashboard-container">
        <NoCoursesViewSlot />
      </div>
    );
  }

  return (
    <div className="course-list-container custom-dashboard-container">
      {/* Tabs Navigation */}
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
        {hasCoursesInTab ? (
          <div className="cards-grid">
            <CourseListSlot courseListData={filteredCourseListData} />
          </div>
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
