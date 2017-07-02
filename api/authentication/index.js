import moment from 'moment';
import Mongo from '../services/mongo';
import { BadRequestError, UnauthorizedError } from '../error';

const getCredentials = ({ req }) => new Promise((resolve, reject) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    reject(new UnauthorizedError({
      createdAt: moment().valueOf(),
      message: 'Authentication fails. You did not provide an API key.',
    }));
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    reject(new BadRequestError({
      createdAt: moment().valueOf(),
      message: 'Bad request',
    }));
  }

  const scheme = parts[0];
  const credentials = new Buffer(parts[1], 'base64').toString();
  const index = credentials.indexOf(':');

  if (scheme !== 'Basic' || index < 0) {
    reject(new BadRequestError({
      createdAt: moment().valueOf(),
      message: 'Bad request',
    }));
  }

  const secretKey = credentials.slice(0, index);

  resolve({ req, secretKey });
});

const authenticate = ({ req, secretKey }) => new Promise((resolve, reject) => {
  const mongo = new Mongo(secretKey);

  mongo.connect().then(() => {
    const { Users } = mongo.getDB();
    const query = mongo.isLive ? {
      'private.secretKey': secretKey,
    } : {
      'private.secretTestKey': secretKey,
    };

    Users.findOne(query).then((user) => {
      if (user) {
        resolve({ req, user, mongo });
      } else {
        reject(new UnauthorizedError({
          createdAt: moment().valueOf(),
          message: `Invalid API Key provided: ${secretKey}`,
        }));
      }
    });
  }).catch((err) => {
    reject(err);
  });
});

export {
  getCredentials,
  authenticate,
};
