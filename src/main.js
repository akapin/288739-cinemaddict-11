import {createProfileTemplate} from "./components/profile.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createSortingTemplate} from "./components/sorting";
import {createBoardTemplate} from "./components/board.js";
import {createExtraInfoAboutFilmsTemplate} from "./components/extra-info-about-films.js";
import {createFilmTemplate} from "./components/film.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsAmountTemplate} from "./components/films-amount.js";
import {generateFilms, generateWatchedFilmsCount, generateFilmsAmount} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";

const FILM_COUNT = 15;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const SHOWING_TOP_RATED_FILMS_COUNT = 2;
const SHOWING_MOST_COMMENTED_FILMS_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_COUNT);
const filters = generateFilters();
const watchedFilmsCount = generateWatchedFilmsCount();
const filmsAmount = generateFilmsAmount();

render(siteHeaderElement, createProfileTemplate(watchedFilmsCount));
render(siteMainElement, createMainNavigationTemplate(filters));
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createBoardTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

render(filmsListContainerElement, createFilmDetailsTemplate(films[0]));

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmsListContainerElement, createFilmTemplate(film)));

render(filmsListElement, createShowMoreButtonTemplate());

const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);

render(filmsElement, createExtraInfoAboutFilmsTemplate(`Top rated`, filmsSortedByRating, SHOWING_TOP_RATED_FILMS_COUNT));
render(filmsElement, createExtraInfoAboutFilmsTemplate(`Most commented`, filmsSortedByComments, SHOWING_MOST_COMMENTED_FILMS_COUNT));

render(footerStatisticsElement, createFilmsAmountTemplate(filmsAmount));

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});
