import dayjs from "dayjs";
import {BASE_IMAGE_PATH, FILM_TITLES, FILM_IMAGE, FILM_DESC, GENRES, COUNTRIES, AGE_RATINGS, NAMES} from "./constants";
import {getRandomInteger, generateId} from "./helpers";
import {generateComment} from "./comment";

const generateTitle = () => {
  return FILM_TITLES[getRandomInteger(0, FILM_TITLES.length - 1)];
};

const generateDesc = () => {
  const size = getRandomInteger(1, 5);
  const parts = FILM_DESC.split(`.`)
    .map((part) => part.trim())
    .filter((part) => part !== ``);

  const set = new Set();

  while (set.size !== size) {
    set.add(parts[getRandomInteger(0, parts.length - 1)]);
  }

  const desc = [];
  for (let part of set) {
    desc.push(part);
  }

  return `${desc.join(`. `)}.`;
};

const generateComments = () => {
  const size = getRandomInteger(0, 5);
  const comments = new Array(size).fill().map(generateComment);

  return comments;
};

const generateReleaseDate = () => {
  const day = getRandomInteger(1, 31);
  const month = getRandomInteger(0, 11);
  const year = getRandomInteger(1930, 2020);

  return dayjs().date(day).month(month).year(year).toDate();
};

export const generateFilm = () => {
  const title = generateTitle();
  generateReleaseDate();

  return {
    id: generateId(),
    title,
    originalTitle: title,
    posterUrl: `${BASE_IMAGE_PATH}${FILM_IMAGE[title]}`,
    desc: generateDesc(),
    genres: [GENRES[getRandomInteger(0, GENRES.length - 1)]],
    runtime: getRandomInteger(40, 180),
    releaseDate: generateReleaseDate(),
    country: COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)],
    ageRating: AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length - 1)],
    totalRating: getRandomInteger(0, 10),
    comments: generateComments(),
    director: NAMES[getRandomInteger(0, NAMES.length - 1)],
    writers: [NAMES[getRandomInteger(0, NAMES.length - 1)]],
    actors: [NAMES[getRandomInteger(0, NAMES.length - 1)]],
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
