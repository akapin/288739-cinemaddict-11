import AbstractComponent from "./abstract-component.js";

const createCommentsSectionTemplate = (commentsCount) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
      <ul class="film-details__comments-list"></ul>
    </section>`
  );
};

export default class CommentsSection extends AbstractComponent {
  constructor(commentsCount = 0) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createCommentsSectionTemplate(this._commentsCount);
  }
}
