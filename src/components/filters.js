import AbstractComponent from "./abstract-component.js";

const createFiltersTemplate = () => `<div class="main-navigation__items"></div>`;

export default class Filters extends AbstractComponent {
  getTemplate() {
    return createFiltersTemplate();
  }

  _getFilterNameByLink(link) {
    return link.split(`#`)[1];
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A` && evt.target.parentElement.tagName !== `A`) {
        return;
      }

      const link = evt.target.tagName === `A` ? evt.target.href : evt.target.parentElement.href;

      handler(this._getFilterNameByLink(link));
    });
  }
}
