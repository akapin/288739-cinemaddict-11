import StatisticsComponent from "../components/statistics.js";
import {getWatchedMovies} from "../utils/filter.js";
import {render, remove} from "../utils/render.js";

export default class StatisticsController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._statisticsComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const movies = this._moviesModel.getMoviesAll();
    const watchedMovies = getWatchedMovies(movies);
    this._statisticsComponent = new StatisticsComponent(watchedMovies);
    render(this._container, this._statisticsComponent);
    this.hide();
  }

  hide() {
    this._statisticsComponent.hide();
  }

  show() {
    this._statisticsComponent.show();
  }

  _destroy() {
    remove(this._statisticsComponent);
  }

  _update() {
    this._destroy();
    this.render();
  }

  _onDataChange() {
    this._update();
  }
}
