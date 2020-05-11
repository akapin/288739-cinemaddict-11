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

const getDuration = (minutes) => {
  return moment.duration(minutes, `minutes`);
};

export const getDurationHours = (minutes) => {
  const duration = getDuration(minutes);
  return duration.hours();
};

export const getDurationMinutes = (minutes) => {
  const duration = getDuration(minutes);
  return duration.minutes();
};

export const formatDuration = (minutes) => {
  const hours = getDurationHours(minutes);
  const mins = getDurationMinutes(minutes);
  return `${hours > 0 ? `${hours}h` : ``} ${mins}m`;
};

export const timeFromNow = (date) => {
  return moment(date).fromNow();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getUserRank = (watchedMoviesCount) => {
  if (watchedMoviesCount >= 1 && watchedMoviesCount <= 10) {
    return `Novice`;
  } else if (watchedMoviesCount >= 11 && watchedMoviesCount <= 20) {
    return `Fan`;
  } else if (watchedMoviesCount >= 21) {
    return `Movie Buff`;
  }
  return ``;
};

export const isOnline = () => {
  return window.navigator.onLine;
};
