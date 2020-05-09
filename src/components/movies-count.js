import AbstractComponent from "./abstract-component.js";

const createMoviesCountTemplate = (moviesCount) => `<p>${moviesCount.toLocaleString(`ru-RU`)} movies inside</p>`;

export default class MoviesCount extends AbstractComponent {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return createMoviesCountTemplate(this._moviesCount);
  }
}
