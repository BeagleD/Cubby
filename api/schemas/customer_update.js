import SimpleSchema from 'node-simple-schema';

// add ssn regular expression
SimpleSchema.RegEx.SSNLast4 = /^\d{4}$/;
SimpleSchema._globalMessages.regEx.push({
  exp: SimpleSchema.RegEx.SSNLast4, msg: '[label] must be 4 digits',
});

const Address = new SimpleSchema({
  city: { type: String, optional: true },
  country: { type: String, optional: true },
  line1: { type: String, optional: true },
  line2: { type: String, optional: true },
  postalCode: { type: String, regEx: SimpleSchema.RegEx.ZipCode, optional: true },
  state: { type: String, optional: true },
});

const LegalEntity = new SimpleSchema({
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  ssnLast4: { type: String, regEx: SimpleSchema.RegEx.SSNLast4, optional: true },
  birthdate: { type: Number, optional: true },
  address: { type: Address, optional: true },
});

const CustomerUpdate = new SimpleSchema({
  id: { type: String },
  email: { type: String, regEx: SimpleSchema.RegEx.Email, optional: true },
  legalEntity: { type: LegalEntity, optional: true },
  metadata: { type: Object, blackbox: true, optional: true },
});

export default CustomerUpdate;
