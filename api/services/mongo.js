import moment from 'moment';
import { MONGO_URL, MONGO_TEST_URL } from '../configs';
import { ServerError } from '../error';

const MongoClient = require('mongodb').MongoClient;

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
              message: 'API Error. Please try again in some minutes',
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
                  message: 'API Error. Please try again in some minutes',
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
      ClaimsDB: db.collection('claims'), // testDB is provisory (should be liveDB)
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
}

const mongo = new Mongo();

export default mongo;
