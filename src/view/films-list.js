import AbstractView from "./abstract";

const createFilmListTemplate = (title, isExtra = false, isTitleHidden = false) => {
  return `<section class="films-list ${isExtra ? `films-list--extra` : ``}">
    <h2 class="films-list__title ${isTitleHidden ? `visually-hidden` : ``}">${title}</h2>
  </section>`;
};

export default class FilmsList extends AbstractView {
  constructor(title, isExtra = false, isTitleHidden = false) {
    super();

    this._title = title;
    this._isExtra = isExtra;
    this._isTitleHidden = isTitleHidden;
  }

  getTemplate() {
    return createFilmListTemplate(this._title, this._isExtra, this._isTitleHidden);
  }
}
