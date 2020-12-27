import dayjs from "dayjs";
import AbstractView from "./abstract";
import {createCommentTemplate} from "./comment-item";
import {capitilizeString, getDurationString} from "../utils/common";
import {NAMES} from "../mock/constants";
import {getRandomInteger} from "../mock/helpers";

const DEFAULT_LOCAL_COMMENT = {
  comment: ``,
  emoji: null,
};

const generateGenreList = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join();
};

const createFilmDetailsTemplate = (film) => {
  const {
    title,
    originalTitle,
    totalRating,
    releaseDate,
    runtime,
    genres,
    posterUrl,
    ageRating,
    desc,
    comments,
    localComment,
    director,
    writers,
    actors,
    country,
    isWatchList,
    isWatched,
    isFavorite,
  } = film;

  const {comment, emoji} = localComment;

  const commentsList = comments
    .sort((a, b) => {
      const date1 = dayjs(a.date);
      const date2 = dayjs(b.date);

      return date1.diff(date2);
    })
    .map(createCommentTemplate)
    .join(``);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${posterUrl} alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${capitilizeString(title)}</h3>
                <p class="film-details__title-original">Original: ${capitilizeString(originalTitle)}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`,`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`,`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dayjs(releaseDate).format(`D MMMM YYYY`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getDurationString(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${generateGenreList(genres)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${desc}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${
            isWatchList ? `checked` : ``
          }>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${
            isWatched ? `checked` : ``
          }>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${
            isFavorite ? `checked` : ``
          }>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments <span class="film-details__comments-count">${comments.length}</span>
          </h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}" />` : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${
                emoji === `smile` ? `checked` : ``
              }>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${
                emoji === `sleeping` ? `checked` : ``
              }>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${
                emoji === `puke` ? `checked` : ``
              }>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry"  ${
                emoji === `angry` ? `checked` : ``
              }>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._data = FilmDetails.parseFilmToData(film);

    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._addToWatchClickHandler = this._addToWatchClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeCommentEmojiHandler = this._changeCommentEmojiHandler.bind(this);
    this._inputCommentHandler = this._inputCommentHandler.bind(this);

    this._setInnerHandlers();
  }

  static parseFilmToData(film) {
    return Object.assign({}, film, {
      localComment: DEFAULT_LOCAL_COMMENT,
    });
  }

  static parseDataToFilm(data) {
    const film = Object.assign({}, data);

    const {emoji, comment} = this._data.localComment;
    const newComment = {
      emoji,
      text: comment,
      author: NAMES[getRandomInteger(0, NAMES.length - 1)],
      date: dayjs().toDate(),
    };

    film.comments = [...film.comments, newComment];
    delete film.localComment;

    return film;
  }

  updateData(update, justDataUpdating = false) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const prevElementScrollTop = prevElement.scrollTop;
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTo(0, prevElementScrollTop);
    this.restoreHandlers();
  }

  _getCloseBtnElement() {
    return this.getElement().querySelector(`.film-details__close-btn`);
  }

  _getFormElement() {
    return this.getElement().querySelector(`form`);
  }

  _changeCommentEmojiHandler(evt) {
    evt.preventDefault();

    this.updateData({
      localComment: Object.assign({}, this._data.localComment, {emoji: evt.target.value}),
    });
  }

  _inputCommentHandler(evt) {
    evt.preventDefault();

    this.updateData(
      {
        localComment: Object.assign({}, this._data.localComment, {comment: evt.target.value}),
      },
      true
    );
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.onCloseClick();
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

  _formSubmitHandler(evt) {
    evt.preventDefault();

    const {comment, emoji} = this._data.localComment;
    if (!comment || !emoji) {
      return;
    }

    this._callback.formSubmit(FilmDetails.parseDataToFilm(this._data));
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.film-details__emoji-item`)
      .forEach((item) => item.addEventListener(`change`, this._changeCommentEmojiHandler));

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._inputCommentHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.onCloseClick);
    this.setAddToWatchListClickHandler(this._callback.addToWatchClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this._getFormElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.onCloseClick = callback;
    const closeBtnElement = this._getCloseBtnElement();
    closeBtnElement.addEventListener(`click`, this._closeBtnClickHandler);
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._addToWatchClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
