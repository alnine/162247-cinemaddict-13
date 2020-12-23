import dayjs from "dayjs";

export const sortFilmDateDown = (filmA, filmB) => {
  const dateA = dayjs(filmA.releaseDate);
  const dateB = dayjs(filmB.releaseDate);

  return dateB.diff(dateA);
};

export const sortFilmRatingDown = (filmA, filmB) => {
  return filmB.totalRating - filmA.totalRating;
};
