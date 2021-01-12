import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import FiltersListView from "./view/filters-list";
import FilmsAmountView from "./view/films-amount";
import FilmsBoardPresenter from "./presenter/filmsBoard";
import FilmsModel from "./model/films";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";
import {render, RenderPosition} from "./utils/render";

const FILMS_COUNT = 19;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const userViewedFilmAmount = films.filter((film) => film.isWatched).length;

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const siteMenuComponent = new SiteMenuView();

if (userViewedFilmAmount) {
  render(siteHeaderElement, new ProfileView(userViewedFilmAmount), RenderPosition.BEFOREEND);
}

render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(siteMenuComponent, new FiltersListView(filters), RenderPosition.AFTERBEGIN);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filmsBoardPresenter = new FilmsBoardPresenter(siteBody, siteMainElement, filmsModel);
filmsBoardPresenter.init();

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsAmountView(films.length), RenderPosition.BEFOREEND);
