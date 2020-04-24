import AbstractComponent from "./abstract-component.js";
import {formatDateTime, formatDuration} from "../utils/common.js";

const createButtonMarkup = (name, text, isActive = true) => {
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}">
      ${name}
    </button>`
  );
};

const createMovieTemplate = (movie) => {
  const {title, rating, date, duration, genres, poster, description, comments, isInWatchlist, isWatched, isFavorite} = movie;

  const year = formatDateTime(date, `YYYY`);
  const commentsCount = comments.length;
  const formattedDuration = formatDuration(duration);

  const addToWatchlistButton = createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, isInWatchlist);
  const alreadyWatchedtButton = createButtonMarkup(`mark-as-watched`, `Mark as watched`, isWatched);
  const addToFavoritesButton = createButtonMarkup(`favorite`, `Mark as favorite`, isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formattedDuration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${addToWatchlistButton}
        ${alreadyWatchedtButton}
        ${addToFavoritesButton}
      </form>
    </article>`
  );
};

export default class Movie extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
  }

  getTemplate() {
    return createMovieTemplate(this._movie);
  }

  setMovieTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setMoviePosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setMovieCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
