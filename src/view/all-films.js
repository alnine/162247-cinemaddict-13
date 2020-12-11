import AbstractView from "./abstract";

const createMainFilmListTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;
};

export default class AllFilms extends AbstractView {
  getTemplate() {
    return createMainFilmListTemplate();
  }
}
