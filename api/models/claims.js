import handleRequest from '../middlewares/request';

class Claims {
  constructor() {
    this.create = handleRequest.bind(undefined, this.create);
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
  }

  create(session) {
    return new Promise((resolve) => {
      session.setResponse({});
      resolve(session);
    });
  }

  retrieve(session) {
    return new Promise((resolve) => {
      session.setResponse({});
      resolve(session);
    });
  }
}

export default Claims;
