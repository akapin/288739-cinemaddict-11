import MovieController from "./movie.js";
import MoviesExtraListComponent from "../components/movies-extra-list.js";
import {render, remove} from "../utils/render.js";

const SHOWING_MOVIES_COUNT_ON_START = 2;

export default class MoviesExtraListController {
  constructor(container, moviesModel, api, sortingProperty, title) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;
    this.sortingProperty = sortingProperty;
    this._title = title;

    this._moviesExtraListComponent = null;
    this._showedMovieControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onMoviesModelChange = this._onMoviesModelChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onMoviesModelChange);
  }

  render() {
    this._moviesExtraListComponent = new MoviesExtraListComponent(this._title);

    const movies = this._moviesModel.getMoviesAll();

    if (this._title === `Most commented` && !this._haveMoviesWithComments(movies)) {
      return;
    }

    if (this._title === `Top rated` && !this._haveNonZeroRatingMovies(movies)) {
      return;
    }

    this._renderMovies(movies);
    render(this._container, this._moviesExtraListComponent);
  }

  destroy() {
    remove(this._moviesExtraListComponent);
    this._removeMovies();
  }

  _renderMovies(movies) {
    const moviesContainerElement = this._moviesExtraListComponent.getElement().querySelector(`.films-list__container`);
    const sortedMovies = movies.slice().sort((a, b) => b[this.sortingProperty] - a[this.sortingProperty]);
    const showedMovies = sortedMovies.slice(0, this._showingMoviesCount);

    const newMovies = showedMovies.map((movie) => {
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

  _updateMovies() {
    this._removeMovies();
    this._renderMovies();
  }

  _haveMoviesWithComments(movies) {
    return movies.filter((movie) => movie.comments.length).length;
  }

  _haveNonZeroRatingMovies(movies) {
    return movies.filter((movie) => movie.rating > 0).length;
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

        if (isSuccess) {
          movieController.render(movieModel, movieController.getMode());
        }
      });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onMoviesModelChange() {
    this._updateMovies();
  }
}
