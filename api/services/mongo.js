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
            reject(new ServerError({
              createdAt: moment().valueOf(),
              message: 'API Error. Please try again in some minutes',
              data: err,
            }));
          } else {
            this.liveDB = liveDB;

            MongoClient.connect(MONGO_TEST_URL, (testErr, testDB) => {
              if (testErr) {
                reject(new ServerError({
                  createdAt: moment().valueOf(),
                  message: 'API Error. Please try again in some minutes',
                  data: err,
                }));
              } else {
                this.testDB = testDB;
                resolve();
              }
            });
          }
        });
      } else {
        reject(new UnauthorizedError({
          createdAt: moment().valueOf(),
          message: `Invalid API Key provided: ${secretKey}`,
        }));
      }
    });
  }

  getDB() {
    const { liveDB, testDB } = this;
    const db = testDB || liveDB;

    return {
      Claims: db.collection('claims'), // testDB is provisory (should be liveDB)
      Counter: db.collection('counter'),
      Customers: db.collection('customers'),
      Matrix: db.collection('matrix'),
      Payments: db.collection('payments'),
      Policies: db.collection('policies'),
      Logs: db.collection('logs'),
      Events: db.collection('events'),
      Webhooks: db.collection('webhooks'),
      Users: liveDB.collection('users'),
    };
  }

  close() {
    const { liveDB, testDB } = this;

    if (testDB) testDB.close();
    if (liveDB) liveDB.close();
  }
}

export default Mongo;
