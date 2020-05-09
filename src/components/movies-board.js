import AbstractComponent from "./abstract-component.js";

const createMoviesBoardTemplate = () => `<section class="films"></section>`;

export default class MoviesBoard extends AbstractComponent {
  getTemplate() {
    return createMoviesBoardTemplate();
  }
}
