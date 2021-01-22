import FilmsModel from "./model/films";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  static checkStatus(response) {
    if (response.status < SuccessHTTPStatusRange.MIN || response.status >= SuccessHTTPStatusRange.MAX) {
      throw new Error();
    }

    return response;
  }

  static catchError(err) {
    return err;
  }

  static toJSON(response) {
    return response.json();
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((films) => films.map((film) => FilmsModel.adaptToClient(film)));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append("Authorization", this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers}).then(Api.checkStatus).catch(Api.catchError);
  }
}
