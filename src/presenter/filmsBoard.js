import SortView from "../view/list-sort";
import FilmsView from "../view/films";
import NoFilmsView from "../view/no-films";
import FilmsListView from "../view/films-list";
import FilmsListContainerView from "../view/films-list-container";
import FilmCardView from "./view/film-card";
import LoadMoreBtnView from "./view/load-more-btn";
import FilmDetailsView from "./view/film-details";
import {render, RenderPosition} from "../utils/render";

export default class FilmsBoard {
  constructor(root, container) {
    this._root = root;
    this._container = container;

    this._sortComponent = new SortView();
    this._filmsBoardComponent = new FilmsView();
    this._noFilmsComponent = new NoFilmsView();
  }

  init(films) {
    this._films = films.slice();
  }

  _renderSort() {}

  _renderFilmCard() {}

  _renderFilmCards() {}

  _renderNoFilms() {}

  _renderLoadMoreButton() {}

  _renderBoard() {}
}