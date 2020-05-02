import {getMoviesByFilter} from "../utils/filter.js";
import {getSortedMovies} from "../utils/sort.js";
import {FilterType, SortType} from "../const.js";

export default class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getMovies() {
    const filteredMovieList = getMoviesByFilter(this._movies, this._activeFilterType);
    return getSortedMovies(filteredMovieList, this._activeSortType);
  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  getMovieComments(movieId) {
    return this._movies.find((movie) => movie.id === movieId).comments;
  }

  addComment(movie, comment) {
    let oldComments = this.getMovieComments(movie.id);
    const newComments = [].concat(oldComments, comment);

    this.updateMovie(movie.id, Object.assign({}, movie, {
      comments: newComments,
    }));
  }

  removeComment(movie, commentId) {
    let oldComments = this.getMovieComments(movie.id);
    const index = oldComments.findIndex((it) => it.id === commentId);

    if (index === -1) {
      return;
    }

    const newComments = [].concat(oldComments.slice(0, index), oldComments.slice(index + 1));

    this.updateMovie(movie.id, Object.assign({}, movie, {
      comments: newComments,
    }));
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
