import AbstractSmartComponent from "./abstract-smart-component.js";
import {timeFromNow} from "../utils/common.js";

const DEFAULT_DELETE_BUTTON_TEXT = `Delete`;

const createCommentTemplate = (commentObj, deleteButtonText) => {
  const {emotion, comment, author, date} = commentObj;
  const formattedDate = timeFromNow(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ``}
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete">${deleteButtonText}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
    this._deleteButtonText = DEFAULT_DELETE_BUTTON_TEXT;
    this._deleteButtonClickHandler = null;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._deleteButtonText);
  }

  recoveryListeners() {
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  rerender() {
    super.rerender();
  }

  setDeleteButtonText(text) {
    this._deleteButtonText = text;
    this.rerender();
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }
}
