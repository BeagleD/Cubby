import SimpleSchema from 'node-simple-schema';

const Policy = new SimpleSchema({
  token: { type: String },
});

module.exports = Policy;
