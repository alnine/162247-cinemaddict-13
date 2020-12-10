import AbstractView from "./abstract";
import {capitilizeString} from "../helpers";

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

const createProfileTemplate = (filmsNumber) => {
  const profileRating = capitilizeString(generateRating(filmsNumber));

  return `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile extends AbstractView {
  constructor(filmsNumber) {
    super();
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsNumber);
  }
}
