import {createFilmTemplate} from "../components/film.js";

export const createExtraInfoAboutFilmsTemplate = (title, films, showingFilmsCount) => {
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
