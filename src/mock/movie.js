import {getRandomIntegerNumber, getRandomFloatNumber, getRandomArrayItem, getRandomDate} from "../utils/common.js";
import {generateComments} from "./comment.js";

const WatchedMoviesCount = {
  MIN: 0,
  MAX: 30,
};

const MoviesAmount = {
  MIN: 100000,
  MAX: 200000,
};

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus`;

const POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const TITLES = [
  `Made For Each Other`,
  `Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `The Dance Of Life`,
  `The Great Flamarion`,
  `The Man With The Golden Arm`,
];

const AGE_RATINGS = [
  `G`,
  `PG`,
  `PG-13`,
  `R`,
  `NC-17`,
];

const GENRES = [
  `Sci-Fi`,
  `Fantasy`,
  `Action`,
  `Adventure`,
  `Comedy`,
  `Drama`,
  `Horror`,
];

const COUNTRIES = [
  `USA`,
  `USSR`,
  `Russia`,
  `Germany`,
  `France`,
  `Italy`,
  `Spain`,
];

const DIRECTORS = [
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Steven Spielberg`,
  `Roman Polanski`,
  `Ridley Scott`,
  `James Cameron`,
  `Quentin Tarantino`,
];

const SCREENWRITERS = [
  `Billy Wilder`,
  `Ethan Coen`,
  `Robert Towne`,
  `Quentin Tarantino`,
  `William Goldman`,
  `Charlie Kaufman`,
  `Woody Allen`,
];

const ACTORS = [
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Robert De Niro`,
  `Brad Pitt`,
  `Michael Caine`,
  `Matt Damon`,
  `Tom Hanks`,
];

const generateMovieDescription = () => {
  const descriptionSentences = TEXT.split(`.`);
  let newDescriptionList = new Set();
  const newDescriptionListSize = getRandomIntegerNumber(1, 6);
  for (let i = 1; i <= newDescriptionListSize; i++) {
    newDescriptionList.add(getRandomArrayItem(descriptionSentences));
  }
  return Array.from(newDescriptionList).join(`. `);
};

const generateRandomList = (array, maxSize) => {
  let newList = new Set();
  const newListSize = getRandomIntegerNumber(1, maxSize + 1);
  for (let i = 1; i <= newListSize; i++) {
    newList.add(getRandomArrayItem(array));
  }
  return Array.from(newList);
};

const generateGenresList = () => generateRandomList(GENRES, 3);

const generateActorsList = () => generateRandomList(ACTORS, 3);

const generateScreenwritersList = () => generateRandomList(SCREENWRITERS, 3);

const generateMovie = () => {
  return {
    id: String(new Date() + Math.random()),
    poster: getRandomArrayItem(POSTERS),
    title: getRandomArrayItem(TITLES),
    originTitle: getRandomArrayItem(TITLES),
    rating: getRandomFloatNumber(0.0, 10.0),
    date: getRandomDate(),
    duration: getRandomIntegerNumber(0, 180),
    genres: generateGenresList(),
    country: getRandomArrayItem(COUNTRIES),
    director: getRandomArrayItem(DIRECTORS),
    screenwriters: generateScreenwritersList(),
    actors: generateActorsList(),
    ageRating: getRandomArrayItem(AGE_RATINGS),
    description: generateMovieDescription(),
    comments: generateComments(getRandomIntegerNumber(0, 6)),
    isInWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateMovies = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovie);
};

const generateWatchedMoviesCount = () => getRandomIntegerNumber(WatchedMoviesCount.MIN, WatchedMoviesCount.MAX + 1);
const generateMoviesAmount = () => getRandomIntegerNumber(MoviesAmount.MIN, MoviesAmount.MAX + 1);

export {generateMovies, generateWatchedMoviesCount, generateMoviesAmount};
