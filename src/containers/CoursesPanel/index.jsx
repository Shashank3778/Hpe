import React, { useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import CourseCard from 'containers/CourseCard';
import DoughnutChart from './components/DoughnutChart';
import BarChart from './components/BarChart';
import { initLucideIcons } from 'utils/iconUtils';

import { useCourseListData } from './hooks';
import messages from './messages';

import './index.scss';
import './MyDashboard.scss';

/**
 * Renders the list of CourseCards with custom dashboard design
 */
export const CoursesPanel = () => {
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState('enrolled');
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();
  
  // Get all course IDs
  const allCourseIds = courseListData.visibleList || [];
  
  // TODO: Implement proper filtering based on course status
  // For now, showing all courses in enrolled tab
  const enrolledCourses = allCourseIds;
  const completedCourses = [];
  const cancelledCourses = [];
  
  // Calculate stats for charts
  const stats = {
    enrolled: enrolledCourses.length,
    completed: completedCourses.length,
    expired: 0,
    cancelled: cancelledCourses.length,
  };
  
  const tabs = [
    { id: 'enrolled', label: formatMessage(messages.enrolledTab), count: enrolledCourses.length },
    { id: 'completed', label: formatMessage(messages.completedTab), count: completedCourses.length },
    { id: 'cancelled', label: formatMessage(messages.cancelledTab), count: cancelledCourses.length },
  ];
  
  const getCurrentCourses = () => {
    switch (activeTab) {
      case 'enrolled':
        return enrolledCourses;
      case 'completed':
        return completedCourses;
      case 'cancelled':
        return cancelledCourses;
      default:
        return [];
    }
  };
  
  useEffect(() => {
    initLucideIcons();
  }, [activeTab]);

  return (
    <div className="my-dashboard-container">
      {/* Statistics and Charts Section */}
      {hasCourses && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">{formatMessage(messages.courseStatistics)}</h2>
          </div>
          <div className="charts-grid">
            <div className="chart-card">
              <h3 className="chart-title">{formatMessage(messages.courseDistribution)}</h3>
              <div className="chart-wrapper" style={{ height: '300px' }}>
                <DoughnutChart stats={stats} />
              </div>
            </div>
            <div className="chart-card">
              <h3 className="chart-title">{formatMessage(messages.completionProgress)}</h3>
              <div className="chart-wrapper" style={{ height: '300px' }}>
                <BarChart />
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Courses Tab Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{formatMessage(messages.myCourses)}</h2>
        </div>
        
        {hasCourses ? (
          <>
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
              {getCurrentCourses().length === 0 ? (
                <div className="empty-state">
                  <i data-lucide="inbox"></i>
                  <p>{formatMessage(messages.noCoursesInCategory)}</p>
                </div>
              ) : (
                <div className="enrolled-courses-grid">
                  {getCurrentCourses().map(cardId => (
                    <CourseCard key={cardId} cardId={cardId} />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <i data-lucide="inbox"></i>
            <p>{formatMessage(messages.noCoursesEnrolled)}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesPanel;
