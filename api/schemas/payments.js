import SimpleSchema from 'node-simple-schema';

const Payments = new SimpleSchema({
  userId: { type: String },
  createdAt: { type: Number },
  expires: { type: Number },
  status: { type: String },
  year: { type: Number },
  month: { type: Number },
  value: { type: Number },
  policies: { type: Array },
});

export default Payments;
