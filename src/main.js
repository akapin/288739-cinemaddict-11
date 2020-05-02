import API from "./api.js";
import PageController from "./controllers/page.js";
import ProfileComponent from "./components/profile.js";
import FilterController from "./controllers/filter.js";
import MoviesAmountComponent from "./components/movies-amount.js";
import MoviesModel from "./models/movies.js";
import {generateWatchedMoviesCount, generateMoviesAmount} from "./mock/movie.js";
import {render} from "./utils/render.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const api = new API();
const moviesModel = new MoviesModel();

const watchedMoviesCount = generateWatchedMoviesCount();
const moviesAmount = generateMoviesAmount();

render(siteHeaderElement, new ProfileComponent(watchedMoviesCount));
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const pageController = new PageController(siteMainElement, moviesModel);


render(footerStatisticsElement, new MoviesAmountComponent(moviesAmount));

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.render();
  });
