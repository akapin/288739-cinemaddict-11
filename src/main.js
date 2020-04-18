import ProfileComponent from "./components/profile.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortingComponent from "./components/sorting";
import BoardComponent from "./components/board.js";
import FilmsListComponent from "./components/films-list.js";
import ExtraInfoAboutFilmsComponent from "./components/extra-info-about-films.js";
import FilmComponent from "./components/film.js";
import FilmDetailsComponent from "./components/film-details.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmsAmountComponent from "./components/films-amount.js";
import NoFilmsComponent from "./components/no-films.js";
import {generateFilms, generateWatchedFilmsCount, generateFilmsAmount} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {render, append} from "./utils/render.js";

const FILM_COUNT = 15;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOWING_TOP_RATED_FILMS_COUNT = 2;
const SHOWING_MOST_COMMENTED_FILMS_COUNT = 2;

const renderFilm = (containerElement, film) => {
  const openFilmDetailsPopup = () => {
    bodyElement.classList.add(`hide-overflow`);
    append(bodyElement, filmDetailsElement);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeFilmDetailsPopup = () => {
    bodyElement.classList.remove(`hide-overflow`);
    bodyElement.removeChild(filmDetailsElement);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmDetailsPopup();
    }
  };

  const onFilmTitleClick = () => {
    openFilmDetailsPopup();
  };

  const onFilmPosterClick = () => {
    openFilmDetailsPopup();
  };

  const onFilmCommentsClick = () => {
    openFilmDetailsPopup();
  };

  const onFilmDetailsCloseButtonClick = () => {
    closeFilmDetailsPopup();
  };

  const bodyElement = document.querySelector(`body`);

  const filmElement = new FilmComponent(film).getElement();
  const filmTitle = filmElement.querySelector(`.film-card__title`);
  const filmPoster = filmElement.querySelector(`.film-card__poster`);
  const filmComments = filmElement.querySelector(`.film-card__comments`);
  filmTitle.addEventListener(`click`, onFilmTitleClick);
  filmPoster.addEventListener(`click`, onFilmPosterClick);
  filmComments.addEventListener(`click`, onFilmCommentsClick);

  const filmDetailsElement = new FilmDetailsComponent(film).getElement();
  const filmDetailsCloseButton = filmDetailsElement.querySelector(`.film-details__close-btn`);
  filmDetailsCloseButton.addEventListener(`click`, onFilmDetailsCloseButtonClick);

  render(containerElement, filmElement);
};

const renderFilmsList = (containerElement, films, showingFilmsCount) => {
  const filmsListElement = new FilmsListComponent().getElement();
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerElement, film));

  render(filmsListElement, new ShowMoreButtonComponent().getElement());

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });

  render(containerElement, filmsListElement);
};

const renderExtraFilmsList = (containerElement, title, films, showingFilmsCount) => {
  const extraInfoAboutFilmsElement = new ExtraInfoAboutFilmsComponent(title).getElement();
  const filmsListContainerElement = extraInfoAboutFilmsElement.querySelector(`.films-list__container`);

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerElement, film));

  render(containerElement, extraInfoAboutFilmsElement);
};

const renderBoard = (containerElement, films) => {
  if (films.length === 0) {
    render(containerElement, new NoFilmsComponent().getElement());
    return;
  }

  const boardElement = new BoardComponent().getElement();
  const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
  const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  renderFilmsList(boardElement, films, SHOWING_FILMS_COUNT_ON_START);
  renderExtraFilmsList(boardElement, `Top rated`, filmsSortedByRating, SHOWING_TOP_RATED_FILMS_COUNT);
  renderExtraFilmsList(boardElement, `Most commented`, filmsSortedByComments, SHOWING_MOST_COMMENTED_FILMS_COUNT);

  render(containerElement, boardElement);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_COUNT);
const filters = generateFilters();
const watchedFilmsCount = generateWatchedFilmsCount();
const filmsAmount = generateFilmsAmount();

render(siteHeaderElement, new ProfileComponent(watchedFilmsCount).getElement());
render(siteMainElement, new MainNavigationComponent(filters).getElement());
render(siteMainElement, new SortingComponent().getElement());
renderBoard(siteMainElement, films);
render(footerStatisticsElement, new FilmsAmountComponent(filmsAmount).getElement());
