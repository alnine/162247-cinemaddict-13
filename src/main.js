import {createProfileTemplate} from "./view/profile";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createListSortTemplate} from "./view/list-sort";
import {createFilmsTemplate} from "./view/films";
import {createMainFilmListTemplate} from "./view/main-film-list";
import {createFilmCardTemplate} from "./view/film-card";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";
import {createTopRatedFilmsTemplate} from "./view/top-rated-film-list";
import {createMostCommentedFilmsTemplate} from "./view/most-commented-film-list";
import {createFilmDetailsTemplate} from "./view/film-details";
import {createFilmsAmountTemplate} from "./view/films-amount";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";

const FILMS_COUNT = 19;
const FILMS_PER_STEP = 5;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const userViewedFilmAmount = films.filter((film) => film.isWatched).length;

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);

if (userViewedFilmAmount) {
  renderComponent(siteHeaderElement, createProfileTemplate(userViewedFilmAmount), `beforeend`);
}

renderComponent(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);
renderComponent(siteMainElement, createListSortTemplate(), `beforeend`);
renderComponent(siteMainElement, createFilmsTemplate(), `beforeend`);

const mainContentElement = siteMainElement.querySelector(`.films`);

renderComponent(mainContentElement, createMainFilmListTemplate(), `beforeend`);

const mainFilmListElement = mainContentElement.querySelector(`.films-list`);
const mainFilmListContainerElement = mainFilmListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
  renderComponent(mainFilmListContainerElement, createFilmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILMS_PER_STEP) {
  let renderedFilmCount = FILMS_PER_STEP;

  renderComponent(mainFilmListElement, createLoadMoreBtnTemplate(), `beforeend`);

  const loadMoreBtn = mainFilmListElement.querySelector(`.films-list__show-more`);

  loadMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_PER_STEP)
      .forEach((film) => renderComponent(mainFilmListContainerElement, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILMS_PER_STEP;

    if (films.length <= renderedFilmCount) {
      loadMoreBtn.remove();
    }
  });
}

renderComponent(mainContentElement, createTopRatedFilmsTemplate(films), `beforeend`);
renderComponent(mainContentElement, createMostCommentedFilmsTemplate(films), `beforeend`);

const siteFooterElement = siteBody.querySelector(`.footer`);

renderComponent(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

renderComponent(footerStatisticsElement, createFilmsAmountTemplate(films.length), `beforeend`);
