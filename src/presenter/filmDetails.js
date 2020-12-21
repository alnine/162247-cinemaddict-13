import FilmDetailsView from "../view/film-details";
import {remove, render, RenderPosition, replace} from "../utils/render";

export default class FilmDetails {
  constructor(container, closeDetails) {
    this._container = container;
    this._closeDetails = closeDetails;

    this._filmDetailsComponent = null;

    this._handleOnCloseBtnClick = this._handleOnCloseBtnClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetailsView(this._film);
    this._filmDetailsComponent.setCloseClickHandler(this._handleOnCloseBtnClick);

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
}
