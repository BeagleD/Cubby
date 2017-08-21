import moment from 'moment';
import increment from './increment';

class PaymentsCounter {
  constructor() {
    this.increment = increment.bind(undefined, this.increment);
  }

  increment({ session, counter, data }) {
    return new Promise((resolve) => {
      const { createdAt } = data;
      const date = moment(createdAt);
      const year = date.year();
      const month = date.month();
      const day = date.date() - 1;

      const query = { 'payments.total': 1 };
      query[`payments.${year}.total.${month}.${day}`] = 1;

      resolve({ session, counter, query });
    });
  }
}

export default PaymentsCounter;
