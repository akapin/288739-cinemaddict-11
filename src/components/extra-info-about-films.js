import {createElement} from "../utils.js";
import {createFilmTemplate} from "../components/film.js";

const createExtraInfoAboutFilmsTemplate = (title, films, showingFilmsCount) => {
  const showingFilms = films.slice(0, showingFilmsCount);
  const filmsMarkup = showingFilms.map((it) => createFilmTemplate(it)).join(`\n`);
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">
        ${filmsMarkup}
      </div>
    </section>`
  );
};

export default class ExtraInfoAboutFilms {
  constructor(title, films, showingFilmsCount) {
    this._title = title;
    this._films = films;
    this._showingFilmsCount = showingFilmsCount;

    this._element = null;
  }

  getTemplate() {
    return createExtraInfoAboutFilmsTemplate(this._title, this._films, this._showingFilmsCount);
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
