import {FilterType} from "../const.js";

export const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isInWatchlist);
};

export const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

export const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.WATCHED:
      return getWatchedMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
    default:
      return movies;
  }
};
