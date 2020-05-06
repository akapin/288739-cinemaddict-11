import FilterController from "./filter.js";
import FiltersComponent from "../components/filters.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {FilterType} from "../const.js";
import {getMoviesByFilter} from "../utils/filter.js";

export default class FiltersController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._filtersComponent = null;

    this._activeFilterType = FilterType.ALL;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    this._filtersComponent = new FiltersComponent();

    const allMovies = this._moviesModel.getMoviesAll();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        active: filterType === this._activeFilterType,
      };
    });

    this._renderFilters(this._filtersComponent.getElement(), filters);

    this._filtersComponent.setFilterChangeHandler(this._onFilterChange);

    render(this._container, this._filtersComponent, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    remove(this._filtersComponent);
  }

  _renderFilters(container, filters) {
    return filters.map((filter) => {
      const filterController = new FilterController(container);
      filterController.render(filter);
      return filterController;
    });
  }

  _updateFilters() {
    this.destroy();
    this.render();
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this._updateFilters();
  }

  _onDataChange() {
    this._updateFilters();
  }
}
