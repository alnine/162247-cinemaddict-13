const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getDurationString = (minutes) => {
  const minsInHour = 60;
  const restMin = minutes % minsInHour;
  const hours = (minutes - restMin) / minsInHour;

  return `${hours}h ${restMin}m`;
};

const getShortDesc = (desc) => {
  const DESC_LENGTH = 140;
  return desc.length < DESC_LENGTH ? desc : `${desc.slice(0, DESC_LENGTH - 1)}&hellip;`;
};

export const createFilmCardTemplate = (film) => {
  const {title, totalRating, releaseDate, runtime, genres, posterUrl, desc, comments} = film;
  const capitalizeTitle = title.split(` `).map(capitalizeWord).join(` `);

  return `<article class="film-card">
    <h3 class="film-card__title">${capitalizeTitle}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate.year}</span>
      <span class="film-card__duration">${getDurationString(runtime)}</span>
      <span class="film-card__genre">${genres.join(`,`)}</span>
    </p>
    <img src=${posterUrl} alt="" class="film-card__poster">
    <p class="film-card__description">${getShortDesc(desc)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
