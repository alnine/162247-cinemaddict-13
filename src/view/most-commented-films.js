import AbstractView from "./abstract";

export const createMostCommentedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`;
};

export default class MostCommentedFilms extends AbstractView {
  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}
