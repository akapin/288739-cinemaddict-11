import PageController from "./controllers/page.js";
import ProfileComponent from "./components/profile.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortingComponent from "./components/sorting";
import FilmsAmountComponent from "./components/films-amount.js";
import {generateFilms, generateWatchedFilmsCount, generateFilmsAmount} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {render} from "./utils/render.js";

const FILM_COUNT = 15;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_COUNT);
const filters = generateFilters();
const watchedFilmsCount = generateWatchedFilmsCount();
const filmsAmount = generateFilmsAmount();

render(siteHeaderElement, new ProfileComponent(watchedFilmsCount));
render(siteMainElement, new MainNavigationComponent(filters));
render(siteMainElement, new SortingComponent());

const pageController = new PageController(siteMainElement);
pageController.render(films);

render(footerStatisticsElement, new FilmsAmountComponent(filmsAmount));
