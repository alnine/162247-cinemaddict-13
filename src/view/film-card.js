import dayjs from "dayjs";
import {capitilizeString, createElement, getDurationString} from "../helpers";

const YEAR_FORMAT = `YYYY`;

const getShortDesc = (desc) => {
  const DESC_LENGTH = 140;
  return desc.length < DESC_LENGTH ? desc : `${desc.slice(0, DESC_LENGTH - 1)}&hellip;`;
};

export const createFilmCardTemplate = (film) => {
  const {
    title,
    totalRating,
    releaseDate,
    runtime,
    genres,
    posterUrl,
    desc,
    comments,
    isWatchList,
    isWatched,
    isFavorite,
  } = film;

  return `<article class="film-card">
    <h3 class="film-card__title">${capitilizeString(title)}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(releaseDate).format(YEAR_FORMAT)}</span>
      <span class="film-card__duration">${getDurationString(runtime)}</span>
      <span class="film-card__genre">${genres.join(`,`)}</span>
    </p>
    <img src=${posterUrl} alt="" class="film-card__poster">
    <p class="film-card__description">${getShortDesc(desc)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
      ${isWatchList ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
      ${isWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite
      ${isFavorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
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
