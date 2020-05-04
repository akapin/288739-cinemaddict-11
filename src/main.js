import API from "./api.js";
import PageController from "./controllers/page.js";
import ProfileComponent from "./components/profile.js";
import FilterController from "./controllers/filter.js";
import SortController from "./controllers/sort.js";
import LoadingComponent from "./components/loading.js";
import MoviesAmountComponent from "./components/movies-amount.js";
import MoviesModel from "./models/movies.js";
import {getWatchedMovies} from "./utils/filter.js";
import {render, remove} from "./utils/render.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const AUTHORIZATION = `Basic ar283jdzsdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const sortController = new SortController(siteMainElement, moviesModel);
sortController.render();

const loadingComponent = new LoadingComponent();
render(siteMainElement, loadingComponent);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
  })
  .finally(() => {
    remove(loadingComponent);

    const pageController = new PageController(siteMainElement, moviesModel, api);
    pageController.render();

    const allMovies = moviesModel.getMoviesAll();
    const watchedMoviesCount = getWatchedMovies(allMovies).length;

    render(siteHeaderElement, new ProfileComponent(watchedMoviesCount));
    render(footerStatisticsElement, new MoviesAmountComponent(allMovies.length));
  });
