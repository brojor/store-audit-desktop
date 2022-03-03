const { DateTime, Interval, Duration } = require('luxon');

const isFirstSemester = (month) => month >= 3 && month < 9;

exports.getDateRange = () => {
  const { year, month } = DateTime.local({ zone: 'Europe/Belgrade' });
  const startMonth = isFirstSemester(month) ? 3 : 9;
  const startYear = month < 3 ? year - 1 : year;

  const dateInterval = Interval.after(
    DateTime.local(startYear, startMonth, { zone: 'Europe/Belgrade' }),
    Duration.fromObject({ quarters: 2 }),
  );

  return dateInterval;
};
