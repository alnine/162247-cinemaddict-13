import {capitilizeString, createElement} from "../helpers";

const RatingsName = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`,
};

const RATINGS = [
  {name: `NOVICE`, value: 1},
  {name: `FAN`, value: 11},
  {name: `MOVIE_BUFF`, value: 21},
];

const generateRating = (number) => {
  let rating = RatingsName[RATINGS[0].name];

  RATINGS.forEach(({name, value}) => {
    if (number >= value) {
      rating = RatingsName[name];
    }
  });

  return rating;
};

export const createProfileTemplate = (filmsNumber) => {
  const profileRating = capitilizeString(generateRating(filmsNumber));

  return `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile {
  constructor(filmsNumber) {
    this._element = null;
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsNumber);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
