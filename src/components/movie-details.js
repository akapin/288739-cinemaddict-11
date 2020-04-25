import AbstractSmartComponent from "./abstract-smart-component.js";
import {formatDateTime, formatDuration, timeFromNow, DateTimeFormat} from "../utils/common.js";

const createButtonMarkup = (name, text, isChecked = true) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
    <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${text}</label>`
  );
};

const createGenresMarkup = (genres) => {
  return genres
    .map((genre) => {
      return (`<span class="film-details__genre">${genre}</span>`);
    })
    .join(`\n`);
};

const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      const {emoji, text, author, date} = comment;
      const formattedDate = timeFromNow(date);

      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${emoji}" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formattedDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
      );
    })
    .join(`\n`);
};

const createMovieDetailsTemplate = (movie, options = {}) => {
  const {
    poster, title, originTitle, rating, date, duration, genres, country,
    director, screenwriters, actors, ageRating, description, comments,
    isInWatchlist, isWatched, isFavorite
  } = movie;

  const {newComment} = options;

  const formattedDate = formatDateTime(date, DateTimeFormat.DATE);
  const formattedDuration = formatDuration(duration);
  const commentsCount = comments.length;

  const genresMarkup = createGenresMarkup(genres);
  const commentsMarkup = createCommentsMarkup(comments);

  const addToWatchlistButton = createButtonMarkup(`watchlist`, `Add to watchlist`, isInWatchlist);
  const alreadyWatchedtButton = createButtonMarkup(`watched`, `Already watched`, isWatched);
  const addToFavoritesButton = createButtonMarkup(`favorite`, `Add to favorites`, isFavorite);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriters.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formattedDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genres.length > 1 ? `s` : ``}</td>
                  <td class="film-details__cell">
                    ${genresMarkup}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${addToWatchlistButton}
            ${alreadyWatchedtButton}
            ${addToFavoritesButton}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${ newComment.emoji ? `<img src="images/emoji/${newComment.emoji}.png" width="55" height="55" alt="emoji-smile">` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class MovieDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._movie = movie;

    this._newComment = {
      text: ``,
      emoji: ``,
      author: ``,
      date: null,
    };

    this._movieDetailsCloseButtonClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createMovieDetailsTemplate(this._movie, {
      newComment: this._newComment,
    });
  }

  recoveryListeners() {
    this.setMovieDetailsCloseButtonClickHandler(this._movieDetailsCloseButtonClickHandler);
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

  setMovieDetailsCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._movieDetailsCloseButtonClickHandler = handler;
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._newComment.emoji = evt.target.value;
        this.rerender();
      });
  }
}
