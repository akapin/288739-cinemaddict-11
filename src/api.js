const API = class {
  getMovies() {
    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`);
  }
};

export default API;
