import React from 'react';
import PropTypes from 'prop-types';

import { reduxHooks } from 'hooks';
import { hasEmoji } from 'utils/iconUtils';
import CourseCardActions from './components/CourseCardActions';
import CourseCardBanners from './components/CourseCardBanners';

import './CourseCard.scss';
import './EnrolledCourseCard.scss';

export const CourseCard = ({ cardId }) => {
  // Get OpenEdx data
  const { courseName, bannerImgSrc } = reduxHooks.useCardCourseData(cardId);
  const { isEnrolled, hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  
  // Calculate progress (placeholder - adjust based on actual data availability)
  const progress = hasStarted ? 50 : 0;
  
  const hasEmojiImage = hasEmoji(bannerImgSrc);

  return (
    <div className="mb-4.5 course-card enrolled-card" id={cardId} data-testid="CourseCard">
      {/* Course Image */}
      <div className={`enrolled-card-image ${hasEmojiImage ? 'has-emoji' : ''}`}>
        {hasEmojiImage ? (
          bannerImgSrc
        ) : bannerImgSrc ? (
          <img src={bannerImgSrc} alt={courseName} className="w-100" />
        ) : (
          <i data-lucide="book-open"></i>
        )}
      </div>
      
      {/* Course Content */}
      <div className="enrolled-card-content">
        <h3>
          <a href={homeUrl} className="course-card-title">
            {courseName}
          </a>
        </h3>
        
        {/* Progress Bar */}
        {isEnrolled && (
          <div className="progress-bar-container">
            <div className="progress-bar-header">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="course-card-actions">
          <CourseCardActions cardId={cardId} />
        </div>
      </div>
      
      {/* Banners (certificates, etc.) */}
      <CourseCardBanners cardId={cardId} />
    </div>
  );
};

CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
