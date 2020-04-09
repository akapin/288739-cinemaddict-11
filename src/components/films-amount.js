export const createFilmsAmountTemplate = (filmsAmount) => {
  return (
    `<p>${filmsAmount.toLocaleString(`ru-RU`)} movies inside</p>`
  );
};
