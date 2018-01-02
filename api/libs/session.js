import moment from 'moment';
import randomid from 'randomid';
import eventTypes from './event_types';
import Webhook from '../services/webhook';
import Counter from '../services/counter';

class Session {
  constructor({ req, res, next }) {
    this.req = req;
    this.reqBody = req.body && typeof req.body === 'object' ?
      JSON.parse(JSON.stringify(req.body)) : undefined;
    this.res = res;
    this.next = next;
    this.secretKey = undefined;
    this.mongo = undefined;
    this.user = undefined;
    this.userId = undefined;
    this.logUserId = undefined;
    this.response = undefined;
    this.error = undefined;
  }

  setSecretKey(secretKey) {
    this.secretKey = secretKey;
  }

  setMongo(mongo) {
    this.mongo = mongo;
  }

  setUser(user) {
    this.user = user;
    this.userId = user._id;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setError(error) {
    this.error = error;
  }

  setResponse(response, type) {
    const keys = {
      claims: ['_id', 'userId'],
      customers: ['_id', 'userId'],
      events: ['_id', 'userId'],
      policies: ['_id', 'userId', 'private'],
    };
    const keysToRemove = keys[type];
    this.logUserId = response.userId || this.userId;

    if (keysToRemove) {
      this.response = {};

      for (const key in response) {
        if (keysToRemove.indexOf(key) < 0) {
          this.response[key] = response[key];
        }
      }
    } else {
      this.response = response;
    }
  }

  generateLog() {
    const { req, mongo, secretKey, reqBody } = this;

    if (mongo) {
      const {
        connection,
        headers,
        method,
        originalUrl,
        params,
        query,
      } = req;
      const { LogsDB } = mongo.getDB(secretKey);
      const userId = this.logUserId || this.userId;
      const responseBody = this.error || this.response;
      let status = responseBody.status || 200;

      // for claims
      if (responseBody.status === 'opened') {
        status = 200;
      }

      const log = {
        method,
        params,
        query,
        responseBody,
        status,
        userId,
        id: `req_${randomid(24)}`,
        createdAt: moment().valueOf(),
        url: originalUrl,
        ip: headers['x-forwarded-for'] || connection.remoteAddress,
        source: headers['user-agent'] || 'unknown',
        requestBody: reqBody,
      };

      LogsDB.insert(log).then((newLog) => {
        if (newLog) {
          Counter.logs.increment({ session: this, data: log });
          this.generateEvent({ log, userId });
        }
      });
    }
  }

  generateEvent({ log, userId }) {
    let url = log.url.replace('/v1/', '');

    if (log.status !== 200) {
      url += '/failed';
    }

    const type = eventTypes[url];

    if (type) {
      const { mongo, secretKey } = this;
      const isLive = secretKey.indexOf('live') >= 0;
      const { EventsDB } = mongo.getDB(secretKey);
      const event = {
        type,
        userId,
        id: `evt_${randomid(24)}`,
        createdAt: moment().valueOf(),
        request: log.id,
        isLiveMode: isLive,
        data: log.responseBody,
      };

      EventsDB.insert(event).then((newEvent) => {
        if (newEvent) {
          Counter.events.increment({ session: this, data: event });
          Webhook.send(this, event);
        }
      });
    }
  }
}

export default Session;
