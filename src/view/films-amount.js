import AbstractView from "./abstract";

const createFilmsAmountTemplate = (amount) => {
  return `<p>${amount} movies inside</p>`;
};

export default class FilmsAmount extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._amount);
  }
}
