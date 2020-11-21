import {createProfileTemplate} from "./view/profile";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createListSortTemplate} from "./view/list-sort";
import {createFilmsTemplate} from "./view/films";
import {createMainFilmListTemplate} from "./view/main-film-list";
import {createFilmCardTemplate} from "./view/film-card";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";
import {createExtraFilmListTemplate} from "./view/extra-film-list";
import {createFilmDetailsTemplate} from "./view/film-details";
import {createFilmsAmountTemplate} from "./view/films-amount";

const MAIN_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);

renderComponent(siteHeaderElement, createProfileTemplate(), `beforeend`);
renderComponent(siteMainElement, createSiteMenuTemplate(), `beforeend`);
renderComponent(siteMainElement, createListSortTemplate(), `beforeend`);
renderComponent(siteMainElement, createFilmsTemplate(), `beforeend`);

const mainContentElement = siteMainElement.querySelector(`.films`);

renderComponent(mainContentElement, createMainFilmListTemplate(), `beforeend`);

const mainFilmListElement = mainContentElement.querySelector(`.films-list`);
const mainFilmListContainerElement = mainFilmListElement.querySelector(`.films-list__container`);

for (let i = 0; i < MAIN_FILMS_COUNT; i++) {
  renderComponent(mainFilmListContainerElement, createFilmCardTemplate(), `beforeend`);
}

renderComponent(mainFilmListElement, createLoadMoreBtnTemplate(), `beforeend`);

renderComponent(mainContentElement, createExtraFilmListTemplate(`Top rated`, EXTRA_FILMS_COUNT), `beforeend`);
renderComponent(mainContentElement, createExtraFilmListTemplate(`Most commented`, EXTRA_FILMS_COUNT), `beforeend`);

const siteFooterElement = siteBody.querySelector(`.footer`);

renderComponent(siteFooterElement, createFilmDetailsTemplate(), `afterend`);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

renderComponent(footerStatisticsElement, createFilmsAmountTemplate(), `beforeend`);
