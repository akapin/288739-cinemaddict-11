import {createElement} from "../utils.js";

const getUserRank = (watchedFilmsCount) => {
  if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    return `Novice`;
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return `Fan`;
  } else if (watchedFilmsCount >= 21) {
    return `Movie Buff`;
  }
  return ``;
};

const createProfileTemplate = (watchedFilmsCount) => {
  const userRank = getUserRank(watchedFilmsCount);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(watchedFilmsCount) {
    this._watchedFilmsCount = watchedFilmsCount;

    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
