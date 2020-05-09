import AbstractComponent from "./abstract-component.js";

const createFooterTemplate = () => {
  return (
    `<footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics"></section>
    </footer>`
  );
};

export default class Footer extends AbstractComponent {
  getTemplate() {
    return createFooterTemplate();
  }
}
