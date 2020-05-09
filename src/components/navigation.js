import AbstractComponent from "./abstract-component.js";

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createNavigationTemplate();
  }

  setStatsLinkClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `A` && evt.target.href.includes(`#stats`)) {
        handler();
      }
    });
  }
}
