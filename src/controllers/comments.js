import NewCommentController from "./new-comment.js";
import CommentController from "./comment.js";
import CommentsSectionComponent from "../components/movie-comments-section.js";
import ErrorComponent from "../components/error.js";
import {render, remove} from "../utils/render.js";

export default class CommentsController {
  constructor(container, moviesModel, movie, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movie = movie;
    this._api = api;

    this._showedCommentControllers = [];
    this._commentsSectionComponent = null;
    this._newCommentController = null;

    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {
    this._api.getComments(this._movie.id)
      .then((comments) => {
        this._commentsSectionComponent = new CommentsSectionComponent(comments.length);
        render(this._container, this._commentsSectionComponent);

        const commentControllers = this._renderComments(comments);
        this._showedCommentControllers = this._showedCommentControllers.concat(commentControllers);

        const commentsSectionElement = this._commentsSectionComponent.getElement();
        this._newCommentController = new NewCommentController(commentsSectionElement, this._onDataChange);
        this._newCommentController.render();
      })
      .catch(() => {
        const errorComponent = new ErrorComponent(`При загрузке комментариев произошла ошибка`);
        render(this._container, errorComponent);
      });
  }

  destroy() {
    this._showedCommentControllers.forEach((commentController) => commentController.destroy());
    this._showedCommentControllers = [];
    if (this._commentsSectionComponent) {
      remove(this._commentsSectionComponent);
    }
    if (this._newCommentController) {
      this._newCommentController.destroy();
    }
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

  _onDataChange(controller, oldData, newData) {
    if (!oldData) {
      controller.hideError();
      controller.disableForm();
      this._api.createComment(this._movie.id, newData)
        .then(() => this._updateComments())
        .catch(() => controller.showError())
        .finally(() => controller.enableForm());
    } else if (!newData) {
      controller.disableDeleteButton();
      this._api.deleteComment(oldData.id)
        .then(() => this._updateComments())
        .catch(() => controller.shake())
        .finally(() => controller.enableDeleteButton());
    }
  }
}
