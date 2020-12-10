import AbstractView from "./abstract";

export const createLoadMoreBtnTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class LoadMoreBtn extends AbstractView {
  getTemplate() {
    return createLoadMoreBtnTemplate();
  }
}
