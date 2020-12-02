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

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
