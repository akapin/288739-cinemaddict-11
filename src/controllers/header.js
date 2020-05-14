import ProfileController from "./profile.js";
import HeaderComponent from "../components/header.js";
import {render} from "../utils/render.js";

export default class Header {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const headerComponent = new HeaderComponent();
    const headerElement = headerComponent.getElement();

    const profileController = new ProfileController(headerElement, this._moviesModel);
    profileController.render();

    render(this._container, headerComponent);
  }
}
