import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

/**
* @api {get} /categories 1. Retrieve categories
* @apiVersion 0.1.0
* @apiName GetCategories
* @apiGroup Categories
* @apiDescription Retrieve the product categories used to get a policy quote
*
* @apiExample {curl} curl
*   curl http://api.sharetempus.com/v1/categories \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.categories.retrieve().then(function(categories) {
*     console.log(categories);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   categories = sharetempus.categories.retrieve();
*   print(categories);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiSuccess {Object} categories Categories object
*
* @apiError 401/unauthorized_error No valid API key provided.
*
*/
router.get('/categories', (req, res, next) => {
  ShareTempus.categories.retrieve({ req, res, next });
});

export default router;
