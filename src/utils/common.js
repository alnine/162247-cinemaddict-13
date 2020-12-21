export const capitilizeString = (string) => {
  return string
    .split(` `)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(` `);
};

export const getDurationString = (minutes) => {
  const minsInHour = 60;
  const restMin = minutes % minsInHour;
  const hours = (minutes - restMin) / minsInHour;

  return `${hours}h ${restMin}m`;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
