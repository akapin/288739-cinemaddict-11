import MoviesExtraListController from "./movies-extra-list.js";

const SHOWING_MOVIES_COUNT_ON_START = 2;

export default class MostCommentedMovieListController extends MoviesExtraListController {
  constructor(container, moviesModel, api) {
    super(container, moviesModel, api);

    this._moviesModel = moviesModel;
    this._onModelChange = this._onModelChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onModelChange);
  }

  render() {
    const movies = this._moviesModel.getMoviesAll();
    if (!this._haveMoviesWithComments(movies)) {
      return;
    }
    const sortedMovies = movies.slice().sort((a, b) => b.comments.length - a.comments.length);
    const showedMovies = sortedMovies.slice(0, SHOWING_MOVIES_COUNT_ON_START);
    super.render(showedMovies, `Most commented`);
  }

  _haveMoviesWithComments(movies) {
    return movies.filter((movie) => movie.comments.length).length;
  }

  _onModelChange() {
    super.destroy();
    this.render();
  }
}
