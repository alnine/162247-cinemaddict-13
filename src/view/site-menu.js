import AbstractView from "./abstract";
import {capitilizeString} from "../helpers";

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

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
