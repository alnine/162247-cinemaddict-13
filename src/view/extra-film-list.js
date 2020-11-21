import {createFilmCardTemplate} from "./film-card";

export const createExtraFilmListTemplate = (title, count) => {
  const filmCardList = new Array(count)
    .fill()
    .map(() => createFilmCardTemplate())
    .join(``);

  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    ${filmCardList}
    </div>
  </section>`;
};
