import {getRandomInteger} from "./helpers";

export const generateUser = () => {
  return {
    watchList: new Array(getRandomInteger(0, 25)),
    history: new Array(getRandomInteger(0, 25)),
    favorites: new Array(getRandomInteger(0, 25)),
  };
};
