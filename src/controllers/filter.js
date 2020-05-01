import MainNavigationComponent from "../components/main-navigation.js";
import {FilterType} from "../const.js";
import {render, replace} from "../utils/render.js";
import {getMoviesByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._mainNavigationComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        active: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._mainNavigationComponent;

    this._mainNavigationComponent = new MainNavigationComponent(filters);
    this._mainNavigationComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._mainNavigationComponent, oldComponent);
    } else {
      render(container, this._mainNavigationComponent);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
