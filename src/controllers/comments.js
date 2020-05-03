import API from "../api.js";
import CommentsSectionComponent from "../components/movie-comments-section.js";
import NewCommentController from "../controllers/new-comment.js";
import CommentController from "./comment.js";
import ErrorComponent from "../components/error.js";
import {render, remove} from "../utils/render.js";

export default class CommentsController {
  constructor(container, moviesModel, movie) {
    this._container = container;

    this._moviesModel = moviesModel;
    this._movie = movie;

    this._showedCommentControllers = [];
    this._commentsSectionComponent = null;
    this._newCommentController = null;

    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {
    this._getComments(this._movie.id)
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
    remove(this._commentsSectionComponent);
    this._newCommentController.destroy();
  }

  _getComments(movieId) {
    const api = new API();
    return api.getComments(movieId);
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
}
