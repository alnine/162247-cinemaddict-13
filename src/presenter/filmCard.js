import FilmCardView from "../view/film-card";
import {render, RenderPosition} from "../utils/render";

export default class FilmCard {
  constructor(container) {
    this._container = container;
    this._callback = {};

    this._filmCardComponent = null;

    this._handleOnFilmCardClick = this._handleOnFilmCardClick.bind(this);
  }

  init(film, onClick) {
    this._film = film;
    this._callback.onClick = onClick;
    this._filmCardComponent = new FilmCardView(this._film);
    this._filmCardComponent.setClickHandler(this._handleOnFilmCardClick);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _handleOnFilmCardClick() {
    this._callback.onClick(this._film);
  }
}
