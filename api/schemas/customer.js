import SimpleSchema from 'node-simple-schema';

// add ssn regular expression
SimpleSchema.RegEx.SSNLast4 = /^\d{4}$/;
SimpleSchema._globalMessages.regEx.push({
  exp: SimpleSchema.RegEx.SSNLast4, msg: '[label] must be 4 digits',
});

const Address = new SimpleSchema({
  city: { type: String },
  country: { type: String },
  line1: { type: String },
  line2: { type: String },
  postalCode: { type: String, regEx: SimpleSchema.RegEx.ZipCode },
  state: { type: String },
});

const LegalEntity = new SimpleSchema({
  type: { type: String, allowedValues: ['individual', 'company'] },
  firstName: { type: String },
  lastName: { type: String },
  ssnLast4: { type: String, regEx: SimpleSchema.RegEx.SSNLast4 },
  birthdate: { type: Number },
  address: { type: Address },
});

const Customer = new SimpleSchema({
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  legalEntity: { type: LegalEntity },
  metadata: { type: Object, blackbox: true, optional: true },
});

export default Customer;
