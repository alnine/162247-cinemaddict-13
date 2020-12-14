import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import ListSortView from "./view/list-sort";
import FilmsView from "./view/films";
import NoFilmsView from "./view/no-films";
import FilmsListView from "./view/films-list";
import FilmsListContainerView from "./view/films-list-container";
import FilmCardView from "./view/film-card";
import LoadMoreBtnView from "./view/load-more-btn";
import FilmsAmountView from "./view/films-amount";
import FilmDetailsView from "./view/film-details";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";
import {render, remove, RenderPosition} from "./utils/render";

const FILMS_COUNT = 19;
const FILMS_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const closeFilmDetailsPopup = (component, container) => {
  remove(component);
  container.classList.remove(`hide-overflow`);
};

const renderFilmDetailsPopup = (film, container) => {
  const filmDetailsComponent = new FilmDetailsView(film);
  filmDetailsComponent.setOnCloseClickHandler(() => {
    closeFilmDetailsPopup(filmDetailsComponent, container);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.removeEventListener(`keydown`, onEscKeyDown);
      closeFilmDetailsPopup(filmDetailsComponent, container);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);
  container.classList.add(`hide-overflow`);

  render(container, filmDetailsComponent, RenderPosition.BEFOREEND);
};

const getFilmCardElement = (film, onClick) => {
  const filmCardComponent = new FilmCardView(film);
  filmCardComponent.setClickHandler(() => onClick(film));

  return filmCardComponent;
};

const renderFilmsBoard = (container, films, onFilmCardClick) => {
  if (films.length === 0) {
    render(container, new NoFilmsView(), RenderPosition.BEFOREEND);
    return;
  }

  const topRatedFilms = films
    .filter((film) => film.totalRating)
    .sort((a, b) => b.totalRating - a.totalRating)
    .slice(0, EXTRA_FILM_COUNT);

  const mostCommentedFilms = films
    .filter((film) => film.comments.length !== 0)
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, EXTRA_FILM_COUNT);

  const allFilmsListComponent = new FilmsListView("All movies. Upcoming", false, true);
  const allFilmsContainerComponent = new FilmsListContainerView();
  render(container, allFilmsListComponent, RenderPosition.BEFOREEND);
  render(allFilmsListComponent, allFilmsContainerComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
    render(allFilmsContainerComponent, getFilmCardElement(films[i], onFilmCardClick), RenderPosition.BEFOREEND);
  }

  if (films.length > FILMS_PER_STEP) {
    let renderedFilmCount = FILMS_PER_STEP;
    const loadMoreBtnComponent = new LoadMoreBtnView();
    render(allFilmsListComponent, loadMoreBtnComponent, RenderPosition.BEFOREEND);

    loadMoreBtnComponent.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_PER_STEP)
        .forEach((film) =>
          render(allFilmsContainerComponent, getFilmCardElement(film, onFilmCardClick), RenderPosition.BEFOREEND)
        );

      renderedFilmCount += FILMS_PER_STEP;

      if (films.length <= renderedFilmCount) {
        remove(loadMoreBtnComponent);
      }
    });
  }

  const topRatedFilmsListComponent = new FilmsListView(`Top rated`, true);
  const topRatedFilmsContainerComponent = new FilmsListContainerView();
  render(container, topRatedFilmsListComponent, RenderPosition.BEFOREEND);
  render(topRatedFilmsListComponent, topRatedFilmsContainerComponent, RenderPosition.BEFOREEND);

  topRatedFilms.forEach((film) =>
    render(topRatedFilmsContainerComponent, getFilmCardElement(film, onFilmCardClick), RenderPosition.BEFOREEND)
  );

  const mostCommentedFilmsListComponent = new FilmsListView(`Most commented`, true);
  const mostCommentedFilmsContainerComponent = new FilmsListContainerView();
  render(container, mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);
  render(mostCommentedFilmsListComponent, mostCommentedFilmsContainerComponent, RenderPosition.BEFOREEND);

  mostCommentedFilms.forEach((film) =>
    render(mostCommentedFilmsContainerComponent, getFilmCardElement(film, onFilmCardClick), RenderPosition.BEFOREEND)
  );
};

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const userViewedFilmAmount = films.filter((film) => film.isWatched).length;

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const openPopup = (film) => {
  renderFilmDetailsPopup(film, siteBody);
};

if (userViewedFilmAmount) {
  render(siteHeaderElement, new ProfileView(userViewedFilmAmount), RenderPosition.BEFOREEND);
}

render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);

if (films.length > 0) {
  render(siteMainElement, new ListSortView(), RenderPosition.BEFOREEND);
}

const filmsComponent = new FilmsView();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
renderFilmsBoard(filmsComponent, films, openPopup);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsAmountView(films.length), RenderPosition.BEFOREEND);
