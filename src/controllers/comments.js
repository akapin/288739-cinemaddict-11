import NewCommentController from "./new-comment.js";
import CommentController from "./comment.js";
import CommentsSectionComponent from "../components/comments-section.js";
import ErrorComponent from "../components/error.js";
import {render, remove} from "../utils/render.js";
import MovieModel from "../models/movie.js";

export default class Comments {
  constructor(container, moviesModel, movie, api, movieController, onMovieDataChange) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movie = movie;
    this._api = api;
    this._movieController = movieController;
    this._onMovieDataChange = onMovieDataChange;

    this._showedCommentControllers = [];
    this._commentsSectionComponent = null;
    this._newCommentController = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onOnline = this._onOnline.bind(this);
    this._onOffline = this._onOffline.bind(this);
  }

  render() {
    this._commentsSectionComponent = new CommentsSectionComponent();

    this._api.getComments(this._movie.id)
      .then((comments) => {
        if (!this._commentsSectionComponent) {
          return;
        }

        this._commentsSectionComponent = new CommentsSectionComponent(comments.length);
        render(this._container, this._commentsSectionComponent);

        const commentControllers = this._renderComments(comments);
        this._showedCommentControllers = this._showedCommentControllers.concat(commentControllers);

        const commentsSectionElement = this._commentsSectionComponent.getElement();
        this._newCommentController = new NewCommentController(commentsSectionElement, this._onDataChange);
        this._newCommentController.render();

        window.addEventListener(`online`, this._onOnline);
        window.addEventListener(`offline`, this._onOffline);
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
    this._commentsSectionComponent = null;

    if (this._newCommentController) {
      this._newCommentController.destroy();
    }
    window.removeEventListener(`online`, this._onOnline);
    window.removeEventListener(`offline`, this._onOffline);
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
        .then((newMovie) => {
          this._onMovieDataChange(this._movieController, this._movie, newMovie);
          this.destroy();
        })
        .catch(() => controller.showError())
        .finally(() => controller.enableForm());
    } else if (!newData) {
      controller.disableDeleteButton();
      this._api.deleteComment(oldData.id)
        .then(() => {
          const newComments = this._movie.comments.filter((it) => it.id !== oldData.id);
          const newMovie = MovieModel.clone(this._movie);
          newMovie.comments = newComments;

          this._onMovieDataChange(this._movieController, this._movie, newMovie);
          this.destroy();
        })
        .catch(() => controller.showError())
        .finally(() => controller.enableDeleteButton());
    }
  }

  _onOnline() {
    this._newCommentController.enableForm();
    this._showedCommentControllers.forEach((commentController) => commentController.enableDeleteButton());
  }

  _onOffline() {
    this._newCommentController.disableForm();
    this._showedCommentControllers.forEach((commentController) => commentController.disableDeleteButton());
  }
}
