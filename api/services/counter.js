import ClaimsCounter from './counters/claims';
import CustomersCounter from './counters/customers';
import EventsCounter from './counters/events';
import LogsCounter from './counters/logs';
import PaymentsCounter from './counters/payments';
import PoliciesCounter from './counters/policies';

const singleton = Symbol('Counter');
const singletonEnforcer = Symbol('CounterEnforcer');

class Counter {
  constructor() {
    this.claims = new ClaimsCounter();
    this.customers = new CustomersCounter();
    this.events = new EventsCounter();
    this.logs = new LogsCounter();
    this.payments = new PaymentsCounter();
    this.policies = new PoliciesCounter();
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Counter(singletonEnforcer);
    }

    return this[singleton];
  }
}


const counter = Counter.instance;

export default counter;
