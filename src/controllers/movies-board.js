import MoviesMainListController from "./movies-main-list.js";
import MostCommentedMovieListController from "./most-commented-movie-list.js";
import TopRatedMovieListController from "./top-rated-movie-list.js";
import MoviesBoardComponent from "../components/movies-board.js";
import NoMoviesComponent from "../components/no-movies.js";
import {render} from "../utils/render.js";

export default class MoviesBoardController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._noMoviesComponent = null;
    this._moviesBoardComponent = null;
  }

  render() {
    const movies = this._moviesModel.getMovies();

    if (movies.length === 0) {
      this._noMoviesComponent = new NoMoviesComponent();
      render(this._container, this._noMoviesComponent);
      return;
    }

    this._moviesBoardComponent = new MoviesBoardComponent();
    const moviesBoardElement = this._moviesBoardComponent.getElement();

    const moviesMainListController = new MoviesMainListController(moviesBoardElement, this._moviesModel, this._api);
    moviesMainListController.render();

    const topRatedMovieListController = new TopRatedMovieListController(moviesBoardElement, this._moviesModel, this._api);
    topRatedMovieListController.render();

    const mostCommentedMovieListController = new MostCommentedMovieListController(moviesBoardElement, this._moviesModel, this._api);
    mostCommentedMovieListController.render();

    render(this._container, this._moviesBoardComponent);
  }

  hide() {
    this._moviesBoardComponent.hide();
  }

  show() {
    this._moviesBoardComponent.show();
  }
}
