import moment from 'moment';
import randomid from 'randomid';
import Counter from './counter';

const singleton = Symbol('Payments');
const singletonEnforcer = Symbol('PaymentsEnforcer');

class Payments {
  create({ session, policy }) {
    return new Promise((resolve) => {
      const { mongo, secretKey } = session;
      const { _id, createdAt, quote, userId } = policy;
      const { PaymentsDB } = mongo.getDB(secretKey);
      const date = moment(createdAt);
      const year = date.year();
      const month = date.month();
      const payment = {
        createdAt,
        month,
        userId,
        year,
        id: `pay_${randomid(24)}`,
        expires: moment({ y: year, M: month, d: 11 }).valueOf(),
        status: 'waiting',
        value: quote,
        paidValue: 0,
        policies: [_id],
        taxes: [],
      };

      PaymentsDB.insert(payment).then(() => {
        Counter.payments.increment({ session, data: payment });
        resolve();
      });
    });
  }

  addPolicy({ session, policy }) {
    return new Promise((resolve) => {
      const { mongo, secretKey } = session;
      const { createdAt, userId } = policy;
      const { PaymentsDB } = mongo.getDB(secretKey);
      const date = moment(createdAt);
      const year = date.year();
      const month = date.month();

      PaymentsDB.findOne({
        userId,
        year,
        month,
      }).then((payment) => {
        if (!payment) {
          this.create({ session, policy }).then(resolve);
        } else {
          payment.value += policy.quote;
          payment.policies.push(policy._id);

          PaymentsDB.update({
            userId,
            year,
            month,
          }, {
            $set: payment,
          }).then(() => {
            resolve();
          });
        }
      });
    });
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Payments(singletonEnforcer);
    }

    return this[singleton];
  }
}

const payments = Payments.instance;

export default payments;
