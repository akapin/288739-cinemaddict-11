import ProfileComponent from "../components/profile.js";
import {getWatchedMovies} from "../utils/filter.js";
import {render, remove} from "../utils/render.js";

export default class Profile {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._profileComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const movies = this._moviesModel.getMoviesAll();
    const watchedMovies = getWatchedMovies(movies);

    this._profileComponent = new ProfileComponent(watchedMovies.length);
    render(this._container, this._profileComponent);
  }

  _destroy() {
    remove(this._profileComponent);
  }

  _update() {
    this._destroy();
    this.render();
  }

  _onDataChange() {
    this._update();
  }
}
