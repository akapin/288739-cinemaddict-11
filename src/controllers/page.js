import BoardComponent from "../components/board.js";
import MoviesComponent from "../components/movies.js";
import ExtraInfoAboutMoviesComponent from "../components/extra-info-about-movies.js";
import MovieController from "./movie.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoMoviesComponent from "../components/no-movies.js";
import SortingComponent, {SortType} from "../components/sorting.js";
import {render, remove} from "../utils/render.js";

const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;
const SHOWING_TOP_RATED_MOVIES_COUNT = 2;
const SHOWING_MOST_COMMENTED_MOVIES_COUNT = 2;

const renderExtraMovieList = (containerElement, title, movies, showingMoviesCount) => {
  const extraInfoAboutMoviesComponent = new ExtraInfoAboutMoviesComponent(title);
  const extraInfoAboutMoviesElement = extraInfoAboutMoviesComponent.getElement();
  const moviesContainerElement = extraInfoAboutMoviesElement.querySelector(`.films-list__container`);

  renderMovies(moviesContainerElement, movies.slice(0, showingMoviesCount));
  render(containerElement, extraInfoAboutMoviesComponent);
};

const renderMovies = (moviesContainerElement, movies, onDataChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(moviesContainerElement, onDataChange);
    movieController.render(movie);
    return movieController;
  });
};

const getSortedMovies = (movies, sortType, from, to) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedMovies = showingMovies.sort((a, b) => b.date - a.date);
      break;
    case SortType.RATING:
      sortedMovies = showingMovies.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }
  return sortedMovies.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._movies = [];
    this._showedMovieControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._boardComponent = new BoardComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._sortingComponent = new SortingComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._moviesComponent = new MoviesComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(movies) {
    this._movies = movies;

    if (movies.length === 0) {
      render(this._container, this._noMoviesComponent);
      return;
    }

    const boardElement = this._boardComponent.getElement();

    render(this._container, this._sortingComponent);
    render(boardElement, this._moviesComponent);

    this._showingMoviesCount = SHOWING_MOVIES_COUNT_BY_BUTTON;

    const moviesContainerElement = this._moviesComponent.getElement().querySelector(`.films-list__container`);

    const newMovies = renderMovies(moviesContainerElement, this._movies.slice(0, this._showingMoviesCount), this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._renderShowMoreButton();

    const moviesSortedByRating = this._movies.slice().sort((a, b) => b.rating - a.rating);
    const moviesSortedByComments = this._movies.slice().sort((a, b) => b.comments.length - a.comments.length);

    renderExtraMovieList(boardElement, `Top rated`, moviesSortedByRating, SHOWING_TOP_RATED_MOVIES_COUNT);
    renderExtraMovieList(boardElement, `Most commented`, moviesSortedByComments, SHOWING_MOST_COMMENTED_MOVIES_COUNT);

    render(this._container, this._boardComponent);
  }

  _renderShowMoreButton() {
    if (this._showingMoviesCount >= this._movies.length) {
      return;
    }

    remove(this._showMoreButtonComponent);

    const moviesElement = this._moviesComponent.getElement();

    render(moviesElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const moviesContainerElement = this._moviesComponent.getElement().querySelector(`.films-list__container`);
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(this._movies, this._sortingComponent.getSortType(), prevMoviesCount, this._showingMoviesCount);
      const newMovies = renderMovies(moviesContainerElement, sortedMovies, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      if (this._showingMoviesCount >= this._movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));

    movieController.render(this._movies[index]);
  }

  _onSortTypeChange(sortType) {
    const moviesContainerElement = this._moviesComponent.getElement().querySelector(`.films-list__container`);
    moviesContainerElement.innerHTML = ``;

    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    const sortedMovies = getSortedMovies(this._movies, sortType, 0, this._showingMoviesCount);
    const newMovies = renderMovies(moviesContainerElement, sortedMovies, this._onDataChange);
    this._showedMovieControllers = newMovies;

    this._renderShowMoreButton();
  }
}
