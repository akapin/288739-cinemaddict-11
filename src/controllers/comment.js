import CommentComponent from "../components/comment.js";
import {render, remove} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

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
    const commentElement = this._commentComponent.getElement();
    commentElement.querySelector(`.film-details__comment-delete`).disabled = true;
  }

  enableDeleteButton() {
    const commentElement = this._commentComponent.getElement();
    commentElement.querySelector(`.film-details__comment-delete`).disabled = false;
  }

  shake() {
    this._commentComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._commentComponent.getElement().style.animation = ``;
      this._commentComponent.setDeleteButtonText(`Delete`);
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
