import dayjs from "dayjs";
import relatimeTimePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(relatimeTimePlugin);

const generateDayString = (date) => {
  const currentYear = dayjs().year();
  const commentYear = dayjs(date).year();

  if (currentYear !== commentYear) {
    return dayjs(date).format(`YYYY/M/D HH:mm`);
  }

  return dayjs(date).fromNow();
};

export const createCommentTemplate = (comment) => {
  const {emoji, text, author, date} = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${generateDayString(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};
