import MovieComponent from "../components/film.js";
import MovieDetailsComponent from "../components/film-details.js";
import {render, append, remove} from "../utils/render.js";

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._movieComponent = null;
    this._movieDetailsComponent = null;
  }

  render(movie) {
    this._movieComponent = new MovieComponent(movie);
    this._movieDetailsComponent = new MovieDetailsComponent(movie);

    this._movieComponent.setFilmTitleClickHandler(this._openMovieDetailsPopup);
    this._movieComponent.setFilmPosterClickHandler(this._openMovieDetailsPopup);
    this._movieComponent.setFilmCommentsClickHandler(this._openMovieDetailsPopup);

    this._movieDetailsComponent.setFilmDetailsCloseButtonClickHandler(this._closeMovieDetailsPopup);

    render(this._container, this._movieComponent);
  }

  _openMovieDetailsPopup() {
    const bodyElement = document.querySelector(`body`);
    bodyElement.classList.add(`hide-overflow`);
    append(bodyElement, this._movieDetailsComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._movieDetailsComponent.setFilmDetailsCloseButtonClickHandler(this._closeMovieDetailsPopup);
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
