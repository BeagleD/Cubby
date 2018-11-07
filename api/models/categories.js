import categories from '../libs/categories';
import handleRequest from '../middlewares/request';

class Categories {
  constructor() {
    this.retrieve = handleRequest.bind(undefined, this.retrieve);
  }

  retrieve(session) {
    return new Promise((resolve) => {
      session.setResponse(categories);
      // console.log('session.response =\n', session.response);
      // console.log('session =\n', session);
      // console.log('session.user =\n', session.user);
      // console.log('categories =\n', categories);
      resolve(session);
    });
  }
}

export default Categories;
