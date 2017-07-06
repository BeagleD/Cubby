import moment from 'moment';

function generateMonthArrays() {
  const year = moment().year();
  const monthArray = [];

  for (let i = 0; i < 12; i += 1) {
    const numberOfDays = Array(moment({ y: year, M: i }).daysInMonth());
    monthArray[i] = Array.apply(null, [...numberOfDays]).map(Number.prototype.valueOf, 0);
  }

  return monthArray;
}

export {
  generateMonthArrays,
};
