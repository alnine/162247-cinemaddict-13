import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  static adaptToClient(film) {
    const {id, film_info: filmInfo, comments, user_details: userInfo} = film;

    const filmDetails = {
      title: filmInfo.title,
      originalTitle: filmInfo.alternative_title,
      totalRating: filmInfo.total_rating,
      posterUrl: filmInfo.poster,
      ageRating: filmInfo.age_rating,
      director: filmInfo.director,
      writers: [...filmInfo.writers],
      actors: [...filmInfo.actors],
      releaseDate: new Date(filmInfo.release.date),
      country: filmInfo.release.release_country,
      runtime: filmInfo.runtime,
      genres: [...filmInfo.genre],
      desc: filmInfo.description,
    };

    const userDetails = {
      isWatchList: userInfo.watchlist,
      isWatched: userInfo.already_watched,
      watchingDate: new Date(userInfo.watching_date),
      isFavorite: userInfo.favorite,
    };

    return Object.assign({}, {id, comments: [...comments]}, filmDetails, userDetails);
  }

  static adaptToServer(film) {
    const filmDetails = {
      title: film.title,
      ["alternative_title"]: film.originalTitle,
      ["total_rating"]: film.totalRating,
      poster: film.posterUrl,
      ["age_rating"]: film.ageRating,
      director: film.director,
      writers: [...film.writers],
      actors: [...film.actors],
      release: {
        date: film.date.toISOString(),
        ["release_country"]: film.country,
      },
      runtime: film.runtime,
      genre: [...film.genres],
      description: film.desc,
    };

    const userDetails = {
      watchlist: film.isWatchList,
      ["already_watched"]: film.isWatched,
      ["watching_date"]: film.watchingDate.toISOString(),
      favorite: film.isFavorite,
    };

    return {
      id: film.id,
      comments: [...film.comments],
      ["film_info"]: Object.assign({}, filmDetails),
      ["user_details"]: Object.assign({}, userDetails),
    };
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [...this._films.slice(0, index), update, ...this._films.slice(index + 1)];

    this._notify(updateType, update);
  }
}
