import categories from '../libs/categories';
import handleRequest from '../middlewares/request';

class Categories {
  constructor() {
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
  }

  retrieve(session) {
    return new Promise((resolve) => {
      session.setResponse(categories);
      resolve(session);
    });
  }
}

export default Categories;
