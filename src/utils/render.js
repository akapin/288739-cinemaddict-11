export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      append(container, component);
      break;
    case RenderPosition.BEFOREEND:
      append(container, component);
      break;
    default:
      append(container, component);
      break;
  }
};

export const append = (parent, component) => {
  parent.appendChild(component.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
