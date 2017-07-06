import Categories from './categories';
import Customers from './customers';

const singleton = Symbol('ShareTempus');
const singletonEnforcer = Symbol('ShareTempusEnforcer');

class ShareTempus {
  constructor() {
    this.categories = new Categories();
    this.customers = new Customers();
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ShareTempus(singletonEnforcer);
    }

    return this[singleton];
  }
}

export default ShareTempus;
