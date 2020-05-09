import AbstractComponent from "./abstract-component.js";

const createHeaderTemplate = () => {
  return (
    `<header class="header">
      <h1 class="header__logo logo">Cinemaddict</h1>
    </header>`
  );
};

export default class Header extends AbstractComponent {
  getTemplate() {
    return createHeaderTemplate();
  }
}
