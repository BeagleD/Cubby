import SimpleSchema from 'node-simple-schema';

const PolicyUpdate = new SimpleSchema({
  id: { type: String },
  description: { type: String, optional: true },
  metadata: { type: Object, blackbox: true, optional: true },
});

module.exports = PolicyUpdate;
