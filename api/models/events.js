import moment from 'moment';
import handleRequest from '../middlewares/request';
import {
  BadRequestError,
  InvalidRequestError,
} from '../error';

class Events {
  constructor() {
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
  }

  retrieve(session) {
    return new Promise((resolve, reject) => {
      const { req, mongo, userId, secretKey } = session;
      const { EventsDB } = mongo.getDB(secretKey);
      const id = req.params.event;

      if (id) {
        EventsDB.findOne({ id, userId }).then((event) => {
          if (event) {
            session.setResponse(event, 'events');
            resolve(session);
          } else {
            reject({
              error: new InvalidRequestError({
                createdAt: moment().valueOf(),
                message: `Event ${id} not found`,
                data: event,
              }),
            });
          }
        });
      } else {
        reject({
          error: new BadRequestError({
            message: 'Event id not provided',
            data: {},
          }),
        });
      }
    });
  }
}

export default Events;
