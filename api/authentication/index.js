import moment from 'moment';
import mongo from '../services/mongo';
import { BadRequestError, UnauthorizedError } from '../error';

const getCredentials = session => new Promise((resolve, reject) => {
  const { req } = session;
  const authorization = req.headers.authorization;

  if (!authorization) {
    reject({
      error: new UnauthorizedError({
        createdAt: moment().valueOf(),
        message: 'Authentication fails. You did not provide an API key.',
      }),
    });
    return;
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    reject({
      error: new BadRequestError({
        createdAt: moment().valueOf(),
        message: 'Bad request',
      }),
    });
    return;
  }

  const scheme = parts[0];
  const credentials = new Buffer(parts[1], 'base64').toString();
  const index = credentials.indexOf(':');

  if (scheme !== 'Basic' || index < 0) {
    reject({
      error: new BadRequestError({
        createdAt: moment().valueOf(),
        message: 'Bad request',
      }),
    });
    return;
  }

  const secretKey = credentials.slice(0, index);
  session.setSecretKey(secretKey);

  resolve(session);
});

const authenticate = session => new Promise((resolve, reject) => {
  const { secretKey } = session;
  const isLive = secretKey.indexOf('live') >= 0;
  const isTest = secretKey.indexOf('test') >= 0;

  if (!isLive && !isTest) {
    reject({
      error: new UnauthorizedError({
        createdAt: moment().valueOf(),
        message: `Invalid API Key provided: ${secretKey}`,
      }),
    });
    return;
  }

  mongo.connect().then(() => {
    const { UsersDB } = mongo.getDB(secretKey);
    const query = isLive ? {
      'private.secretKey': secretKey,
    } : {
      'private.secretTestKey': secretKey,
    };

    session.setMongo(mongo);

    UsersDB.findOne(query).then((user) => {
      if (user) {
        session.setUser(user);
        resolve(session);
      } else {
        reject({
          error: new UnauthorizedError({
            createdAt: moment().valueOf(),
            message: `Invalid API Key provided: ${secretKey}`,
          }),
        });
      }
    });
  }).catch(({ error }) => {
    reject({ error });
  });
});

export {
  getCredentials,
  authenticate,
};
