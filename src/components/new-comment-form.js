import AbstractComponent from "./abstract-component.js";

const createNewCommentFormTemplate = (newComment) => {
  const {emoji, text} = newComment;
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${emoji ? `<img src="${emoji}" width="55" height="55" alt="emoji-smile">` : ``}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`
  );
};

export default class NewCommentForm extends AbstractComponent {
  constructor(newComment) {
    super();
    this._newComment = newComment;
  }

  getTemplate() {
    return createNewCommentFormTemplate(this._newComment);
  }

  submitInputText() {
    const inputElement = this.getElement().querySelector(`.film-details__comment-input`);
    inputElement.dispatchEvent(new Event(`change`));
  }

  setChangeInputFieldHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`change`, handler);
  }

  setChangeEmojiHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`input`, handler);
  }
}
