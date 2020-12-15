import SortView from "../view/list-sort";
import FilmsView from "../view/films";
import NoFilmsView from "../view/no-films";
import FilmsListView from "../view/films-list";
import FilmsListContainerView from "../view/films-list-container";
import FilmCardView from "./view/film-card";
import LoadMoreBtnView from "./view/load-more-btn";
import FilmDetailsView from "./view/film-details";
import {render, RenderPosition} from "../utils/render";

const FILMS_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const FilmsList = {
  ALL: `ALL`,
  TOP_RATED: `TOP_RATED`,
  MOST_COMMENTED: `MOST_COMMENTED`,
};

const FilmsListSettings = {
  ALL: {title: `All movies. Upcoming`, isExtra: false, isTitleHidden: true},
  TOP_RATED: {title: `Top rated`, isExtra: true, isTitleHidden: false},
  MOST_COMMENTED: {title: `Most commented`, isExtra: true, isTitleHidden: false},
};

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

    this._renderSort();
    render(this._container, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    this._renderFilmsBoard();
  }

  _renderSort() {
    if (this._films.length === 0) {
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(dist, film) {}

  _renderFilmsToList(films, list, from, to) {
    const listComponent = new FilmsListView(...FilmsListSettings[list]);
    const filmsContainer = new FilmsListContainerView();

    render(this._filmsBoardComponent, listComponent, RenderPosition.BEFOREEND);
    render(listComponent, filmsContainer, RenderPosition.BEFOREEND);

    this._films.slice(from, to).forEach((film) => this._renderFilmCard(filmsContainer, film));
  }

  _renderAllFilms() {
    const FROM = 0;
    const filmsCount = Math.min(this._films.length, FILMS_PER_STEP);

    this._renderFilmsToList(this._films, FilmsList.ALL, FROM, filmsCount);
  }

  _renderTopRatedFilms() {
    const FROM = 0;
    const topRatedFilms = this._films.filter((film) => film.totalRating).sort((a, b) => b.totalRating - a.totalRating);

    if (topRatedFilms.length === 0) {
      return;
    }

    this._renderFilmsToList(topRatedFilms, FilmsList.TOP_RATED, FROM, EXTRA_FILM_COUNT);
  }

  _renderMostCommentedFilms() {
    const FROM = 0;
    const mostCommentedFilms = this._films
      .filter((film) => film.comments.length !== 0)
      .sort((a, b) => b.comments.length - a.comments.length);

    if (mostCommentedFilms.length === 0) {
      return;
    }

    this._renderFilmsToList(mostCommentedFilms, FilmsList.MOST_COMMENTED, FROM, EXTRA_FILM_COUNT);
  }

  _renderNoFilms() {
    render(this._filmsBoardComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {}

  _renderFilmsBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderAllFilms();

    if (this._films.length > FILMS_PER_STEP) {
      this._renderLoadMoreButton();
    }

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }
}
