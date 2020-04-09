export const createProfileTemplate = (watchedFilmsCount) => {
  let rank = ``;
  if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    rank = `Novice`;
  } else if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    rank = `Fan`;
  } else if (watchedFilmsCount >= 21) {
    rank = `Movie Buff`;
  } else {
    rank = ``;
  }
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
