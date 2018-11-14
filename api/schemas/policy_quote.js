import SimpleSchema from 'node-simple-schema';

const Product = new SimpleSchema({
  name: { type: String },
  category: { type: String },
  subcategory: { type: String },
  manufacturer: { type: String, optional: true },
  value: { type: Number },
});

const PolicyQuote = new SimpleSchema({
  customer: { type: String },   // asset-owner
  renter: {type: String }, // asset-renter
  startDate: { type: Number },
  endDate: { type: Number },
  currency: { type: String },
  product: { type: Product },
  description: { type: String, optional: true },
  metadata: { type: Object, blackbox: true, optional: true },
});

// console.log('PolicyQuote =\n', PolicyQuote);
export default PolicyQuote;
