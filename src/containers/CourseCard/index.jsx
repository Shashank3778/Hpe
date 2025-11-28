import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';
import useCardDates from './components/CourseCardDetails/useCardDates';
import { initLucideIcons } from '../../utils/iconUtils'; // ✅ Import your utility

import './CourseCard.scss';

export const CourseCard = ({ cardId }) => {
  const { startDate, endDate } = useCardDates({ cardId });

  useEffect(() => {
    initLucideIcons();
  }, [startDate, endDate]); 

  return (
    <div className="custom-course-card" id={cardId} data-testid="CourseCard">
      <div className="custom-card-wrapper">
        <div className="custom-card-image">
          <CourseCardImage cardId={cardId} orientation="vertical" />
        </div>
        <div className="custom-card-content">
          <span className="course-label">COURSE</span>
          <div className="custom-card-header">
            <CourseCardTitle cardId={cardId} />
          </div>
          <div className="custom-card-details">
            <CourseCardDetails cardId={cardId} />
          </div>
          {(startDate || endDate) && (
            <div className="course-dates-section">
              {startDate && (
                <div className="date-item">
                  <i data-lucide="calendar" className="date-icon"></i>
                  <span className="date-value">{startDate}</span>
                </div>
              )}
              {endDate && (
                <div className="date-item">
                  <i data-lucide="calendar-check" className="date-icon"></i>
                  <span className="date-value">{endDate}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
