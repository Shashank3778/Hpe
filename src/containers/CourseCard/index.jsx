import React from 'react';
import PropTypes from 'prop-types';

import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';

import './CourseCard.scss';

export const CourseCard = ({ cardId }) => {
  return (
    <div className="custom-course-card" id={cardId} data-testid="CourseCard">
      <div className="custom-card-wrapper">
        {/* Course Image - 200px height */}
        <div className="custom-card-image">
          <CourseCardImage cardId={cardId} orientation="vertical" />
        </div>
        
        {/* Course Content */}
        <div className="custom-card-content">
          {/* Course Label */}
          <span className="course-label">COURSE</span>
          
          {/* Title with Menu */}
          <div className="custom-card-header">
            <CourseCardTitle cardId={cardId} />
            <CourseCardMenu cardId={cardId} />
          </div>
          
          {/* Course Details (progress, dates, etc.) */}
          <div className="custom-card-details">
            <CourseCardDetails cardId={cardId} />
          </div>
          
          {/* Action Buttons */}
          <div className="custom-card-actions">
            <CourseCardActions cardId={cardId} />
          </div>
        </div>
        
        {/* Banners */}
        <CourseCardBanners cardId={cardId} />
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
