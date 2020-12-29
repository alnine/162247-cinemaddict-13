import dayjs from "dayjs";

export const capitilizeString = (string) => {
  return string
    .split(` `)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(` `);
};

export const getDurationString = (minutes) => {
  const date1 = dayjs();
  const date2 = date1.add(minutes, "minute");

  const hours = date2.diff(date1, "hour");
  const mins = date2.subtract(hours, "hour").diff(date1, "minute");

  return `${hours}h ${mins}m`;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
