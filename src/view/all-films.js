import {createElement} from "../helpers";

export const createMainFilmListTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`;
};

export default class AllFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainFilmListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
