import MoviesCountComponent from "../components/movies-count.js";
import {render, remove} from "../utils/render.js";

export default class MoviesCountController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._moviesCountComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const movies = this._moviesModel.getMoviesAll();
    this._moviesCountComponent = new MoviesCountComponent(movies.length);
    render(this._container, this._moviesCountComponent);
  }

  _destroy() {
    remove(this._moviesCountComponent);
  }

  _update() {
    this._destroy();
    this.render();
  }

  _onDataChange() {
    this._update();
  }
}
