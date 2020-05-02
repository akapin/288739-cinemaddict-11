import AbstractComponent from "./abstract-component.js";
import {timeFromNow} from "../utils/common.js";

const createCommentTemplate = (commentObj) => {
  const {emotion, comment, author, date} = commentObj;
  const formattedDate = timeFromNow(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${emotion ? `<img src="${emotion}" width="55" height="55" alt="emoji-smile">` : ``}
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
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
