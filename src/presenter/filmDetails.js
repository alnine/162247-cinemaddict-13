import FilmDetailsView from "../view/film-details";
import {remove, render, RenderPosition, replace} from "../utils/render";

export default class FilmDetails {
  constructor(container, closeDetails, changeFilm) {
    this._container = container;
    this._closeDetails = closeDetails;
    this._changeFilm = changeFilm;

    this._filmDetailsComponent = null;

    this._handleOnCloseBtnClick = this._handleOnCloseBtnClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetailsView(this._film);

    this._filmDetailsComponent.setCloseClickHandler(this._handleOnCloseBtnClick);
    this._filmDetailsComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (this._prevFilmDetailsComponent === null) {
      render(this._container, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmDetailsComponent, this._prevFilmDetailsComponent);
    remove(this._prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _handleOnCloseBtnClick() {
    this._closeDetails();
  }

  _handleAddToWatchListClick() {
    this._changeFilm(Object.assign({}, this._film, {isWatchList: !this._film.isWatchList}));
  }

  _handleWatchedClick() {
    this._changeFilm(Object.assign({}, this._film, {isWatched: !this._film.isWatched}));
  }

  _handleFavoriteClick() {
    this._changeFilm(Object.assign({}, this._film, {isFavorite: !this._film.isFavorite}));
  }
}
