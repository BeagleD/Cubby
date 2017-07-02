import categories from '../libs/categories';
import handleRequest from '../middlewares/request';

class Categories {
  constructor() {
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
  }

  retrieve({ mongo }) {
    return new Promise((resolve) => {
      resolve({ mongo, response: categories });
    });
  }
}

export default Categories;
