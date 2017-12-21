const eventTypes = {
  'customers/create': 'customer.created',
  'customers/create/failed': 'customer.create.failed',
  'customers/update': 'customer.updated',
  'customers/update/failed': 'customer.update.failed',
  'policies/quote': 'policy.quoted',
  'policies/quote/failed': 'policy.quote.failed',
  'policies/create': 'policy.created',
  'policies/create/failed': 'policy.create.failed',
  'policies/update': 'policy.updated',
  'policies/update/failed': 'policy.update.failed',
  'claims/create': 'claim.created',
  'claims/create/failed': 'claim.create.failed',
};

export default eventTypes;
