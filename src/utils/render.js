export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      append(container, element);
      break;
    case RenderPosition.BEFOREEND:
      append(container, element);
      break;
    default:
      append(container, element);
      break;
  }
};

export const append = (parent, element) => {
  parent.appendChild(element);
};
