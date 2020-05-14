import CommentComponent from "../components/comment.js";
import {render, remove} from "../utils/render.js";

export default class Comment {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._commentComponent = null;
  }

  render(comment) {
    this._commentComponent = new CommentComponent(comment);
    this._commentComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._commentComponent.setDeleteButtonText(`Deleting...`);
      this._onDataChange(this, comment, null);
    });
    render(this._container, this._commentComponent);
  }

  destroy() {
    remove(this._commentComponent);
  }

  disableDeleteButton() {
    this._commentComponent.disableDeleteButton();
  }

  enableDeleteButton() {
    this._commentComponent.enableDeleteButton();
  }

  showError() {
    this._commentComponent.shake();
  }
}
