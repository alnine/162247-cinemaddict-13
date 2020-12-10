import AbstractView from "./abstract";

const createListSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
  </ul>`;
};

export default class ListSort extends AbstractView {
  getTemplate() {
    return createListSortTemplate();
  }
}
