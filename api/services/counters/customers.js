import increment from './increment';

class CustomerCounter {
  constructor() {
    this.increment = increment.bind(undefined, this.increment);
  }

  increment({ session, counter }) {
    return new Promise((resolve, reject) => {
      
    });
  }
}

export default CustomerCounter;
