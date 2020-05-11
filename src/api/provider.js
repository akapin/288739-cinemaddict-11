export default class Provider {
  constructor(api) {
    this._api = api;
  }

  getMovies() {
    return this._api.getMovies();
  }

  updateMovie(id, data) {
    return this._api.updateMovie(id, data);
  }

  getComments(movieId) {
    return this._api.getComments(movieId);
  }

  createComment(movieId, data) {
    return this._api.createComment(movieId, data);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }
}
