import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CourseCardImage from './components/CourseCardImage';
import CourseCardTitle from './components/CourseCardTitle';
import CourseCardDetails from './components/CourseCardDetails';
import useCardDates from './components/CourseCardDetails/useCardDates';
import { initLucideIcons } from '../../utils/iconUtils';

import './CourseCard.css';

export const CourseCard = ({ cardId }) => {
  const { startDate, endDate } = useCardDates({ cardId });

  useEffect(() => {
    initLucideIcons();
  }, []);

  return (
    <div className="course-card">
      
      {/* ----------- IMAGE ----------- */}
      <div className="course-card-image">
        <CourseCardImage cardId={cardId} orientation="vertical" />
      </div>

      {/* ----------- CONTENT ----------- */}
      <div className="course-card-content">
        <span className="course-label">COURSE</span>

        <h3 className="course-title">
          <CourseCardTitle cardId={cardId} />
        </h3>

        <div className="course-description">
          <CourseCardDetails cardId={cardId} />
        </div>
      </div>

      {/* ----------- DATES ----------- */}
      {(startDate || endDate) && (
        <div className="course-dates">
          {startDate && (
            <div className="date-item">
              <i data-lucide="calendar"></i>
              <span>{startDate}</span>
            </div>
          )}

          {endDate && (
            <div className="date-item">
              <i data-lucide="calendar-check"></i>
              <span>{endDate}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
