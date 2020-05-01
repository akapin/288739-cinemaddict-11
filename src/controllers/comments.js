import CommentsSectionComponent from "../components/movie-comments-section.js";
import NewCommentFormComponent from "../components/new-comment-form.js";
import CommentController from "./comment.js";
import {render, remove} from "../utils/render.js";

export default class CommentsController {
  constructor(container, moviesModel, movie) {
    this._container = container;

    this._moviesModel = moviesModel;
    this._movie = movie;

    this._showedCommentControllers = [];
    this._commentsSectionComponent = null;
    this._newCommentFormComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
  }

  render() {
    const comments = this._moviesModel.getMovieComments(this._movie.id);

    this._commentsSectionComponent = new CommentsSectionComponent(comments.length);
    render(this._container, this._commentsSectionComponent);

    const commentControllers = this._renderComments(comments);
    this._showedCommentControllers = this._showedCommentControllers.concat(commentControllers);

    this._newCommentFormComponent = new NewCommentFormComponent();
    render(this._commentsSectionComponent.getElement(), this._newCommentFormComponent);
    document.addEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  destroy() {
    this._showedCommentControllers.forEach((commentController) => commentController.destroy());
    this._showedCommentControllers = [];
    remove(this._commentsSectionComponent);
    remove(this._newCommentFormComponent);
    document.removeEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  _renderComments(comments) {
    const commentListContainerElement = this._commentsSectionComponent.getElement().querySelector(`.film-details__comments-list`);
    return comments.map((comment) => {
      const commentController = new CommentController(commentListContainerElement, this._onDataChange);
      commentController.render(comment);
      return commentController;
    });
  }

  _updateComments() {
    this.destroy();
    this.render();
  }

  _onDataChange(oldData, newData) {
    if (!oldData) {
      this._moviesModel.addComment(this._movie, newData);
      this._updateComments();
    } else if (!newData) {
      this._moviesModel.removeComment(this._movie, oldData.id);
      this._updateComments();
    }
  }

  _onCtrlEnterKeyDown(evt) {
    const isCtrlEnterPressed = evt.ctrlKey && evt.key === `Enter`;

    if (!isCtrlEnterPressed) {
      return;
    }

    const data = this._newCommentFormComponent.getData();

    if (data.emoji && data.text) {
      this._onDataChange(null, data);
      this._newCommentFormComponent.reset();
    }
  }
}