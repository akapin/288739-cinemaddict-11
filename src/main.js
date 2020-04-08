import {createProfileTemplate} from "./components/profile.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createSortingTemplate} from "./components/sorting";
import {createBoardTemplate} from "./components/board.js";
import {createFilmTemplate} from "./components/film.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsAmountTemplate} from "./components/films-amount.js";
import {generateFilms} from "./mock/film.js";

const FILM_COUNT = 15;
const FILM_EXTRA_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_COUNT);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createBoardTemplate());

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const filmsListExtraContainers = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainerElement, createFilmTemplate(films[i]));
}

render(filmsListElement, createShowMoreButtonTemplate());

for (let i = 0; i < filmsListExtraContainers.length; i++) {
  for (let j = 0; j < FILM_EXTRA_COUNT; j++) {
    render(filmsListExtraContainers[i], createFilmTemplate(films[j]));
  }
}

render(footerStatisticsElement, createFilmsAmountTemplate());
