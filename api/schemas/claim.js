import SimpleSchema from 'node-simple-schema';

const Policy = new SimpleSchema({
  id: { type: String },
  ticket: { type: String },
});

const Claim = new SimpleSchema({
  subject: { type: String },
  type: { type: String, allowedValues: ['damaged', 'stolen'] },
  content: { type: String },
  images: { type: Array, optional: true },
  'images.$': { type: String, optional: true },
  policy: { type: Policy },
});

export default Claim;
