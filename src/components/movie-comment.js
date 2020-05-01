import AbstractComponent from "./abstract-component.js";
import {timeFromNow} from "../utils/common.js";

const createCommentTemplate = (comment) => {
  const {emoji, text, author, date} = comment;
  const formattedDate = timeFromNow(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${emoji ? `<img src="${emoji}" width="55" height="55" alt="emoji-smile">` : ``}
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, handler);
  }
}
