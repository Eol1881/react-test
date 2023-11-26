// export const getFirstDayOfMonth = () => {
//   const today = new Date();
//   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//   return firstDayOfMonth;
// };

// export const getFirstDayOfPrevMonth = () => {
//   const today = new Date();
//   const firstDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//   return firstDayOfPrevMonth;
// };

// export const getLastDayOfPrevMonth = () => {
//   const today = new Date();
//   const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//   return lastDayOfPrevMonth;
// };

class DateExtractor {
  constructor(private today = new Date()) {}

  getFirstDayOfMonth = () => {
    const firstDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    return firstDayOfMonth;
  };

  getLastDayOfPrevMonth = () => {
    const lastDayOfPrevMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
    return lastDayOfPrevMonth;
  };

  getFirstDayOfPrevMonth = () => {
    const firstDayOfPrevMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
    return firstDayOfPrevMonth;
  };

  getThisDay = () => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59);
    return endOfDay;
  };

  getTwoWeeksAgo = () => {
    const twoWeeksAgo = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 14);
    return twoWeeksAgo;
  };
}

export const dateExtractor = new DateExtractor();
