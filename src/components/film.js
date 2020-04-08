export const createFilmTemplate = (film) => {
  const {title, rating, date, duration, genres, poster, description, comments, isInWatchlist, isWatched, isFavorite} = film;

  const year = date.getFullYear();
  const commentsQuantity = comments.length;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsQuantity} comments</a>
      <form class="film-card__controls">
        ${isInWatchlist ? `` : `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>`}
        ${isWatched ? `` : `<button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>`}
        ${isFavorite ? `` : `<button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>`}
      </form>
    </article>`
  );
};
