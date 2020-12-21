import FilmCardPresenter from "./filmCard";
import SortView from "../view/list-sort";
import FilmsView from "../view/films";
import NoFilmsView from "../view/no-films";
import FilmsListView from "../view/films-list";
import LoadMoreBtnView from "../view/load-more-btn";
import FilmDetailsView from "../view/film-details";
import {render, RenderPosition, remove} from "../utils/render";
import {updateItem} from "../utils/common";

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
    this._renderedFilmsCount = FILMS_PER_STEP;

    this._allFilmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._sortComponent = new SortView();
    this._filmsBoardComponent = new FilmsView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();

    this._filmDetailsComponent = null;
    this._allFilmsListComponent = null;
    this._topRatedListComponent = null;
    this._mostCommentedListComponent = null;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
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

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removeFilmDetails();
    }
  }

  _handleFilmChange(updateFilm) {
    this._films = updateItem(this._films, updateFilm);
    this._updatePresenters(updateFilm);
  }

  _updatePresenters(updateFilm) {
    if (this._allFilmCardPresenter[updateFilm.id]) {
      this._allFilmCardPresenter[updateFilm.id].init(updateFilm);
    }

    if (this._topRatedFilmCardPresenter[updateFilm.id]) {
      this._topRatedFilmCardPresenter[updateFilm.id].init(updateFilm);
    }

    if (this._mostCommentedFilmCardPresenter[updateFilm.id]) {
      this._mostCommentedFilmCardPresenter[updateFilm.id].init(updateFilm);
    }
  }

  _toggleOverlay() {
    this._root.classList.toggle(`hide-overflow`);
  }

  _setDocumentEscKeyDownListener() {
    document.addEventListener(`keydown`, this._handleEscKeyDown);
  }

  _unSetDocumentEscKeyDownListener() {
    document.removeEventListener(`keydown`, this._handleEscKeyDown);
  }

  _removeFilmDetails() {
    remove(this._filmDetailsComponent);
    this._filmDetailsComponent = null;
    this._toggleOverlay();
    this._unSetDocumentEscKeyDownListener();
  }

  _renderFilmDetails(film) {
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._filmDetailsComponent.setOnCloseClickHandler(() => this._removeFilmDetails());

    this._toggleOverlay();
    this._setDocumentEscKeyDownListener();

    render(this._root, this._filmDetailsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(film, dist) {
    const filmPresenter = new FilmCardPresenter(dist, this._renderFilmDetails.bind(this), this._handleFilmChange);
    filmPresenter.init(film);

    return filmPresenter;
  }

  _renderFilmList(list) {
    const listComponent = new FilmsListView(FilmsListSettings[list]);
    render(this._filmsBoardComponent, listComponent, RenderPosition.BEFOREEND);

    return listComponent;
  }

  _renderAllFilms(from, to) {
    if (!this._allFilmsListComponent) {
      this._allFilmsListComponent = this._renderFilmList(FilmsList.ALL);
    }

    this._films.slice(from, to).forEach((film) => {
      const presenter = this._renderFilmCard(film, this._allFilmsListComponent.getContainer());
      this._allFilmCardPresenter[film.id] = presenter;
    });
  }

  _renderTopRatedFilms() {
    if (!this._topRatedListComponent) {
      this._topRatedListComponent = this._renderFilmList(FilmsList.TOP_RATED);
    }

    this._films
      .filter((film) => film.totalRating)
      .sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((film) => {
        const presenter = this._renderFilmCard(film, this._topRatedListComponent.getContainer());
        this._topRatedFilmCardPresenter[film.id] = presenter;
      });
  }

  _renderMostCommentedFilms() {
    const filmsWithComments = this._films.filter((film) => film.comments.length > 0);

    if (filmsWithComments.length === 0) {
      return;
    }

    if (!this._mostCommentedListComponent) {
      this._mostCommentedListComponent = this._renderFilmList(FilmsList.MOST_COMMENTED);
    }

    filmsWithComments
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((film) => {
        const presenter = this._renderFilmCard(film, this._mostCommentedListComponent.getContainer());
        this._mostCommentedFilmCardPresenter[film.id] = presenter;
      });
  }

  _renderNoFilms() {
    render(this._filmsBoardComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreBtnClick() {
    this._renderAllFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_PER_STEP);
    this._renderedFilmsCount += FILMS_PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._allFilmsListComponent, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderFilms() {
    this._renderAllFilms(0, Math.min(this._films.length, FILMS_PER_STEP));

    if (this._films.length > FILMS_PER_STEP) {
      this._renderLoadMoreButton();
    }

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _clearFilms() {
    const presenters = [
      ...Object.values(this._allFilmCardPresenter),
      ...Object.values(this._topRatedFilmCardPresenter),
      ...Object.values(this._mostCommentedFilmCardPresenter),
    ];

    presenters.forEach((presenter) => presenter.destroy());

    this._allFilmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._renderedFilmsCount = FILMS_PER_STEP;
    remove(this._loadMoreBtnComponent);
  }

  _renderFilmsBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms();
  }
}
