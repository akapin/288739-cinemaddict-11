import AbstractComponent from "./abstract-component.js";

const createFilmsAmountTemplate = (filmsAmount) => {
  return (
    `<p>${filmsAmount.toLocaleString(`ru-RU`)} movies inside</p>`
  );
};

export default class FilmsAmount extends AbstractComponent {
  constructor(filmsAmount) {
    super();

    this._filmsAmount = filmsAmount;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._filmsAmount);
  }
}
