import {capitilizeString, createElement} from "../helpers";

const createSiteMenuItem = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">
    ${capitilizeString(name)}
    <span class="main-navigation__item-count">${count}</span>
  </a>`;
};

const createSiteMenuTemplate = (filters) => {
  const siteMenuItemsTemplate = filters.map(createSiteMenuItem).join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${siteMenuItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
