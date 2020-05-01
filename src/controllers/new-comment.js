import NewCommentFormComponent from "../components/new-comment-form.js";
import {render, remove} from "../utils/render.js";
import {Key} from "../const.js";
import NewCommentModel from "../models/new-comment.js";
import {encode} from "he";

export default class NewCommentController {
  constructor(container, onDataChange) {
    this._container = container;

    this._newCommentFormComponent = null;
    this._newCommentModel = new NewCommentModel();

    this._onDataChange = onDataChange;
    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
  }

  render() {
    const newComment = this._newCommentModel.get();
    this._newCommentFormComponent = new NewCommentFormComponent(newComment);
    render(this._container, this._newCommentFormComponent);

    this._newCommentFormComponent.setChangeInputFieldHandler((evt) => {
      this._newCommentModel.setText(encode(evt.target.value));
    });

    this._newCommentFormComponent.setChangeEmojiHandler((evt) => {
      this._newCommentModel.setEmoji(evt.target.value);
      this._updateForm();
    });

    document.addEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  destroy() {
    remove(this._newCommentFormComponent);
    document.removeEventListener(`keydown`, this._onCtrlEnterKeyDown);
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
    const newComment = this._newCommentModel.get();

    if (newComment.emoji && newComment.text) {
      this._onDataChange(null, newComment);
    }
  }
}
