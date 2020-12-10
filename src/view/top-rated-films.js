import AbstractView from "./abstract";

export const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section>`;
};

export default class TopRatedFilms extends AbstractView {
  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}
