import SortView from "../view/list-sort";
import FilmsView from "../view/films";
import NoFilmsView from "../view/no-films";
import FilmsListView from "../view/films-list";
import FilmCardView from "../view/film-card";
import LoadMoreBtnView from "../view/load-more-btn";
import FilmDetailsView from "../view/film-details";
import {render, RenderPosition, remove} from "../utils/render";

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

    this._filmDetailsComponent = null;
    this._allFilmsListComponent = null;
    this._topRatedListComponent = null;
    this._mostCommentedListComponent = null;
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

  _removeFilmDetails() {
    remove(this._filmDetailsComponent);
    this._filmDetailsComponent = null;
    this._root.classList.remove(`hide-overflow`);
  }

  _renderFilmDetails(film) {
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._filmDetailsComponent.setOnCloseClickHandler(() => this._removeFilmDetails());

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._removeFilmDetails();
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);
    this._root.classList.add(`hide-overflow`);

    render(this._root, this._filmDetailsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(film, dist) {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.setClickHandler(() => this._renderFilmDetails(film));

    render(dist, filmCardComponent, RenderPosition.BEFOREEND);
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

    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film, this._allFilmsListComponent.getContainer()));
  }

  _renderTopRatedFilms() {
    if (!this._topRatedListComponent) {
      this._topRatedListComponent = this._renderFilmList(FilmsList.TOP_RATED);
    }

    this._films
      .filter((film) => film.totalRating)
      .sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((film) => this._renderFilmCard(film, this._topRatedListComponent.getContainer()));
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
      .forEach((film) => this._renderFilmCard(film, this._mostCommentedListComponent.getContainer()));
  }

  _renderNoFilms() {
    render(this._filmsBoardComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    let renderedFilmCount = FILMS_PER_STEP;

    const loadMoreBtnComponent = new LoadMoreBtnView();
    render(this._allFilmsListComponent, loadMoreBtnComponent, RenderPosition.BEFOREEND);

    loadMoreBtnComponent.setClickHandler(() => {
      this._films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_PER_STEP)
        .forEach((film) => this._renderFilmCard(film, this._allFilmsListComponent.getContainer()));

      renderedFilmCount += FILMS_PER_STEP;

      if (renderedFilmCount >= this._films.length) {
        remove(loadMoreBtnComponent);
      }
    });
  }

  _renderFilms() {
    this._renderAllFilms(0, Math.min(this._films.length, FILMS_PER_STEP));

    if (this._films.length > FILMS_PER_STEP) {
      this._renderLoadMoreButton();
    }

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _renderFilmsBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms();
  }
}
