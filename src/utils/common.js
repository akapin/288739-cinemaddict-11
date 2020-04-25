import moment from "moment";

export const DateTimeFormat = {
  YEAR: `YYYY`,
  DATE: `D MMMM YYYY`,
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomFloatNumber = (min, max) => {
  return (min + Math.random() * (max - min)).toFixed(1);
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const formatDateTime = (date, format) => {
  return moment(date).format(format);
};

export const formatDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const hours = duration.hours();
  const mins = duration.minutes();
  return `${hours > 0 ? `${hours}h` : ``} ${mins}m`;
};

export const timeFromNow = (date) => {
  return moment(date).fromNow();
};
