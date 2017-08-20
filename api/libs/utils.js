import moment from 'moment';

const formatDate = date => moment(date).format('MM/DD/YYYY');

const formatValue = value => (value / 100).toFixed(2);

export {
  formatDate,
  formatValue,
};
