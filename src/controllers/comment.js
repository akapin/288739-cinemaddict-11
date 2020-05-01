import CommentComponent from "../components/movie-comment.js";
import {render, remove} from "../utils/render.js";

export default class CommentController {
  constructor(container, onDataChange) {
    this._container = container;
    this._commentComponent = null;
    this._onDataChange = onDataChange;
  }

  render(comment) {
    this._commentComponent = new CommentComponent(comment);
    this._commentComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(comment, null);
    });
    render(this._container, this._commentComponent);
  }

  destroy() {
    remove(this._commentComponent);
  }
}
