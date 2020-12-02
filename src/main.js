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
import {renderTemplate} from "./helpers";

const FILMS_COUNT = 19;
const FILMS_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const userViewedFilmAmount = films.filter((film) => film.isWatched).length;

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);

if (userViewedFilmAmount) {
  renderTemplate(siteHeaderElement, createProfileTemplate(userViewedFilmAmount), `beforeend`);
}

renderTemplate(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);
renderTemplate(siteMainElement, createListSortTemplate(), `beforeend`);
renderTemplate(siteMainElement, createFilmsTemplate(), `beforeend`);

const mainContentElement = siteMainElement.querySelector(`.films`);

renderTemplate(mainContentElement, createMainFilmListTemplate(), `beforeend`);

const mainFilmListElement = mainContentElement.querySelector(`.films-list`);
const mainFilmListContainerElement = mainFilmListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
  renderTemplate(mainFilmListContainerElement, createFilmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILMS_PER_STEP) {
  let renderedFilmCount = FILMS_PER_STEP;

  renderTemplate(mainFilmListElement, createLoadMoreBtnTemplate(), `beforeend`);

  const loadMoreBtn = mainFilmListElement.querySelector(`.films-list__show-more`);

  loadMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_PER_STEP)
      .forEach((film) => renderTemplate(mainFilmListContainerElement, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILMS_PER_STEP;

    if (films.length <= renderedFilmCount) {
      loadMoreBtn.remove();
    }
  });
}

renderTemplate(mainContentElement, createTopRatedFilmsTemplate(films), `beforeend`);
renderTemplate(mainContentElement, createMostCommentedFilmsTemplate(films), `beforeend`);

const siteFooterElement = siteBody.querySelector(`.footer`);

renderTemplate(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

renderTemplate(footerStatisticsElement, createFilmsAmountTemplate(films.length), `beforeend`);
