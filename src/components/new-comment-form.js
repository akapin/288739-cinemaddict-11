import AbstractComponent from "./abstract-component.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

const createNewCommentFormTemplate = (newComment) => {
  const {emotion, comment} = newComment;
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">` : ``}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
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

  disable() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = true;

    const emotionInputs = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    for (const emotionInput of emotionInputs) {
      emotionInput.disabled = true;
    }
  }

  enable() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = false;

    const emotionInputs = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    for (const emotionInput of emotionInputs) {
      emotionInput.disabled = false;
    }
  }

  showError() {
    this._showErrorOutline();
    this._shake();
  }

  hideError() {
    this.getElement().querySelector(`.film-details__comment-input`).style.border = `none`;
  }

  _showErrorOutline() {
    this.getElement().querySelector(`.film-details__comment-input`).style.border = `solid red 2px`;
  }

  _shake() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
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
