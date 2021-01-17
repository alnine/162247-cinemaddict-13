import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import FilmsAmountView from "./view/films-amount";
import StatsView from "./view/stats";
import FiltersPresenter from "./presenter/filters";
import FilmsBoardPresenter from "./presenter/filmsBoard";
import FilterModel from "./model/filter";
import FilmsModel from "./model/films";
import {generateFilm} from "./mock/film";
import {remove, render, RenderPosition} from "./utils/render";
import {FilterType, MenuItem} from "./constants";

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
const statsComponent = new StatsView();

if (userViewedFilmAmount) {
  render(siteHeaderElement, new ProfileView(userViewedFilmAmount), RenderPosition.BEFOREEND);
}

render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filtersPresenter = new FiltersPresenter(siteMenuComponent, filterModel, filmsModel);
const filmsBoardPresenter = new FilmsBoardPresenter(siteBody, siteMainElement, filmsModel, filterModel);

filtersPresenter.init();
filmsBoardPresenter.init();

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
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent
        .getElement()
        .querySelector("[data-anchor=stats]")
        .classList.add(`main-navigation__additional--active`);
      break;
  }
};

siteMenuComponent.setMenuItemClickHandler(handleSiteMenuClick);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsAmountView(films.length), RenderPosition.BEFOREEND);
