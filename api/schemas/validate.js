const validate = (context, data, session) => new Promise((resolve, reject) => {
  if (!context.validate(data)) {
    const fields = context.invalidKeys();
    const message = [];

    for (const i in fields) {
      const { name } = fields[i];
      message.push(`${name}: ${context.keyErrorMessage(name)}`);
    }

    reject({ message: message.join('; ') });
  } else {
    resolve(session);
  }
});

export default validate;
