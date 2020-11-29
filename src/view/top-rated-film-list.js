import {createFilmCardTemplate} from "./film-card";

export const createTopRatedFilmsTemplate = (films) => {
  const FILMS_COUNT = 2;

  const filmCardList = films
    .filter((film) => film.totalRating)
    .sort((a, b) => b.totalRating - a.totalRating)
    .slice(0, FILMS_COUNT)
    .map(createFilmCardTemplate)
    .join(``);

  if (!filmCardList) {
    return ``;
  }

  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    ${filmCardList}
    </div>
  </section>`;
};
