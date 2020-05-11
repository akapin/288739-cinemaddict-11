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
          const items = movies.reduce((acc, current) => {
            return Object.assign({}, acc, {
              [current.id]: current,
            });
          }, {});

          this._store.setItems(items);

          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(Movie.parseTasks(storeMovies));
  }

  updateMovie(id, movie) {
    if (isOnline()) {
      return this._api.updateMovie(id, movie)
        .then((newMovie) => {
          this._store.setItem(newMovie.id, newMovie.toRAW());

          return newMovie;
        });
    }

    const localMovie = Movie.clone(Object.assign(movie, {id}));

    this._store.setItem(id, localMovie.toRAW());

    return Promise.resolve(localMovie);
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  createComment(movieId, comment) {
    if (isOnline()) {
      return this._api.createComment(movieId, comment);
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
