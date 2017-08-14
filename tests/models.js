import moment from 'moment';

const CLAIM = {
  subject: 'iPhone 7 Damaged',
  type: 'damaged',
  content: 'My iPhone 7 fell and broke the screen',
};

const CUSTOMER = {
  email: 'email@test.com',
  legalEntity: {
    type: 'individual',
    firstName: 'Trenton',
    lastName: 'Large',
    birthdate: 637124400000,
    ssnLast4: '1234',
    address: {
      city: 'New York City',
      country: 'US',
      line1: 'East 169th Street',
      line2: 'Apt. 2A Bronx',
      postalCode: '10456',
      state: 'New York',
    },
  },
};

const POLICY = {
  currency: 'usd',
  startDate: moment().valueOf(),
  endDate: moment().add(1, 'day').valueOf(),
  description: 'Policy for iPhone 7',
  product: {
    name: 'iPhone 7',
    category: 'Electronics',
    subcategory: 'Cell Phones & Accessories',
    manufacturer: 'Apple',
    value: 64900,
  },
};

export {
  CLAIM,
  CUSTOMER,
  POLICY,
};
