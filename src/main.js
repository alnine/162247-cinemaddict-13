import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import FilmsAmountView from "./view/films-amount";
import FilmsBoard from "./presenter/filmsBoard";
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

if (userViewedFilmAmount) {
  render(siteHeaderElement, new ProfileView(userViewedFilmAmount), RenderPosition.BEFOREEND);
}

render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);

const filmsBoard = new FilmsBoard(siteBody, siteMainElement);

filmsBoard.init(films);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsAmountView(films.length), RenderPosition.BEFOREEND);
