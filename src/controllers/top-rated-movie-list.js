import MoviesExtraListController from "./movies-extra-list.js";

const SHOWING_MOVIES_COUNT_ON_START = 2;

export default class TopRatedMovieListController extends MoviesExtraListController {
  constructor(container, moviesModel, api) {
    super(container, moviesModel, api);

    this._moviesModel = moviesModel;
    this._onModelChange = this._onModelChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onModelChange);
  }

  render() {
    const movies = this._moviesModel.getMoviesAll();
    if (!this._haveNonZeroRatingMovies(movies)) {
      return;
    }
    const sortedMovies = movies.slice().sort((a, b) => b.rating - a.rating);
    const showedMovies = sortedMovies.slice(0, SHOWING_MOVIES_COUNT_ON_START);
    super.render(showedMovies, `Top rated`);
  }

  _haveNonZeroRatingMovies(movies) {
    return movies.filter((movie) => movie.rating > 0).length;
  }

  _onModelChange() {
    super.destroy();
    this.render();
  }
}
