import MoviesCountController from "./movies-count.js";
import FooterComponent from "../components/footer.js";
import {render} from "../utils/render.js";

export default class FooterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const footerComponent = new FooterComponent();
    const moviesCountContainerElement = footerComponent.getElement().querySelector(`.footer__statistics`);

    const moviesCountController = new MoviesCountController(moviesCountContainerElement, this._moviesModel);
    moviesCountController.render();

    render(this._container, footerComponent);
  }
}
