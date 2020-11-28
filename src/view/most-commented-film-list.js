import {createFilmCardTemplate} from "./film-card";

export const createMostCommentedFilmsTemplate = (films) => {
  const FILMS_COUNT = 2;

  const filmCardList = films
    .filter((film) => film.comments.length !== 0)
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, FILMS_COUNT)
    .map(createFilmCardTemplate)
    .join(``);

  if (!filmCardList) {
    return ``;
  }

  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    ${filmCardList}
    </div>
  </section>`;
};
