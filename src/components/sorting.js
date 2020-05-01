import AbstractSmartComponent from "./abstract-smart-component.js";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const createSortingTemplate = (activeSortType) => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${activeSortType === SortType.DEFAULT ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${activeSortType === SortType.DATE ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${activeSortType === SortType.RATING ? `sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._sortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortingTemplate(this._currentSortType);
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  getSortType() {
    return this._currentSortType;
  }

  reset() {
    this._currentSortType = SortType.DEFAULT;
    this.rerender();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
      this.rerender();
    });

    this._sortTypeChangeHandler = handler;
  }
}
