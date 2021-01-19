import {NAMES} from "./constants";
import {getRandomInteger, generateId, generateDate} from "./helpers";

const EMOGIES = [`angry`, `puke`, `sleeping`, `smile`];
const PHRASES = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`];

export const generateComment = () => {
  return {
    id: generateId(),
    emoji: EMOGIES[getRandomInteger(0, EMOGIES.length - 1)],
    text: PHRASES[getRandomInteger(0, PHRASES.length - 1)],
    author: NAMES[getRandomInteger(0, NAMES.length - 1)],
    date: generateDate(),
  };
};
