import AbstractSmartComponent from "./abstract-smart-component.js";
import {encode} from "he";

const createNewCommentFormTemplate = (newComment) => {
  const {emoji, text} = newComment;
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">` : ``}
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

export default class NewCommentForm extends AbstractSmartComponent {
  constructor() {
    super();

    this._newComment = {
      text: ``,
      emoji: ``,
      author: ``,
      date: null,
    };

    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._newComment = {
      text: ``,
      emoji: ``,
      author: ``,
      date: null,
    };

    this.rerender();
  }

  getTemplate() {
    return createNewCommentFormTemplate(this._newComment);
  }

  getData() {
    const image = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    const imageSrc = image ? image.src : ``;
    const inputValue = this.getElement().querySelector(`.film-details__comment-input`).value;

    return {
      id: String(new Date() + Math.random()),
      text: inputValue,
      emoji: imageSrc,
      author: `Me`,
      date: new Date(),
    };
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__comment-input`)
      .addEventListener(`change`, (evt) => {
        this._newComment.text = encode(evt.target.value);
      });

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`input`, (evt) => {
        this._newComment.emoji = evt.target.value;
        this.rerender();
      });
  }
}
