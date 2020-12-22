import FilmCardView from "../view/film-card";
import {render, replace, remove, RenderPosition} from "../utils/render";

export default class FilmCard {
  constructor(container, openDetails, changeFilm) {
    this._container = container;
    this._openDetails = openDetails;
    this._changeFilm = changeFilm;

    this._filmCardComponent = null;

    this._handleOnFilmCardClick = this._handleOnFilmCardClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);

    this._filmCardComponent.setClickHandler(this._handleOnFilmCardClick);
    this._filmCardComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (this._prevFilmCardComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmCardComponent, this._prevFilmCardComponent);
    remove(this._prevFilmCardComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _handleOnFilmCardClick() {
    this._openDetails(this._film);
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
