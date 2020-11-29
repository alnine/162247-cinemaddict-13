const filmToFilterMap = {
  watchlist: (tasks) => tasks.filter((task) => task.isWatchList).length,
  history: (tasks) => tasks.filter((task) => task.isWatched).length,
  favorites: (tasks) => tasks.filter((task) => task.isFavorite).length,
};

export const generateFilters = (tasks) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(tasks),
    };
  });
};
