import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {StatsFilterType} from "../constants";

dayjs.extend(isBetween);

export const countFilmsByGenres = (films) => {
  const genres = films.map((film) => [...film.genres]).flat();
  const uniqGenres = [...new Set(genres)];
  const result = {};

  uniqGenres.forEach((genre) => {
    const total = films.reduce((counter, film) => {
      const isExist = film.genres.includes(genre);
      return isExist ? counter + 1 : counter;
    }, 0);

    result[genre] = total;
  });

  return result;
};

export const filterWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
  return films.filter((film) => {
    if (!film.watchingDate) {
      return false;
    }

    if (
      dayjs(film.watchingDate).isSame(dateFrom) ||
      dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(film.watchingDate).isSame(dateTo)
    ) {
      return true;
    }

    return false;
  });
};

export const filterInRange = {
  [StatsFilterType.ALL_TIME]: (films) => films.filter((film) => film.isWatched),
  [StatsFilterType.TODAY]: (films) =>
    filterWatchedFilmsInDateRange(films, dayjs().startOf("day").toDate(), dayjs().toDate()),
  [StatsFilterType.WEEK]: (films) =>
    filterWatchedFilmsInDateRange(films, dayjs().subtract(1, "week").toDate(), dayjs().toDate()),
  [StatsFilterType.MONTH]: (films) =>
    filterWatchedFilmsInDateRange(films, dayjs().subtract(1, "month").toDate(), dayjs().toDate()),
  [StatsFilterType.YEAR]: (films) =>
    filterWatchedFilmsInDateRange(films, dayjs().subtract(1, "year").toDate(), dayjs().toDate()),
};
