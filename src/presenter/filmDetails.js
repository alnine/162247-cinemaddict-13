import FilmDetailsView from "../view/film-details";
import {remove, render, RenderPosition, replace} from "../utils/render";
import {UserAction, UpdateType} from "../constants";

export default class FilmDetails {
  constructor(container, filmId, api, getFilmById, closeDetails, changeFilm) {
    this._container = container;
    this._filmId = filmId;
    this._api = api;
    this._getFilmById = getFilmById;
    this._closeDetails = closeDetails;
    this._changeFilm = changeFilm;

    this._filmDetailsComponent = null;

    this._handleOnCloseBtnClick = this._handleOnCloseBtnClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
  }

  init() {
    const film = this._getFilmById(this._filmId);

    if (!film) {
      this._closeDetails();
    }

    this._api
      .getComments(this._filmId)
      .then((comments) => Object.assign({}, film, {comments}))
      .then((filmWithComments) => {
        this._film = filmWithComments;
        this._renderFilmDetails();
      })
      .catch(() => {
        this._film = Object.assign({}, film, {comments: []});
      })
      .finally(() => this._renderFilmDetails());
  }

  destroy() {
    remove(this._filmDetailsComponent);
  }

  _renderFilmDetails() {
    this._prevFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new FilmDetailsView(this._film);

    this._filmDetailsComponent.setCloseClickHandler(this._handleOnCloseBtnClick);
    this._filmDetailsComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._filmDetailsComponent.setCommentDeleteHandler(this._handleCommentDeleteClick);

    if (this._prevFilmDetailsComponent === null) {
      render(this._container, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const scrollTopPosition = this._prevFilmDetailsComponent.getElement().scrollTop;

    replace(this._filmDetailsComponent, this._prevFilmDetailsComponent);
    this._filmDetailsComponent.getElement().scrollTo(0, scrollTopPosition);

    remove(this._prevFilmDetailsComponent);
  }

  _handleOnCloseBtnClick() {
    this._closeDetails();
  }

  _handleAddToWatchListClick() {
    this._changeFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        isWatchList: !this._film.isWatchList,
        comments: this._film.comments.map((comment) => comment.id),
      })
    );
  }

  _handleWatchedClick() {
    this._changeFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        isWatched: !this._film.isWatched,
        comments: this._film.comments.map((comment) => comment.id),
      })
    );
  }

  _handleFavoriteClick() {
    this._changeFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite,
        comments: this._film.comments.map((comment) => comment.id),
      })
    );
  }

  _handleFormSubmit(update) {
    this._changeFilm(UserAction.UPDATE_FILM, UpdateType.MINOR, update);
  }

  _handleCommentDeleteClick(commentId) {
    const updateComments = this._film.comments.filter((comment) => comment.id.toString() !== commentId);

    this._changeFilm(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, {comments: [...updateComments]})
    );
  }
}
