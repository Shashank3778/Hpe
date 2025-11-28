import { reduxHooks, utilHooks } from 'hooks';

export const useCardDates = ({ cardId }) => {
  const courseRun = reduxHooks.useCardCourseRunData(cardId);
  const formatDate = utilHooks.useFormatDate();
  
  const startDate = courseRun.startDate ? formatDate(courseRun.startDate) : null;
  const endDate = courseRun.endDate ? formatDate(courseRun.endDate) : null;
  
  return {
    startDate,
    endDate,
  };
};

export default useCardDates;
