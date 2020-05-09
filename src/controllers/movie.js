import CommentsController from "./comments.js";
import MovieComponent from "../components/movie.js";
import MovieDetailsComponent from "../components/movie-details.js";
import MovieModel from "../models/movie.js";
import {render, remove, replace} from "../utils/render.js";
import {Key} from "../const.js";

export const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, moviesModel, onDataChange, onViewChange, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._mode = Mode.DEFAULT;
    this._movieComponent = null;
    this._movieDetailsComponent = null;
    this._movie = null;
    this._commentsController = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(movie, mode = Mode.DEFAULT) {
    const oldMovieComponent = this._movieComponent;
    const oldMovieDetailsComponent = this._movieDetailsComponent;
    this._mode = mode;

    this._movieComponent = new MovieComponent(movie);
    this._movieDetailsComponent = new MovieDetailsComponent(movie);
    this._movie = movie;

    this._movieComponent.setMovieTitleClickHandler(() => {
      this._openMovieDetailsPopup();
    });
    this._movieComponent.setMoviePosterClickHandler(() => {
      this._openMovieDetailsPopup();
    });
    this._movieComponent.setMovieCommentsClickHandler(() => {
      this._openMovieDetailsPopup();
    });

    this._movieComponent.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isInWatchlist = !newMovie.isInWatchlist;
      this._onDataChange(this, movie, newMovie);
    });

    this._movieComponent.setAlreadyWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;
      this._onDataChange(this, movie, newMovie);
    });

    this._movieComponent.setAddToFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, movie, newMovie);
    });

    this._movieDetailsComponent.setMovieDetailsCloseButtonClickHandler(() => {
      this._closeMovieDetailsPopup();
    });

    this._movieDetailsComponent.setAddToWatchlistButtonClickHandler(() => {
      const newMovie = MovieModel.clone(movie);
      newMovie.isInWatchlist = !newMovie.isInWatchlist;
      this._onDataChange(this, movie, newMovie);
    });

    this._movieDetailsComponent.setAlreadyWatchedButtonClickHandler(() => {
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;
      this._onDataChange(this, movie, newMovie);
    });

    this._movieDetailsComponent.setAddToFavoritesButtonClickHandler(() => {
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;
      this._onDataChange(this, movie, newMovie);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldMovieDetailsComponent && oldMovieComponent) {
          replace(this._movieComponent, oldMovieComponent);
          replace(this._movieDetailsComponent, oldMovieDetailsComponent);
        } else {
          render(this._container, this._movieComponent);
        }
        break;
      case Mode.POPUP:
        if (oldMovieDetailsComponent && oldMovieComponent) {
          remove(oldMovieComponent);
          remove(oldMovieDetailsComponent);
        }
        this._openMovieDetailsPopup();
        break;
    }
  }

  getMode() {
    return this._mode;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeMovieDetailsPopup();
    }
  }

  destroy() {
    remove(this._movieDetailsComponent);
    remove(this._movieComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _renderMovieCommentsSection() {
    const commentsSectionContainerElement = this._movieDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsController = new CommentsController(commentsSectionContainerElement, this._moviesModel, this._movie, this._api);
    this._commentsController.render();
  }

  _openMovieDetailsPopup() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);
    bodyElement.classList.add(`hide-overflow`);
    bodyElement.append(this._movieDetailsComponent.getElement());
    this._renderMovieCommentsSection();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._movieDetailsComponent.setMovieDetailsCloseButtonClickHandler(() => {
      this._closeMovieDetailsPopup();
    });
    this._mode = Mode.POPUP;
  }

  _closeMovieDetailsPopup() {
    const bodyElement = document.querySelector(`body`);
    bodyElement.classList.remove(`hide-overflow`);
    remove(this._movieDetailsComponent);
    this._commentsController.destroy();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE || evt.key === Key.ESC;

    if (isEscKey) {
      this._closeMovieDetailsPopup();
    }
  }
}
