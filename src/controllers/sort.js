import SortingComponent from "../components/sorting.js";
import {SortType} from "../const.js";
import {render, replace} from "../utils/render.js";

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeSortType = SortType.DEFAULT;
    this._sortingComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
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

  _onSortChange(sortType) {
    this._moviesModel.setSortType(sortType);
    this._activeSortType = sortType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
