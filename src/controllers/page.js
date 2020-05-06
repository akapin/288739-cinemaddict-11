import HeaderController from "./header.js";
import MainController from "./main.js";
import FooterController from "./footer.js";
import MoviesModel from "../models/movies.js";

export default class PageController {
  constructor(container, api) {
    this._container = container;
    this._api = api;
  }

  render() {
    const moviesModel = new MoviesModel();

    const headerController = new HeaderController(this._container, moviesModel);
    headerController.render();

    const mainController = new MainController(this._container, this._api, moviesModel);
    mainController.render();

    const footerController = new FooterController(this._container, moviesModel);
    footerController.render();
  }
}
