import MovieComponent from "../components/movie.js";
import MovieDetailsComponent from "../components/movie-details.js";
import CommentsController from "./comments.js";
import {render, append, remove, replace} from "../utils/render.js";
import {Key} from "../const.js";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, moviesModel, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._movieComponent = null;
    this._movieDetailsComponent = null;
    this._moviesModel = moviesModel;
    this._movie = null;
    this._commentsController = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(movie) {
    const oldMovieComponent = this._movieComponent;
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
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    this._movieComponent.setAlreadyWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._movieComponent.setAddToFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._movieDetailsComponent.setMovieDetailsCloseButtonClickHandler(() => {
      this._closeMovieDetailsPopup();
    });

    this._movieDetailsComponent.setAddToWatchlistButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    this._movieDetailsComponent.setAlreadyWatchedButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._movieDetailsComponent.setAddToFavoritesButtonClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    if (oldMovieComponent) {
      replace(this._movieComponent, oldMovieComponent);
    } else {
      render(this._container, this._movieComponent);
    }
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
    this._commentsController = new CommentsController(commentsSectionContainerElement, this._moviesModel, this._movie);
    this._commentsController.render();
  }

  _openMovieDetailsPopup() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);
    bodyElement.classList.add(`hide-overflow`);
    append(bodyElement, this._movieDetailsComponent);
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
