import SiteMenuView from "./view/site-menu";
import FilmsAmountView from "./view/films-amount";
import StatsView from "./view/stats";
import ProfilePresenter from "./presenter/profile";
import FiltersPresenter from "./presenter/filters";
import FilmsBoardPresenter from "./presenter/films-board";
import FilterModel from "./model/filter";
import FilmsModel from "./model/films";
import {remove, render, RenderPosition} from "./utils/render";
import {FilterType, MenuItem, UpdateType} from "./constants";
import Api from "./api";
import {END_POINT, AUTHORIZATION} from "./constants";

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();

const siteMenuComponent = new SiteMenuView();

const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
const filtersPresenter = new FiltersPresenter(siteMenuComponent, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(siteBody, siteMainElement, filmsModel, filterModel, api);

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
        .querySelector(`[data-anchor=stats]`)
        .classList.remove(`main-navigation__additional--active`);
      break;
    case MenuItem.STATS:
      filmsBoardPresenter.destroy();
      filterModel.setFilter(null, FilterType.NONE);
      statsComponent = new StatsView(filmsModel.getFilms());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent
        .getElement()
        .querySelector(`[data-anchor=stats]`)
        .classList.add(`main-navigation__additional--active`);
      break;
  }
};

siteMenuComponent.setMenuItemClickHandler(handleSiteMenuClick);

render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

profilePresenter.init();
filtersPresenter.init();
filmsBoardPresenter.init();

api
  .getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  })
  .finally(() => {
    render(footerStatisticsElement, new FilmsAmountView(filmsModel.getFilms().length), RenderPosition.BEFOREEND);
  });
