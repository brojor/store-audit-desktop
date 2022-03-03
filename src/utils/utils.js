export const countAvarage = (values) => values.reduce((a, b) => a + b, 0) / values.length;

export const formatDate = (date) => {
  const [, month, year] = new Date(date).toLocaleDateString().split('. ');
  return `${month.padStart(2, '0')}/${year}`;
};
