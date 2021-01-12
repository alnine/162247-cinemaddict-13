import AbstractView from "./abstract";
import {capitilizeString} from "../utils/common";

const createFilterItem = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">
    ${capitilizeString(name)}
    <span class="main-navigation__item-count">${count}</span>
  </a>`;
};

const createFilterListTemplate = (filters) => {
  const siteMenuItemsTemplate = filters.map(createFilterItem).join(``);

  return `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${siteMenuItemsTemplate}
    </div>`;
};

export default class FilterList extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterListTemplate(this._filters);
  }
}
