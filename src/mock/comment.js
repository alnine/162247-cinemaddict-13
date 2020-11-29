import dayjs from "dayjs";
import {NAMES} from "./constants";
import {getRandomInteger} from "./helpers";

const EMOGIES = [`angry`, `puke`, `sleeping`, `smile`];
const PHRASES = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`];

const generateDate = () => {
  const year = getRandomInteger(0, 1);
  const month = getRandomInteger(0, 3);
  const day = getRandomInteger(0, 6);
  const hour = getRandomInteger(0, 12);
  const min = getRandomInteger(0, 30);

  return dayjs()
    .subtract(year, `year`)
    .subtract(month, `month`)
    .subtract(day, `day`)
    .subtract(hour, `hour`)
    .subtract(min, `minute`)
    .toDate();
};

export const generateComment = () => {
  return {
    emoji: EMOGIES[getRandomInteger(0, EMOGIES.length - 1)],
    text: PHRASES[getRandomInteger(0, PHRASES.length - 1)],
    author: NAMES[getRandomInteger(0, NAMES.length - 1)],
    date: generateDate(),
  };
};
