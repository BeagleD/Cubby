function increment(method, { session, data }) {
  findCounter({ session, data })
    .then(method)
    .then(update);
}

function findCounter({ session, data }) {
  return new Promise((resolve) => {
    const { mongo, secretKey } = session;
    const { userId } = data;
    const { CounterDB } = mongo.getDB(secretKey);

    CounterDB.findOne({ userId }).then((counter) => {
      if (counter) {
        resolve({ session, counter, data });
      } else {
        createCounter({ session, data }).then(resolve);
      }
    });
  });
}

function createCounter({ session, data }) {
  return new Promise((resolve) => {
    const { mongo, secretKey } = session;
    const { userId } = data;
    const { CounterDB } = mongo.getDB(secretKey);

    const counter = { userId };

    CounterDB.insert(counter, (error) => {
      if (!error) {
        resolve({ session, counter, data });
      }
    });
  });
}

function update({ session, counter, query }) {
  const { mongo, secretKey } = session;
  const { userId } = counter;
  const { CounterDB } = mongo.getDB(secretKey);

  CounterDB.update({
    userId,
  }, {
    $inc: query,
  });
}

export default increment;
