import {createElement} from "../helpers";

const createFilmsAmountTemplate = (amount) => {
  return `<p>${amount} movies inside</p>`;
};

export default class FilmsAmount {
  constructor(amount) {
    this._element = null;
    this._amount = amount;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._amount);
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
