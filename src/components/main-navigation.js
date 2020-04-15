import {createElement} from "../utils.js";

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation {
  constructor(filters) {
    this._filters = filters;

    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
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
