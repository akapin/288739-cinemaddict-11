import AbstractComponent from "./abstract-component.js";

const createSortTypeMarkup = (sortType) => {
  const {name, active} = sortType;
  return (
    `<li><a href="#" data-sort-type="${name}" class="sort__button ${active ? `sort__button--active` : ``}">
      Sort by ${name}
    </a></li>`
  );
};

const createSortTypesTemplate = (sortTypes) => {
  const sortTypesMarkup = sortTypes.map((it) => createSortTypeMarkup(it)).join(`\n`);

  return (
    `<ul class="sort">
      ${sortTypesMarkup}
    </ul>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor(sortTypes) {
    super();

    this._sortTypes = sortTypes;
  }

  getTemplate() {
    return createSortTypesTemplate(this._sortTypes);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      handler(evt.target.dataset.sortType);
    });
  }
}
