import { getCredentials, authenticate } from '../authentication';

class Session {
  constructor(fn, args) {
    this.fn = fn;
    this.args = args;
  }

  run() {
    const { req, res } = this.args;

    getCredentials({ req })
      .then(authenticate)
      .then(this.fn)
      .then(({ mongo, response }) => {
        mongo.close();
        res.send(response);
      })
      .catch((err) => {
        if (err.status === 401) {
          res.setHeader('WWW-Authenticate', 'Basic');
        }
        res.send({ error: err.send() });
      });
  }
}

export default Session;
