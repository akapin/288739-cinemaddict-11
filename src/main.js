import PageController from "./controllers/page.js";
import ProfileComponent from "./components/profile.js";
import FilterController from "./controllers/filter.js";
import MoviesAmountComponent from "./components/movies-amount.js";
import MoviesModel from "./models/movies.js";
import {generateMovies, generateWatchedMoviesCount, generateMoviesAmount} from "./mock/movie.js";
import {render} from "./utils/render.js";

const MOVIE_COUNT = 15;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const movies = generateMovies(MOVIE_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);
const watchedMoviesCount = generateWatchedMoviesCount();
const moviesAmount = generateMoviesAmount();

render(siteHeaderElement, new ProfileComponent(watchedMoviesCount));
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const pageController = new PageController(siteMainElement, moviesModel);
pageController.render();

render(footerStatisticsElement, new MoviesAmountComponent(moviesAmount));
