import AbstractComponent from "./abstract-component.js";

const createErrorTemplate = (errorText) => {
  return (
    `${errorText}`
  );
};

export default class Loading extends AbstractComponent {
  constructor(errorText) {
    super();
    this._errorText = errorText;
  }

  getTemplate() {
    return createErrorTemplate(this._errorText);
  }
}
