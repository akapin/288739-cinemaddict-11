import MovieComponent from "../components/movie.js";
import MovieDetailsComponent from "../components/movie-details.js";
import {render, append, remove} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._movieComponent = null;
    this._movieDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(movie) {
    this._movieComponent = new MovieComponent(movie);
    this._movieDetailsComponent = new MovieDetailsComponent(movie);

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

    this._movieDetailsComponent.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isInWatchlist: !movie.isInWatchlist,
      }));
    });

    this._movieDetailsComponent.setAlreadyWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._movieDetailsComponent.setAddToFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    render(this._container, this._movieComponent);
  }

  _openMovieDetailsPopup() {
    const bodyElement = document.querySelector(`body`);
    bodyElement.classList.add(`hide-overflow`);
    append(bodyElement, this._movieDetailsComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._movieDetailsComponent.setMovieDetailsCloseButtonClickHandler(() => {
      this._closeMovieDetailsPopup();
    });
  }

  _closeMovieDetailsPopup() {
    const bodyElement = document.querySelector(`body`);
    bodyElement.classList.remove(`hide-overflow`);
    remove(this._movieDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeMovieDetailsPopup();
    }
  }
}
