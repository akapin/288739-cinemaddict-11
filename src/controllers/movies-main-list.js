import MovieController from "./movie.js";
import MoviesMainListComponent from "../components/movies-main-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import {render, remove} from "../utils/render.js";

const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

export default class MoviesMainListController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._moviesMainListComponent = null;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._showedMovieControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onMoviesModelChange = this._onMoviesModelChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._moviesModel.setDataChangeHandler(this._onMoviesModelChange);
    this._moviesModel.setSortChangeHandler(this._onSortChange);
  }

  render() {
    this._moviesMainListComponent = new MoviesMainListComponent();

    const movies = this._moviesModel.getMovies();
    const showedMovies = movies.slice(0, this._showingMoviesCount);
    this._renderMovies(showedMovies);

    this._renderShowMoreButton();
    render(this._container, this._moviesMainListComponent);
  }

  destroy() {
    remove(this._moviesMainListComponent);
    this._removeMovies();
  }

  _renderMovies(movies) {
    const moviesContainerElement = this._moviesMainListComponent.getElement().querySelector(`.films-list__container`);
    const newMovies = movies.map((movie) => {
      const movieController = new MovieController(moviesContainerElement, this._moviesModel, this._onDataChange, this._onViewChange, this._api);
      movieController.render(movie);
      return movieController;
    });

    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const moviesMainListElement = this._moviesMainListComponent.getElement();

    render(moviesMainListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _updateMovies(showingMoviesCount) {
    this._removeMovies();

    const movies = this._moviesModel.getMovies();
    const showedMovies = movies.slice(0, showingMoviesCount);
    this._renderMovies(showedMovies);

    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const movies = this._moviesModel.getMovies();
    const prevMoviesCount = this._showingMoviesCount;
    this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;
    const showedMovies = movies.slice(prevMoviesCount, this._showingMoviesCount);
    this._renderMovies(showedMovies);

    if (this._showingMoviesCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

        if (isSuccess) {
          movieController.destroy();
          movieController.render(movieModel, movieController.getMode());
        }
      });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortChange() {
    this._updateMovies(SHOWING_MOVIES_COUNT_ON_START);
  }

  _onMoviesModelChange() {
    if (this._showingMoviesCount > SHOWING_MOVIES_COUNT_ON_START) {
      this._updateMovies(this._showingMoviesCount);
    } else {
      this._updateMovies(SHOWING_MOVIES_COUNT_ON_START);
    }
  }
}
