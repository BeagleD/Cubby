import Categories from './categories';

const singleton = Symbol('ShareTempus');
const singletonEnforcer = Symbol('ShareTempusEnforcer');

class ShareTempus {
  constructor() {
    this.categories = new Categories();
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ShareTempus(singletonEnforcer);
    }

    return this[singleton];
  }
}

export default ShareTempus;
