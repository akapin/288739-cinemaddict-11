import AbstractComponent from "./abstract-component.js";
import {getUserRank} from "../utils/common.js";


const createProfileTemplate = (watchedMoviesCount) => {
  const userRank = getUserRank(watchedMoviesCount);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(watchedMoviesCount) {
    super();

    this._watchedMoviesCount = watchedMoviesCount;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedMoviesCount);
  }
}
