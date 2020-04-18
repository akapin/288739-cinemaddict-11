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
      append(container, component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      append(container, component.getElement());
      break;
    default:
      append(container, component.getElement());
      break;
  }
};

export const append = (parent, element) => {
  parent.appendChild(element);
};

export const remove = (parent, element) => {
  parent.removeChild(element);
};
