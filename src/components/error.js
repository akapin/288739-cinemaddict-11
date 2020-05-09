import AbstractComponent from "./abstract-component.js";

const createErrorTemplate = (errorText) => `${errorText}`;

export default class Error extends AbstractComponent {
  constructor(errorText) {
    super();
    this._errorText = errorText;
  }

  getTemplate() {
    return createErrorTemplate(this._errorText);
  }
}
