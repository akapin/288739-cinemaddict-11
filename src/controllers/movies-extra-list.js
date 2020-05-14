import MovieController from "./movie.js";
import MoviesExtraListComponent from "../components/movies-extra-list.js";
import {render, remove} from "../utils/render.js";

export default class MoviesExtraList {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;
    this._moviesExtraListComponent = null;
    this._showedMovieControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(movies, title) {
    this._moviesExtraListComponent = new MoviesExtraListComponent(title);
    this._renderMovies(movies);
    render(this._container, this._moviesExtraListComponent);
  }

  destroy() {
    remove(this._moviesExtraListComponent);
    this._removeMovies();
  }

  _renderMovies(movies) {
    const moviesContainerElement = this._moviesExtraListComponent.getElement().querySelector(`.films-list__container`);

    const newMovies = movies.map((movie) => {
      const movieController = new MovieController(moviesContainerElement, this._moviesModel, this._onDataChange, this._onViewChange, this._api);
      movieController.render(movie);
      return movieController;
    });

    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
  }

  _removeMovies() {
    this._showedMovieControllers.forEach((movieController) => movieController.destroy());
    this._showedMovieControllers = [];
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((movieModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, movieModel);

        if (isSuccess) {
          movieController.destroy();
          movieController.render(movieModel, movieController.getMode());
        }
      });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
}
