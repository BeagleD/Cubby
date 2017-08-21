import moment from 'moment';
import increment from './increment';

class PoliciesCounter {
  constructor() {
    this.increment = increment.bind(undefined, this.increment);
  }

  increment({ session, counter, data }) {
    return new Promise((resolve) => {
      const { createdAt, customer, quote } = data;
      const date = moment(createdAt);
      const year = date.year();
      const month = date.month();
      const day = date.date() - 1;

      const query = {
        'policies.total': 1,
        'policies.value': quote,
      };
      query[`policies.${year}.total.${month}.${day}`] = 1;
      query[`policies.${year}.value.${month}.${day}`] = quote;
      query[`policies.customers.${customer}.total`] = 1;
      query[`policies.customers.${customer}.value`] = quote;

      resolve({ session, counter, query });
    });
  }
}

export default PoliciesCounter;
