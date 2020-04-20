import BoardComponent from "../components/board.js";
import FilmsListComponent from "../components/films-list.js";
import ExtraInfoAboutFilmsComponent from "../components/extra-info-about-films.js";
import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoFilmsComponent from "../components/no-films.js";
import SortingComponent from "../components/sorting.js";
import {render, append, remove} from "../utils/render.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOWING_TOP_RATED_FILMS_COUNT = 2;
const SHOWING_MOST_COMMENTED_FILMS_COUNT = 2;

const renderFilm = (containerElement, film) => {
  const openFilmDetailsPopup = () => {
    bodyElement.classList.add(`hide-overflow`);
    append(bodyElement, filmDetailsComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
    filmDetailsComponent.setFilmDetailsCloseButtonClickHandler(closeFilmDetailsPopup);
  };

  const closeFilmDetailsPopup = () => {
    bodyElement.classList.remove(`hide-overflow`);
    remove(filmDetailsComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmDetailsPopup();
    }
  };

  const bodyElement = document.querySelector(`body`);

  const filmComponent = new FilmComponent(film);

  filmComponent.setFilmTitleClickHandler(openFilmDetailsPopup);
  filmComponent.setFilmPosterClickHandler(openFilmDetailsPopup);
  filmComponent.setFilmCommentsClickHandler(openFilmDetailsPopup);

  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmDetailsComponent.setFilmDetailsCloseButtonClickHandler(closeFilmDetailsPopup);

  render(containerElement, filmComponent);
};

const renderExtraFilmsList = (containerElement, title, films, showingFilmsCount) => {
  const extraInfoAboutFilmsComponent = new ExtraInfoAboutFilmsComponent(title);
  const extraInfoAboutFilmsElement = extraInfoAboutFilmsComponent.getElement();
  const filmsListContainerElement = extraInfoAboutFilmsElement.querySelector(`.films-list__container`);

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerElement, film));

  render(containerElement, extraInfoAboutFilmsComponent);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._boardComponent = new BoardComponent();
    this._noFilmComponent = new NoFilmsComponent();
    this._sortingComponent = new SortingComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      remove(this._showMoreButtonComponent);

      render(filmsListElement, this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        films.slice(prevFilmsCount, showingFilmsCount)
          .forEach((film) => renderFilm(filmsListContainerElement, film));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    if (films.length === 0) {
      render(this._container, this._noFilmComponent);
      return;
    }

    const boardElement = this._boardComponent.getElement();

    render(this._container, this._sortingComponent);
    render(boardElement, this._filmsListComponent);

    const filmsListElement = this._filmsListComponent.getElement();
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    films.slice(0, showingFilmsCount)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

    renderShowMoreButton();

    this._sortingComponent.setSortTypeChangeHandler(() => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      filmsListContainerElement.innerHTML = ``;

      films.slice(0, showingFilmsCount)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderShowMoreButton();
    });

    const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
    const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);

    renderExtraFilmsList(boardElement, `Top rated`, filmsSortedByRating, SHOWING_TOP_RATED_FILMS_COUNT);
    renderExtraFilmsList(boardElement, `Most commented`, filmsSortedByComments, SHOWING_MOST_COMMENTED_FILMS_COUNT);

    render(this._container, this._boardComponent);
  }
}
