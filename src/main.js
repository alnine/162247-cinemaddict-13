import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import ListSortView from "./view/list-sort";
import FilmsView from "./view/films";
import NoFilmsView from "./view/no-films";
import AllFilmsView from "./view/all-films";
import FilmListView from "./view/film-list";
import FilmCardView from "./view/film-card";
import LoadMoreBtnView from "./view/load-more-btn";
import TopRatedFilmsView from "./view/top-rated-films";
import MostCommentedFilmsView from "./view/most-commented-films";
import FilmsAmountView from "./view/films-amount";
import FilmDetailsView from "./view/film-details";
import {generateFilm} from "./mock/film";
import {generateFilters} from "./mock/filters";
import {renderElement, RenderPosition} from "./helpers";

const FILMS_COUNT = 19;
const FILMS_PER_STEP = 5;
const EXTRA_FILM_COUNT = 2;

const closeFilmDetailsPopup = (component, container) => {
  component.getElement().remove();
  component.removeElement();
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

  renderElement(container, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
};

const getFilmCardElement = (film, onClick) => {
  const filmCardComponent = new FilmCardView(film);
  filmCardComponent.setClickHandler(() => onClick(film));

  return filmCardComponent.getElement();
};

const renderFilmsBoard = (container, films, onFilmCardClick) => {
  if (films.length === 0) {
    renderElement(container, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
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

  const allFilmsComponent = new AllFilmsView();
  const allFilmListComponent = new FilmListView();
  renderElement(container, allFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(allFilmsComponent.getElement(), allFilmListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
    renderElement(
      allFilmListComponent.getElement(),
      getFilmCardElement(films[i], onFilmCardClick),
      RenderPosition.BEFOREEND
    );
  }

  if (films.length > FILMS_PER_STEP) {
    let renderedFilmCount = FILMS_PER_STEP;
    const loadMoreBtnComponent = new LoadMoreBtnView();
    renderElement(allFilmsComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreBtnComponent.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_PER_STEP)
        .forEach((film) =>
          renderElement(
            allFilmListComponent.getElement(),
            getFilmCardElement(film, onFilmCardClick),
            RenderPosition.BEFOREEND
          )
        );

      renderedFilmCount += FILMS_PER_STEP;

      if (films.length <= renderedFilmCount) {
        loadMoreBtnComponent.getElement().remove();
        loadMoreBtnComponent.removeElement();
      }
    });
  }

  const topRatedFilmsComponent = new TopRatedFilmsView();
  const topRatedFilmListComponent = new FilmListView();
  renderElement(container, topRatedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(topRatedFilmsComponent.getElement(), topRatedFilmListComponent.getElement(), RenderPosition.BEFOREEND);

  topRatedFilms.forEach((film) =>
    renderElement(
      topRatedFilmListComponent.getElement(),
      getFilmCardElement(film, onFilmCardClick),
      RenderPosition.BEFOREEND
    )
  );

  const mostCommentedFilmsComponent = new MostCommentedFilmsView();
  const mostCommentedFilmListComponent = new FilmListView();
  renderElement(container, mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(
    mostCommentedFilmsComponent.getElement(),
    mostCommentedFilmListComponent.getElement(),
    RenderPosition.BEFOREEND
  );

  mostCommentedFilms.forEach((film) =>
    renderElement(
      mostCommentedFilmListComponent.getElement(),
      getFilmCardElement(film, onFilmCardClick),
      RenderPosition.BEFOREEND
    )
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
  renderElement(siteHeaderElement, new ProfileView(userViewedFilmAmount).getElement(), RenderPosition.BEFOREEND);
}

renderElement(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);

if (films.length > 0) {
  renderElement(siteMainElement, new ListSortView().getElement(), RenderPosition.BEFOREEND);
}

const filmsComponent = new FilmsView();
renderElement(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsBoard(filmsComponent.getElement(), films, openPopup);

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
renderElement(footerStatisticsElement, new FilmsAmountView(films.length).getElement(), RenderPosition.BEFOREEND);
