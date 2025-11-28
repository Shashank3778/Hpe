import { reduxHooks, utilHooks } from 'hooks';

export const useCardDates = ({ cardId }) => {
  const courseRun = reduxHooks.useCardCourseRunData(cardId);
  const formatDate = utilHooks.useFormatDate();
  
  // ✅ Debug logs
  console.log('📅 Course Run Data:', {
    cardId,
    startDate: courseRun.startDate,
    endDate: courseRun.endDate,
    advertisedStart: courseRun.advertisedStart,
    isStarted: courseRun.isStarted,
    isArchived: courseRun.isArchived
  });
  
  const startDate = courseRun.startDate ? formatDate(courseRun.startDate) : null;
  const endDate = courseRun.endDate ? formatDate(courseRun.endDate) : null;
  
  console.log('📅 Formatted Dates:', { startDate, endDate });
  
  return {
    startDate,
    endDate,
  };
};

export default useCardDates;