import AbstractComponent from "./abstract-component.js";

const createMoviesAmountTemplate = (moviesAmount) => {
  return (
    `<p>${moviesAmount.toLocaleString(`ru-RU`)} movies inside</p>`
  );
};

export default class MoviesAmount extends AbstractComponent {
  constructor(moviesAmount) {
    super();

    this._moviesAmount = moviesAmount;
  }

  getTemplate() {
    return createMoviesAmountTemplate(this._moviesAmount);
  }
}
