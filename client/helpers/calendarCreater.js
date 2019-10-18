const moment = require('moment');

function createMonth(date) {
  const startOfMonth = moment(date)
    .startOf('month')
    .format('YYYY-MM-DD');

  const dayOf1st = moment(startOfMonth).day();

  const endOfMonth = moment(date)
    .endOf('month')
    .format('D');

  const datesInMonth = [];
  let day = 1;
  const month = moment(date).month();

  let week = Array.apply(null, Array(7));
  let count = dayOf1st;
  let currentDate = startOfMonth;
  for (let i = dayOf1st; i <= parseInt(endOfMonth) + dayOf1st; i++) {
    if (count >= 6 || day === parseInt(endOfMonth)) {
      week[count] = moment(currentDate).format('YYYY-MM-DD');
      currentDate = moment(currentDate).add(1, 'd');
      datesInMonth.push(week);
      week = Array.apply(null, Array(7));
      count = 0;
    } else {
      if (datesInMonth.length === 0 && count === 0) {
        count = dayOf1st;
      }
      week[count] = moment(currentDate).format('YYYY-MM-DD');
      currentDate = moment(currentDate).add(1, 'd');
      count++;
    }
    day++;
  }
  return datesInMonth;
}

export default createMonth;
