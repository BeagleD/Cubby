import moment from 'moment';
import { MONGO_URL, MONGO_TEST_URL } from '../configs';
import { ServerError } from '../error';

const MongoClient = require('mongodb').MongoClient;

const singleton = Symbol('Mongo');
const singletonEnforcer = Symbol('MongoEnforcer');

class Mongo {
  connect() {
    return new Promise((resolve, reject) => {
      if (this.liveDB && this.testDB) {
        resolve();
        return;
      }

      MongoClient.connect(MONGO_URL, (err, liveDB) => {
        if (err) {
          reject({
            error: new ServerError({
              createdAt: moment().valueOf(),
              message: 'Error connecting to Mongo Live DB.  Please try again in some minutes',
              data: err,
            }),
          });
        } else {
          this.liveDB = liveDB;

          MongoClient.connect(MONGO_TEST_URL, (testErr, testDB) => {
            if (testErr) {
              reject({
                error: new ServerError({
                  createdAt: moment().valueOf(),
                  message: 'Error connecting to Mongo Test DB. Please try again in some minutes',
                  data: testErr,
                }),
              });
            } else {
              this.testDB = testDB;
              resolve();
            }
          });
        }
      });
    });
  }

  getDB(secretKey) {
    const isLive = secretKey.indexOf('live') >= 0;
    const { liveDB, testDB } = this;
    const db = isLive ? liveDB : testDB;

    return {
      ClaimsDB: db.collection('claims'),
      CounterDB: db.collection('counter'),
      CustomersDB: db.collection('customers'),
      MatrixDB: db.collection('matrix'),
      PaymentsDB: db.collection('payments'),
      PoliciesDB: db.collection('policies'),
      LogsDB: db.collection('logs'),
      EventsDB: db.collection('events'),
      WebhooksDB: db.collection('webhooks'),
      UsersDB: liveDB.collection('users'),
    };
  }

  getTestDB() {
    const { liveDB, testDB } = this;

    return {
      ClaimsDB: testDB.collection('claims'),
      CounterDB: testDB.collection('counter'),
      CustomersDB: testDB.collection('customers'),
      MatrixDB: testDB.collection('matrix'),
      PaymentsDB: testDB.collection('payments'),
      PoliciesDB: testDB.collection('policies'),
      LogsDB: testDB.collection('logs'),
      EventsDB: testDB.collection('events'),
      WebhooksDB: testDB.collection('webhooks'),
      UsersDB: liveDB.collection('users'),
    };
  }

  getLiveDB() {
    const { liveDB } = this;

    return {
      ClaimsDB: liveDB.collection('claims'),
      CounterDB: liveDB.collection('counter'),
      CustomersDB: liveDB.collection('customers'),
      MatrixDB: liveDB.collection('matrix'),
      PaymentsDB: liveDB.collection('payments'),
      PoliciesDB: liveDB.collection('policies'),
      LogsDB: liveDB.collection('logs'),
      EventsDB: liveDB.collection('events'),
      WebhooksDB: liveDB.collection('webhooks'),
      UsersDB: liveDB.collection('users'),
    };
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Mongo(singletonEnforcer);
    }

    return this[singleton];
  }
}

const mongo = Mongo.instance;

export default mongo;
