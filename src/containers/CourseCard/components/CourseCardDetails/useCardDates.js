import { reduxHooks } from 'hooks';

export const useCardDates = ({ cardId }) => {
  const courseRun = reduxHooks.useCardCourseRunData(cardId);
  
  /**
   * Format date to DD/MM/YYYY format
   * @param {string} dateString - ISO date string
   * @returns {string|null} Formatted date or null
   */
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    // Validate date
    if (isNaN(date.getTime())) return null;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  const startDate = courseRun.startDate 
    ? formatDateToDDMMYYYY(courseRun.startDate) 
    : null;
    
  const endDate = courseRun.endDate 
    ? formatDateToDDMMYYYY(courseRun.endDate) 
    : null;
  
  return {
    startDate,
    endDate,
  };
};

export default useCardDates;
