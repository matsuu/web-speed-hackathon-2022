/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  return new Date(dateLeft).toDateString() == new Date(dateRight).toDateString();
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  return new Date(ts).toLocaleTimeString("ja-JP", {hour:"numeric",minute:"2-digit"});
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (Date.parse(closeAt) < now.getTime()) {
    return "投票締切";
  }

  if (Date.parse(closeAt) > now.getTime() + 7200000) {
    return "投票受付中";
  }

  return `締切${Math.floor((Date.parse(closeAt) - now.getTime())/60000)}分前`;
};
