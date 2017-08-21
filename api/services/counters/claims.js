import moment from 'moment';
import increment from './increment';

class ClaimsCounter {
  constructor() {
    this.increment = increment.bind(undefined, this.increment);
  }

  increment({ session, counter, data }) {
    return new Promise((resolve) => {
      const { createdAt, customer } = data;
      const date = moment(createdAt);
      const year = date.year();
      const month = date.month();
      const day = date.date() - 1;

      const query = { 'claims.total': 1 };
      query[`claims.${year}.total.${month}.${day}`] = 1;
      query[`claims.customers.${customer.id}.total`] = 1;

      resolve({ session, counter, query });
    });
  }
}

export default ClaimsCounter;
