import AbstractComponent from "./abstract-component.js";
import {capitalizeFirstLetter} from "../utils/common.js";

const getFilterNameByLink = (link) => {
  return link.split(`#`)[1];
};

const createFilterMarkup = (filter) => {
  const {name, count, active} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${ active ? `main-navigation__item--active` : ``}">
      ${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A` && evt.target.parentElement.tagName !== `A`) {
        return;
      }

      const link = evt.target.tagName === `A` ? evt.target.href : evt.target.parentElement.href;

      handler(getFilterNameByLink(link));
    });
  }
}
