import FiltersController from "./filters.js";
import NavigationComponent from "../components/navigation.js";
import {render} from "../utils/render.js";

export default class NavigationController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const navigationComponent = new NavigationComponent();
    const navigationElement = navigationComponent.getElement();

    const filtersController = new FiltersController(navigationElement, this._moviesModel);
    filtersController.render();

    render(this._container, navigationComponent);
  }
}
