const counters = [];

function increment(method, { session }) {
  const { userId } = session;
  const ids = counters.map(counter => counter.userId);

  if (ids.indexOf(userId) < 0) {
    findCounter({ session })
      .then(method)
      .then(update);
  } else {
    // wait user counter finish until start another
    setTimeout(() => {
      increment(method, { session });
    }, 5000);
  }
}

function findCounter({ session }) {
  return new Promise((resolve) => {
    const { mongo, secretKey, userId } = session;
    const CounterDB = mongo.getDb(secretKey);

    CounterDB.findOne({ userId }).then((counter) => {
      if (counter) {
        counters.push(counter);
        resolve({ session, counter });
      } else {
        createCounter({ session }).then(resolve);
      }
    });
  });
}

function createCounter({ session }) {
  return new Promise((resolve) => {
    const { mongo, userId, secretKey } = session;
    const { CounterDB } = mongo.getDb(secretKey);

    const counter = {
      userId,
      claims: {
        total: 0,
        customers: {},
      },
      customers: {
        total: 0,
      },
      events: {
        total: 0,
      },
      logs: {
        total: 0,
      },
      policies: {
        total: 0,
        canceled: 0,
        value: 0,
        canceledValue: 0,
        customers: {},
      },
      payments: {
        total: 0,
      },
    };

    CounterDB.insert(counter, (error) => {
      if (!error) {
        resolve({ session, counter });
      }
    });
  });
}

function update({ session }) {
  if (counters.length > 0) {
    const { mongo } = session;
    const { CounterDB } = mongo.getDb();
    const counter = counters[0];

    CounterDB.update({
      userId: counter.userId,
    }, {
      $set: counter,
    }, (error) => {
      if (!error) {
        counters.splice(0, 1);
      }

      update({ session });
    });
  }
}

export default increment;
