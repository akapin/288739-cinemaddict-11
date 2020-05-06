import AbstractComponent from "./abstract-component.js";

const createMainTemplate = () => `<main class="main"></main>`;

export default class Main extends AbstractComponent {
  getTemplate() {
    return createMainTemplate();
  }
}
