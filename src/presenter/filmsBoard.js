import FilmCardPresenter from "./filmCard";
import FilmDetailsPresenter from "./filmDetails";
import SortView from "../view/list-sort";
import FilmsView from "../view/films";
import NoFilmsView from "../view/no-films";
import FilmsListView from "../view/films-list";
import LoadMoreBtnView from "../view/load-more-btn";
import {render, RenderPosition, remove} from "../utils/render";
import {updateItem} from "../utils/common";
import {sortFilmDateDown, sortFilmRatingDown} from "../utils/films";
import {SortTypes} from "../constants";

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
  constructor(root, container, filmsModel) {
    this._root = root;
    this._container = container;
    this._filmsModel = filmsModel;
    this._renderedFilmsCount = FILMS_PER_STEP;
    this._currentSortType = SortTypes.DEFAULT;

    this._allFilmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._filmsBoardComponent = new FilmsView();
    this._noFilmsComponent = new NoFilmsView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();

    this._filmDetailsPresenter = null;

    this._sortComponent = null;
    this._allFilmsListComponent = null;
    this._topRatedListComponent = null;
    this._mostCommentedListComponent = null;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleCloseFilmDetails = this._handleCloseFilmDetails.bind(this);
    this._renderFilmDetails = this._renderFilmDetails.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderFilmsBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortTypes.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmDateDown);
      case SortTypes.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmRatingDown);
    }

    return this._filmsModel.getFilms().slice();
  }

  _renderSort() {
    if (this._getFilms().length === 0) {
      return;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeClickHandler(this._handleSortTypeChange);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsBoardContainer() {
    render(this._container, this._filmsBoardComponent, RenderPosition.BEFOREEND);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._handleCloseFilmDetails();
    }
  }

  _handleFilmChange(updateFilm) {
    this._films = updateItem(this._films, updateFilm);
    this._updatePresenters(updateFilm);
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilms();
    this._renderFilmsBoard();
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

    if (this._filmDetailsPresenter) {
      this._filmDetailsPresenter.init(updateFilm);
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

  _handleCloseFilmDetails() {
    this._filmDetailsPresenter.destroy();
    this._filmDetailsPresenter = null;
    this._toggleOverlay();
    this._unSetDocumentEscKeyDownListener();
  }

  _renderFilmDetails(film) {
    if (this._filmDetailsPresenter !== null) {
      this._handleCloseFilmDetails();
    }

    this._filmDetailsPresenter = new FilmDetailsPresenter(
      this._root,
      this._handleCloseFilmDetails,
      this._handleFilmChange
    );

    this._filmDetailsPresenter.init(film);

    this._toggleOverlay();
    this._setDocumentEscKeyDownListener();
  }

  _renderFilmCard(film, dist) {
    const filmPresenter = new FilmCardPresenter(dist, this._renderFilmDetails, this._handleFilmChange);
    filmPresenter.init(film);

    return filmPresenter;
  }

  _renderFilmList(list) {
    const listComponent = new FilmsListView(FilmsListSettings[list]);
    render(this._filmsBoardComponent, listComponent, RenderPosition.BEFOREEND);

    return listComponent;
  }

  _renderAllFilms(films) {
    if (!this._allFilmsListComponent) {
      this._allFilmsListComponent = this._renderFilmList(FilmsList.ALL);
    }

    films.forEach((film) => {
      const presenter = this._renderFilmCard(film, this._allFilmsListComponent.getContainer());
      this._allFilmCardPresenter[film.id] = presenter;
    });
  }

  _renderTopRatedFilms() {
    if (!this._topRatedListComponent) {
      this._topRatedListComponent = this._renderFilmList(FilmsList.TOP_RATED);
    }

    this._getFilms()
      .filter((film) => film.totalRating)
      .sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((film) => {
        const presenter = this._renderFilmCard(film, this._topRatedListComponent.getContainer());
        this._topRatedFilmCardPresenter[film.id] = presenter;
      });
  }

  _renderMostCommentedFilms() {
    const filmsWithComments = this._getFilms().filter((film) => film.comments.length > 0);

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
    const filmsCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmCount);

    this._renderAllFilms(films);
    this._renderedFilmsCount = newRenderedFilmCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._loadMoreBtnComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._allFilmsListComponent, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);
    this._loadMoreBtnComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _renderFilms() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_PER_STEP));
    this._renderAllFilms(films);

    if (filmCount > FILMS_PER_STEP) {
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

    remove(this._sortComponent);
    remove(this._loadMoreBtnComponent);

    this._sortComponent = null;
  }

  _renderFilmsBoard() {
    this._renderSort();
    this._renderFilmsBoardContainer();

    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms();
  }
}
