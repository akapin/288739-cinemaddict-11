import {createElement} from "../utils.js";

const createFilmsAmountTemplate = (filmsAmount) => {
  return (
    `<p>${filmsAmount.toLocaleString(`ru-RU`)} movies inside</p>`
  );
};

export default class FilmsAmount {
  constructor(filmsAmount) {
    this._filmsAmount = filmsAmount;

    this._element = null;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._filmsAmount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
