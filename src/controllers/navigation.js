import FiltersController from "./filters.js";
import NavigationComponent from "../components/navigation.js";
import {render} from "../utils/render.js";

export default class Navigation {
  constructor(container, moviesModel, contentControllers) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._contentControllers = contentControllers;
  }

  render() {
    const navigationComponent = new NavigationComponent();
    const navigationElement = navigationComponent.getElement();

    const filtersController = new FiltersController(navigationElement, this._moviesModel, this._contentControllers);
    filtersController.render();

    navigationComponent.setStatsLinkClickHandler(() => {
      this._contentControllers.sortController.hide();
      this._contentControllers.moviesBoardController.hide();
      this._contentControllers.statisticsController.show();
    });

    render(this._container, navigationComponent);
  }
}
