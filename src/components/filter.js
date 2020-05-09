import AbstractComponent from "./abstract-component.js";
import {capitalizeFirstLetter} from "../utils/common.js";

const createFilterTemplate = (filter) => {
  const {name, count, active} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${ active ? `main-navigation__item--active` : ``}">
      ${capitalizeFirstLetter(name)} ${name === `all` ? `movies` : ``}
      ${name === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}
