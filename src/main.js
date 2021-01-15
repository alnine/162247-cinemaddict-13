import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import FilmsAmountView from "./view/films-amount";
import FiltersPresenter from "./presenter/filters";
import FilmsBoardPresenter from "./presenter/filmsBoard";
import FilterModel from "./model/filter";
import FilmsModel from "./model/films";
import {generateFilm} from "./mock/film";
import {render, RenderPosition} from "./utils/render";

const FILMS_COUNT = 19;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const userViewedFilmAmount = films.filter((film) => film.isWatched).length;

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const siteMenuComponent = new SiteMenuView();
const siteMenuElement = siteMenuComponent.getElement();

if (userViewedFilmAmount) {
  render(siteHeaderElement, new ProfileView(userViewedFilmAmount), RenderPosition.BEFOREEND);
}

render(siteMainElement, siteMenuElement, RenderPosition.BEFOREEND);

const filtersPresenter = new FiltersPresenter(siteMenuElement, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(siteBody, siteMainElement, filmsModel, filterModel);

filtersPresenter.init();
filmsBoardPresenter.init();

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsAmountView(films.length), RenderPosition.BEFOREEND);
