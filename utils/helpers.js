const dayjs = require('dayjs')
const dayOfYear = require('dayjs/plugin/dayOfYear')
dayjs.extend(dayOfYear)

module.exports = {
    getDate: (date) => {
      // Format date as MM/DD/YYYY
      return dayjs(date).dayOfYear();
    },
    addDate: (date, days) => {
      // format large numbers with commas
      return dayjs(date).dayOfYear(days);
    },
    get_emoji: () => {
      const randomNum = Math.random();
  
      // Return a random emoji
      if (randomNum > 0.7) {
        return `<span for="img" aria-label="lightbulb">💡</span>`;
      } else if (randomNum > 0.4) {
        return `<span for="img" aria-label="laptop">💻</span>`;
      } else {
        return `<span for="img" aria-label="gear">⚙️</span>`;
      }
    },
  };
  