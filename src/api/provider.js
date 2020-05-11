const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api) {
    this._api = api;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies();
    }

    return Promise.reject(`offline logic is not implemented`);
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
