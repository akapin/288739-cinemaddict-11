import API from "../api.js";
import BoardComponent from "../components/board.js";
import MoviesComponent from "../components/movies.js";
import ExtraInfoAboutMoviesComponent from "../components/extra-info-about-movies.js";
import MovieController from "./movie.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoMoviesComponent from "../components/no-movies.js";
import {render, remove} from "../utils/render.js";

const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;
const SHOWING_TOP_RATED_MOVIES_COUNT = 2;
const SHOWING_MOST_COMMENTED_MOVIES_COUNT = 2;

const renderMovies = (moviesContainerElement, moviesModel, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(moviesContainerElement, moviesModel, onDataChange, onViewChange);
    movieController.render(movie);
    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedMovieControllers = [];
    this._showedMovieExtraControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._boardComponent = new BoardComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._moviesComponent = new MoviesComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._moviesModel.setSortChangeHandler(this._onSortChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();

    if (movies.length === 0) {
      render(this._container, this._noMoviesComponent);
      return;
    }

    const boardElement = this._boardComponent.getElement();
    render(boardElement, this._moviesComponent);
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_BY_BUTTON;
    this._renderMovies(movies.slice(0, this._showingMoviesCount));
    this._renderShowMoreButton();
    this._renderExtraMovieListSection();
    render(this._container, this._boardComponent);
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const moviesContainerElement = this._moviesComponent.getElement().querySelector(`.films-list__container`);
    const newMovies = renderMovies(moviesContainerElement, this._moviesModel, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._showingMoviesCount = this._showedMovieControllers.length;
  }

  _renderExtraMovieListSection() {
    const boardElement = this._boardComponent.getElement();
    const movies = this._moviesModel.getMovies();

    const moviesSortedByRating = movies.slice().sort((a, b) => b.rating - a.rating);
    const moviesSortedByComments = movies.slice().sort((a, b) => b.comments.length - a.comments.length);

    this._renderExtraMovieList(boardElement, `Top rated`, moviesSortedByRating, SHOWING_TOP_RATED_MOVIES_COUNT);
    this._renderExtraMovieList(boardElement, `Most commented`, moviesSortedByComments, SHOWING_MOST_COMMENTED_MOVIES_COUNT);
  }

  _renderExtraMovieList(containerElement, title, movies, showingMoviesCount) {
    const extraInfoAboutMoviesComponent = new ExtraInfoAboutMoviesComponent(title);
    const extraInfoAboutMoviesElement = extraInfoAboutMoviesComponent.getElement();
    const moviesContainerElement = extraInfoAboutMoviesElement.querySelector(`.films-list__container`);

    const newMovies = renderMovies(moviesContainerElement, this._moviesModel, movies.slice(0, showingMoviesCount), this._onDataChange, this._onViewChange);
    this._showedMovieExtraControllers = this._showedMovieExtraControllers.concat(newMovies);
    render(containerElement, extraInfoAboutMoviesComponent);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const moviesElement = this._moviesComponent.getElement();

    render(moviesElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    this._updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

        if (isSuccess) {
          this._updateMovies(this._showingMoviesCount);
          movieController.render(movieModel, movieController.getMode());
        }
      });
  }

  _updateMovie(id, data) {
    const api = new API();
    return api.updateMovie(id, data);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
    this._showedMovieExtraControllers.forEach((it) => it.setDefaultView());
  }

  _onShowMoreButtonClick() {
    const moviesContainerElement = this._moviesComponent.getElement().querySelector(`.films-list__container`);
    const prevMoviesCount = this._showingMoviesCount;
    this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;
    const movies = this._moviesModel.getMovies();
    const newMovies = renderMovies(moviesContainerElement, this._moviesModel, movies.slice(prevMoviesCount, this._showingMoviesCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    if (this._showingMoviesCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateMovies(SHOWING_MOVIES_COUNT_ON_START);
  }

  _onSortChange() {
    this._updateMovies(SHOWING_MOVIES_COUNT_ON_START);
  }
}
