import dayjs from "dayjs";
import AbstractView from "./abstract";
import {capitilizeString, getDuration} from "../utils/common";

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

  const {hours, mins} = getDuration(runtime);
  const duration = `${hours}h ${mins}m`;

  return `<article class="film-card">
    <h3 class="film-card__title">${capitilizeString(title)}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(releaseDate).format(YEAR_FORMAT)}</span>
      <span class="film-card__duration">${duration}</span>
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

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._addToWatchClickHandler = this._addToWatchClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _getPosterElement() {
    return this.getElement().querySelector(`.film-card__poster`);
  }

  _getTitleElement() {
    return this.getElement().querySelector(`.film-card__title`);
  }

  _getCommentsElement() {
    return this.getElement().querySelector(`.film-card__comments`);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _addToWatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    const elements = [this._getPosterElement(), this._getTitleElement(), this._getCommentsElement()];

    elements.forEach((el) => {
      el.addEventListener(`click`, this._clickHandler);
    });
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._addToWatchClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }
}
