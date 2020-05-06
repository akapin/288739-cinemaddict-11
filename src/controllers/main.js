import NavigationController from "./navigation.js";
import SortController from "./sort.js";
import MoviesBoardController from "./movies-board.js";
import MainComponent from "../components/main.js";
import LoadingComponent from "../components/loading.js";
import {render, remove} from "../utils/render.js";

export default class MainController {
  constructor(container, api, moviesModel) {
    this._container = container;
    this._api = api;
    this._moviesModel = moviesModel;

    this._mainComponent = null;
  }

  render() {
    this._mainComponent = new MainComponent();
    const mainElement = this._mainComponent.getElement();

    const navigationController = new NavigationController(mainElement, this._moviesModel);
    navigationController.render();

    const sortController = new SortController(mainElement, this._moviesModel);
    sortController.render();

    const loadingComponent = new LoadingComponent();
    render(this._mainComponent.getElement(), loadingComponent);

    render(this._container, this._mainComponent);

    this._api.getMovies()
      .then((movies) => {
        this._moviesModel.setMovies(movies);
      })
      .finally(() => {
        remove(loadingComponent);

        const moviesBoardController = new MoviesBoardController(mainElement, this._moviesModel, this._api);
        moviesBoardController.render();
      });
  }
}
