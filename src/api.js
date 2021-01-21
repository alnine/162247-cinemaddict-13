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
    return this._load({url: `movies`}).then(Api.toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append("Authorization", this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers}).then(Api.checkStatus).catch(Api.catchError);
  }
}
