import StatisticsComponent from "../components/statistics.js";
import {render} from "../utils/render.js";

export default class StatisticsController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._statisticsComponent = null;
  }

  render() {
    this._statisticsComponent = new StatisticsComponent();
    render(this._container, this._statisticsComponent);
  }

  hide() {
    this._statisticsComponent.hide();
  }

  show() {
    this._statisticsComponent.show();
  }
}
