import NewCommentFormComponent from "../components/new-comment-form.js";
import CommentModel from "../models/comment.js";
import {render, remove} from "../utils/render.js";
import {Key} from "../const.js";
import {encode} from "he";

const SHAKE_ANIMATION_TIMEOUT = 600;

const EmptyComment = {
  "id": ``,
  "author": ``,
  "comment": ``,
  "date": ``,
  "emotion": ``,
};

export default class NewCommentController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._newCommentFormComponent = null;
    this._commentModel = new CommentModel(EmptyComment);

    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
  }

  render() {
    this._newCommentFormComponent = new NewCommentFormComponent(this._commentModel);
    render(this._container, this._newCommentFormComponent);

    this._newCommentFormComponent.setChangeInputFieldHandler((evt) => {
      this._commentModel.setText(encode(evt.target.value));
    });

    this._newCommentFormComponent.setChangeEmojiHandler((evt) => {
      this._commentModel.setEmotion(evt.target.value);
      this._updateForm();
    });

    document.addEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  destroy() {
    remove(this._newCommentFormComponent);
    document.removeEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  shake() {
    this._newCommentFormComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._newCommentFormComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  showErrorOutline() {
    const formElement = this._newCommentFormComponent.getElement();
    formElement.querySelector(`.film-details__comment-input`).style.border = `solid red 2px`;
  }

  disableForm() {
    const formElement = this._newCommentFormComponent.getElement();
    formElement.querySelector(`.film-details__comment-input`).disabled = true;

    const emotionInputs = formElement.querySelectorAll(`.film-details__emoji-item`);

    for (let i = 0; i < emotionInputs.length; i++) {
      emotionInputs[i].disabled = true;
    }
  }

  enableForm() {
    const formElement = this._newCommentFormComponent.getElement();
    formElement.querySelector(`.film-details__comment-input`).disabled = false;

    const emotionInputs = formElement.querySelectorAll(`.film-details__emoji-item`);

    for (let i = 0; i < emotionInputs.length; i++) {
      emotionInputs[i].disabled = false;
    }
  }

  showError() {
    this.showErrorOutline();
    this.shake();
  }

  hideError() {
    const formElement = this._newCommentFormComponent.getElement();
    formElement.querySelector(`.film-details__comment-input`).style.border = `none`;
  }

  _updateForm() {
    this.destroy();
    this.render();
  }

  _onCtrlEnterKeyDown(evt) {
    const isCtrlEnterPressed = evt.ctrlKey && evt.key === Key.ENTER;

    if (!isCtrlEnterPressed) {
      return;
    }

    this._newCommentFormComponent.submitInputText();

    this._commentModel.setDate(new Date());

    const text = this._commentModel.getText();
    const emotion = this._commentModel.getEmotion();

    if (text && emotion) {
      this._onDataChange(this, null, this._commentModel);
    }
  }
}
