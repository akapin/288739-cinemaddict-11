import NewCommentFormComponent from "../components/new-comment-form.js";
import CommentModel from "../models/comment.js";
import {render, remove} from "../utils/render.js";
import {Key} from "../const.js";
import {encode} from "he";

const EmptyComment = {
  "id": ``,
  "author": ``,
  "comment": ``,
  "date": ``,
  "emotion": ``,
};

export default class NewComment {
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

  disableForm() {
    this._newCommentFormComponent.disable();
  }

  enableForm() {
    this._newCommentFormComponent.enable();
  }

  showError() {
    this._newCommentFormComponent.showError();
  }

  hideError() {
    this._newCommentFormComponent.hideError();
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
