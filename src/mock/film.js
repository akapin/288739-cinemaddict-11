import {getRandomIntegerNumber, getRandomArrayItem, getRandomDate} from "../utils.js";
import {generateComments} from "./comment.js";

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

const generateFilmDescription = () => {
  const descriptionSentences = TEXT.split(`.`);
  let newDescriptionList = new Set();
  const newDescriptionListSize = getRandomIntegerNumber(1, 6);
  for (let i = 1; i <= newDescriptionListSize; i++) {
    newDescriptionList.add(getRandomArrayItem(descriptionSentences));
  }
  return Array.from(newDescriptionList).join(`. `);
};

const generateFilmDuration = () => {
  const hours = getRandomIntegerNumber(1, 3);
  const minutes = getRandomIntegerNumber(0, 60);

  return `${hours}h ${minutes}m`;
};

const generateGenreList = () => {
  let genreList = new Set();
  const genreListSize = getRandomIntegerNumber(1, 4);
  for (let i = 1; i <= genreListSize; i++) {
    genreList.add(getRandomArrayItem(GENRES));
  }
  return Array.from(genreList);
};

const generateFilm = () => {
  return {
    poster: getRandomArrayItem(POSTERS),
    title: getRandomArrayItem(TITLES),
    originTitle: getRandomArrayItem(TITLES),
    rating: getRandomIntegerNumber(0, 11),
    date: getRandomDate(),
    duration: generateFilmDuration(),
    genres: generateGenreList(),
    country: getRandomArrayItem(COUNTRIES),
    director: getRandomArrayItem(DIRECTORS),
    screenwriters: [],
    actors: [],
    ageRating: getRandomArrayItem(AGE_RATINGS),
    description: generateFilmDescription(),
    comments: generateComments(getRandomIntegerNumber(0, 6)),
    isInWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
