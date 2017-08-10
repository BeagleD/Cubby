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
    this.response = undefined;
    this.error = undefined;

    // if (req && req.body && typeof req.body === 'object') {
    //   console.log(req.body);
    //   this.reqBody = JSON.parse(JSON.strigify(req.body));
    // }
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

  setResponse(response, type) {
    const keys = {
      customers: ['_id', 'userId'],
      policies: ['_id', 'userId', 'private'],
    };
    const keysToRemove = keys[type];

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

  setError(error) {
    this.error = error;
  }
}

export default Session;
