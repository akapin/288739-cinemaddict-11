import Movie from "../models/movie.js";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem(movie.id, movie.toRAW()));

          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(Movie.parseTasks(storeMovies));
  }

  updateMovie(id, data) {
    if (isOnline()) {
      return this._api.updateMovie(id, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  createComment(movieId, data) {
    if (isOnline()) {
      return this._api.createComment(movieId, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
