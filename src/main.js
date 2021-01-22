import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import FilmsAmountView from "./view/films-amount";
import StatsView from "./view/stats";
import FiltersPresenter from "./presenter/filters";
import FilmsBoardPresenter from "./presenter/filmsBoard";
import FilterModel from "./model/filter";
import FilmsModel from "./model/films";
import {remove, render, RenderPosition} from "./utils/render";
import {FilterType, MenuItem, UpdateType} from "./constants";
import Api from "./api";

const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic cwoimpksdljlfdkJ`;

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();

const siteMenuComponent = new SiteMenuView();

const filtersPresenter = new FiltersPresenter(siteMenuComponent, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(siteBody, siteMainElement, filmsModel, filterModel);

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ALL:
    case MenuItem.WATCHLIST:
    case MenuItem.HISTORY:
    case MenuItem.FAVORITES:
      remove(statsComponent);
      siteMenuComponent
        .getElement()
        .querySelector("[data-anchor=stats]")
        .classList.remove(`main-navigation__additional--active`);
      break;
    case MenuItem.STATS:
      filmsBoardPresenter.destroy();
      filterModel.setFilter(null, FilterType.NONE);
      statsComponent = new StatsView(filmsModel.getFilms());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent
        .getElement()
        .querySelector("[data-anchor=stats]")
        .classList.add(`main-navigation__additional--active`);
      break;
  }
};

siteMenuComponent.setMenuItemClickHandler(handleSiteMenuClick);

render(siteHeaderElement, new ProfileView(filmsModel.getFilms()), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(footerStatisticsElement, new FilmsAmountView(filmsModel.getFilms()), RenderPosition.BEFOREEND);

filtersPresenter.init();
filmsBoardPresenter.init();

api
  .getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
