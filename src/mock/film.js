import dayjs from "dayjs";
import {FILM_TITLES, FILM_IMAGE, FILM_DESC, GENRES, COUNTRIES, AGE_RATINGS, NAMES} from "./constants";
import {BASE_IMAGE_PATH} from "../constants";
import {getRandomInteger, capitalizeWord} from "./helpers";
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
  const comments = new Array(size)
    .fill()
    .map(generateComment)
    .sort((a, b) => {
      const date1 = dayjs(a.date);
      const date2 = dayjs(b.date);

      return date2.diff(date1);
    });
  return comments;
};

export const generateFilm = () => {
  const title = generateTitle();
  const capitalizeTitle = title.split(` `).map(capitalizeWord).join(` `);

  return {
    title: capitalizeTitle,
    originalTitle: capitalizeTitle,
    posterUrl: `${BASE_IMAGE_PATH}${FILM_IMAGE[title]}`,
    desc: generateDesc(),
    genres: [GENRES[getRandomInteger(0, GENRES.length - 1)]],
    runtime: getRandomInteger(60, 180),
    releaseDate: {
      day: getRandomInteger(1, 30),
      month: getRandomInteger(1, 12),
      year: getRandomInteger(1930, 2020),
    },
    country: COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)],
    ageRating: AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length - 1)],
    totalRating: getRandomInteger(0, 10),
    comments: generateComments(),
    director: NAMES[getRandomInteger(0, NAMES.length - 1)],
    writers: [NAMES[getRandomInteger(0, NAMES.length - 1)]],
    actors: [NAMES[getRandomInteger(0, NAMES.length - 1)]],
  };
};
