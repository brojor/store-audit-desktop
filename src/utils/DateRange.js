const isFirstSemester = (date) => {
  const month = date.getUTCMonth();
  return month <= 7 && month >= 2;
};

exports.getDateRange = () => {
  const now = new Date();
  const currentMonth = now.getUTCMonth();

  const startMonth = isFirstSemester(now) ? 2 : 8;
  const endMonth = isFirstSemester(now) ? 8 : 2;

  const startYear = currentMonth < 2 ? now.getFullYear() - 1 : now.getFullYear();
  const endYear = currentMonth < 8 ? now.getFullYear() : now.getFullYear() + 1;

  return {
    start: new Date(Date.UTC(startYear, startMonth, 1)),
    stop: new Date(Date.UTC(endYear, endMonth, 1) - 1),
  };
};
