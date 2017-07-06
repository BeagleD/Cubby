import ClaimSchema from './claim';
import CustomerUpdateSchema from './customer_update';
import CustomerSchema from './customer';
import PolicyQuoteSchema from './policy_quote';
import PolicyUpdateSchema from './policy_update';
import PolicySchema from './policy';

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

export {
  ClaimSchema,
  CustomerUpdateSchema,
  CustomerSchema,
  PolicyQuoteSchema,
  PolicyUpdateSchema,
  PolicySchema,
  validate,
};
