import FilterComponent from "../components/filter.js";
import {render, remove} from "../utils/render.js";

export default class Filter {
  constructor(container) {
    this._container = container;
    this._filterComponent = null;
  }

  render(filter) {
    this._filterComponent = new FilterComponent(filter);
    render(this._container, this._filterComponent);
  }

  destroy() {
    remove(this._filterComponent);
  }
}
