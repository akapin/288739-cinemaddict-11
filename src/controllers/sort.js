import SortingComponent from "../components/sorting.js";
import {SortType} from "../const.js";
import {render, replace} from "../utils/render.js";

export default class Sort {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeSortType = SortType.DEFAULT;
    this._sortingComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const sortTypes = Object.values(SortType).map((sortType) => {
      return {
        name: sortType,
        active: sortType === this._activeSortType,
      };
    });
    const oldComponent = this._sortingComponent;

    this._sortingComponent = new SortingComponent(sortTypes);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._sortingComponent, oldComponent);
    } else {
      render(container, this._sortingComponent);
    }
  }

  hide() {
    this._sortingComponent.hide();
  }

  show() {
    this._sortingComponent.show();
  }

  _onSortChange(sortType) {
    this._moviesModel.setSortType(sortType);
    this._activeSortType = sortType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange() {
    this._moviesModel.setSortType(SortType.DEFAULT);
    this._activeSortType = SortType.DEFAULT;
    this.render();
  }
}
