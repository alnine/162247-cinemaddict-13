import dayjs from "dayjs";

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateDate = () => {
  const year = getRandomInteger(0, 3);
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
