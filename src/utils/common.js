import dayjs from "dayjs";

export const capitilizeString = (string) => {
  return string
    .split(` `)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(` `);
};

export const getDuration = (minutes) => {
  const date1 = dayjs();
  const date2 = date1.add(minutes, `minute`);

  const hours = date2.diff(date1, `hour`);
  const mins = date2.subtract(hours, `hour`).diff(date1, `minute`);

  return {
    hours,
    mins,
  };
};
