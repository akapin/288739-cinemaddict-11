import AbstractComponent from "./abstract-component.js";

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

export default class Profile extends AbstractComponent {
  constructor(watchedFilmsCount) {
    super();

    this._watchedFilmsCount = watchedFilmsCount;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilmsCount);
  }
}
