import moment from 'moment';
import { MONGO_URL, MONGO_TEST_URL } from '../configs';
import { ServerError, UnauthorizedError } from '../error';

const MongoClient = require('mongodb').MongoClient;

class Mongo {
  constructor(secretKey) {
    this.secretKey = secretKey;
    this.isLive = secretKey.indexOf('live') >= 0;
    this.isTest = secretKey.indexOf('test') >= 0;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const { isLive, isTest, secretKey } = this;

      if (isLive || isTest) {
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
      } else {
        reject({
          error: new UnauthorizedError({
            createdAt: moment().valueOf(),
            message: `Invalid API Key provided: ${secretKey}`,
          }),
        });
      }
    });
  }

  getDB() {
    const { liveDB, testDB } = this;
    const db = testDB || liveDB;

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

  close() {
    const { liveDB, testDB } = this;

    if (testDB) testDB.close();
    if (liveDB) liveDB.close();
  }
}

export default Mongo;
