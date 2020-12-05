import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import ListSortView from "./view/list-sort";
import FilmsView from "./view/films";
import AllFilmsView from "./view/all-films";
import FilmListView from "./view/film-list";
import FilmCardView from "./view/film-card";
import LoadMoreBtnView from "./view/load-more-btn";
import TopRatedFilmsView from "./view/top-rated-films";
import MostCommentedFilmsView from "./view/most-commented-films";
import FilmsAmountView from "./view/films-amount";
import FilmDetailsView from "./view/film-details";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";
import {renderElement, RenderPosition} from "./helpers";

const FILMS_COUNT = 19;
const FILMS_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const userViewedFilmAmount = films.filter((film) => film.isWatched).length;
const topRatedFilms = films
  .filter((film) => film.totalRating)
  .sort((a, b) => b.totalRating - a.totalRating)
  .slice(0, EXTRA_FILM_COUNT);
const mostCommentedFilms = films
  .filter((film) => film.comments.length !== 0)
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, EXTRA_FILM_COUNT);

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const renderFilmDetailsPopup = (film) => {
  const filmDetailsComponent = new FilmDetailsView(film);
  const filmDetailsPopupElement = filmDetailsComponent.getElement();

  renderElement(siteBody, filmDetailsPopupElement, RenderPosition.BEFOREEND);
};

if (userViewedFilmAmount) {
  renderElement(siteHeaderElement, new ProfileView(userViewedFilmAmount).getElement(), RenderPosition.BEFOREEND);
}

renderElement(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new ListSortView().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
const allFilmsComponent = new AllFilmsView();
const allFilmListComponent = new FilmListView();
renderElement(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(filmsComponent.getElement(), allFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(allFilmsComponent.getElement(), allFilmListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
  const filmCardComponent = new FilmCardView(films[i]);
  const filmCardElement = filmCardComponent.getElement();
  const filmCardPosterElement = filmCardElement.querySelector(`.film-card__poster`);
  const filmCardTitleElement = filmCardElement.querySelector(`.film-card__title`);
  const filmCardCommentsElement = filmCardElement.querySelector(`.film-card__comments`);

  const onFilmCardElementsClick = (evt) => {
    evt.preventDefault();
    renderFilmDetailsPopup(films[i]);
  };

  filmCardPosterElement.addEventListener(`click`, onFilmCardElementsClick);
  filmCardTitleElement.addEventListener(`click`, onFilmCardElementsClick);
  filmCardCommentsElement.addEventListener(`click`, onFilmCardElementsClick);

  renderElement(allFilmListComponent.getElement(), filmCardComponent.getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILMS_PER_STEP) {
  let renderedFilmCount = FILMS_PER_STEP;
  const loadMoreBtnComponent = new LoadMoreBtnView();
  renderElement(allFilmsComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_PER_STEP)
      .forEach((film) =>
        renderElement(allFilmListComponent.getElement(), new FilmCardView(film).getElement(), RenderPosition.BEFOREEND)
      );

    renderedFilmCount += FILMS_PER_STEP;

    if (films.length <= renderedFilmCount) {
      loadMoreBtnComponent.getElement().remove();
      loadMoreBtnComponent.removeElement();
    }
  });
}

const topRatedFilmsComponent = new TopRatedFilmsView();
const topRatedFilmListComponent = new FilmListView();
renderElement(filmsComponent.getElement(), topRatedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(topRatedFilmsComponent.getElement(), topRatedFilmListComponent.getElement(), RenderPosition.BEFOREEND);

topRatedFilms.forEach((film) =>
  renderElement(topRatedFilmListComponent.getElement(), new FilmCardView(film).getElement(), RenderPosition.BEFOREEND)
);

const mostCommentedFilmsComponent = new MostCommentedFilmsView();
const mostCommentedFilmListComponent = new FilmListView();
renderElement(filmsComponent.getElement(), mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(
  mostCommentedFilmsComponent.getElement(),
  mostCommentedFilmListComponent.getElement(),
  RenderPosition.BEFOREEND
);
mostCommentedFilms.forEach((film) =>
  renderElement(
    mostCommentedFilmListComponent.getElement(),
    new FilmCardView(film).getElement(),
    RenderPosition.BEFOREEND
  )
);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
renderElement(footerStatisticsElement, new FilmsAmountView(films.length).getElement(), RenderPosition.BEFOREEND);
