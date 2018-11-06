import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

/**
* @api {post} /policies/quote 1. Generate policy quote
* @apiVersion 0.1.0
* @apiName QuotePolicy
* @apiGroup Policy
* @apiDescription Generate a token used to create a policy
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/policies/quote \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d startDate=1474473004564 \
*     -d endDate=1475473004564 \
*     -d currency=usd \
*     -d customer="cus_dD2r2Ib8kPMhg5C3YvlqRwb7" \
*     -d renter="cus_eN7LTGZnFboRULALItgd1qBk" \
*     -d "product[name]=iPhone 7" \
*     -d "product[category]=Electronics" \
*     -d "product[subcategory]=Cell Phones %26 Accessories" \
*     -d "product[manufacturer]=Apple" \
*     -d "product[value]=64900" \
*     -d "description=Policy for iPhone 7"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.policies.quote({
*     customer: 'cus_dD2r2Ib8kPMhg5C3YvlqRwb7',
*     renter: 'cus_eN7LTGZnFboRULALItgd1qBk',
*     currency: 'usd',
*     startDate: 1474473004564,
*     endDate: 1475473004564,
*     product: {
*       name: 'iPhone 7',
*       category: 'Electronics',
*       subcategory: 'Cell Phones & Accessories',
*       manufacturer: 'Apple',
*       value: 64900
*     },
*     description: 'Policy for iPhone 7',
*     metadata: {}
*   }).then(function(quote) {
*     console.log(quote);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   policy = sharetempus.policies.quote({
*     customer: "cus_dD2r2Ib8kPMhg5C3YvlqRwb7",
*     renter: "cus_eN7LTGZnFboRULALItgd1qBk",
*     currency: "usd",
*     startDate: 1474473004564,
*     endDate: 1475473004564,
*     product: {
*       name: "iPhone 7",
*       category: "Electronics",
*       subcategory: "Cell Phones & Accessories",
*       manufacturer: "Apple",
*       value: 64900
*     },
*     description: "Policy for iPhone 7",
*     metadata: {}
*   });
*   print(policy);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {Number} startDate Start date of policy active period
* @apiParam {Number} endDate End date of policy active period
* @apiParam {String} currency Currency type
* @apiParam {String} customer Customer id
* @apiParam {String} renter (optional) Customer id
* @apiParam {Object} product Product data
* @apiParam {String} product.name Product name
* @apiParam {String} product.category Product category (based in our <a href="#api-Categories-GetCategories">categories</a>)
* @apiParam {String} product.subcategory Product subcategory (based in our <a href="#api-Categories-GetCategories">subcategories</a>)
* @apiParam {String} product.manufacturer Product manufacturer
* @apiParam {String} product.value Product value
* @apiParam {String} description (optional) Description
* @apiParam {Object} metadata (optional) Metadata
*
* @apiSuccess {String} token Token used to create the policy
* @apiSuccess {Number} quote Policy quote
*
* @apiSuccessExample Response (example):
*  {
*    token: "tok_Q1gBkjj8wdAkOg0pj8bf8uQO",
*    quote: 200
*  }
*
* @apiError 400/bad_request_error The request was unacceptable, often due to a invalid or missing parameter.
* @apiError 401/unauthorized_error No valid API key provided.
* @apiError 402/invalid_request_error The parameters were valid but the request failed.
* @apiError 500/api_error Something went wrong on api
*
* @apiErrorExample {json} Error-Response (example):
*  {
*    "error": {
*      "type": "bad_request_error",
*      "status": 400,
*      "message": "{\"product.name\":\"Name is required\",\"customer\":\"Customer is required\"}",
*    }
*  }
*
*/
router.post('/policies/quote', (req, res, next) => {
  ShareTempus.policies.quote({ req, res, next });
});

/**
* @api {post} /policies/create 2. Create new policy
* @apiVersion 0.1.0
* @apiName CreatePolicy
* @apiGroup Policy
* @apiDescription Create a new policy using the token generated by quote method
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/policies/create \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d token="tok_Q1gBkjj8wdAkOg0pj8bf8uQO"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.policies.create({
*     token: 'tok_Q1gBkjj8wdAkOg0pj8bf8uQO'
*   }).then(function(policy) {
*     console.log(policy);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   policy = sharetempus.policies.create({
*     token: "tok_Q1gBkjj8wdAkOg0pj8bf8uQO"
*   });
*   print(policy);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} token Token used to create the policy
*
* @apiSuccess {Number} startDate Start date of policy active period
* @apiSuccess {Number} endDate End date of policy active period
* @apiSuccess {String} currency Currency type
* @apiSuccess {String} customer Customer id
* @apiSuccess {String} renter Customer id
* @apiSuccess {Object} product Product data
* @apiSuccess {String} product.name Product name
* @apiSuccess {String} product.category Product category (based in our <a href="#api-Categories-GetCategories">categories</a>)
* @apiSuccess {String} product.subcategory Product subcategory (based in our <a href="#api-Categories-GetCategories">subcategories</a>)
* @apiSuccess {String} product.manufacturer Product manufacturer
* @apiSuccess {String} product.value Product value
* @apiSuccess {String} description Description
* @apiSuccess {String} id Policy id
* @apiSuccess {String} ticket Claim ticket
* @apiSuccess {Number} quote Policy quote
* @apiSuccess {String} createdAt Policy creation date
* @apiSuccess {Object} metadata Metadata
*
* @apiSuccessExample Response (example):
*  {
*    "startDate": 1463108400000,
*    "endDate": 1463194800000,
*    "currency": "usd",
*    "customer": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "renter": "cus_eN7LTGZnFboRULALItgd1qBk",
*    "product": {
*      "name": "iPhone 7",
*      "category": "Electronics",
*      "subcategory": "Cell Phones & Accessories",
*      "manufacturer": "Apple",
*      "value": 64900
*    },
*    "description": "Policy for iPhone 7",
*    "id": "pol_Re2UTmiZNd6hvn3eklRNOWET",
*    "ticket": "ticket_xB5CE0Xj",
*    "quote": 200,
*    "createdAt": 1473458389559
*  }
*
* @apiError 400/bad_request_error The request was unacceptable, often due to a invalid or missing parameter.
* @apiError 401/unauthorized_error No valid API key provided.
* @apiError 402/invalid_request_error The parameters were valid but the request failed.
* @apiError 500/api_error Something went wrong on api
*
* @apiErrorExample {json} Error-Response (example):
*  {
*    "error": {
*      "type": "invalid_request_error",
*      "status": 402,
*      "message": "Token invalid or expired"
*    }
*  }
*
*/
router.post('/policies/create', (req, res, next) => {
  ShareTempus.policies.create({ req, res, next });
});

/**
* @api {post} /policies/update 3. Update a policy
* @apiVersion 0.1.0
* @apiName UpdatePolicy
* @apiGroup Policy
* @apiDescription Update a created policy. This method allows only update
* description and medatada properties.
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/policies/update \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d id="pol_Re2UTmiZNd6hvn3eklRNOWET" \
*     -d description="New description for Policy for iPhone 7"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.policies.update({
*     id: "pol_Re2UTmiZNd6hvn3eklRNOWET",
*     description: "New description for Policy for iPhone 7"
*   }).then(function(policy) {
*     console.log(policy);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   policy = sharetempus.policies.update({
*     id: "pol_Re2UTmiZNd6hvn3eklRNOWET",
*     description: "New description for Policy for iPhone 7"
*   });
*   print(policy);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} id Policy id
* @apiParam {String} description (optional) Description
* @apiParam {Object} metadata (optional) Metadata
*
* @apiSuccess {Number} startDate Start date of policy active period
* @apiSuccess {Number} endDate End date of policy active period
* @apiSuccess {String} currency Currency type
* @apiSuccess {String} customer Customer id
* @apiSuccess {String} renter Customer id
* @apiSuccess {Object} product Product data
* @apiSuccess {String} product.name Product name
* @apiSuccess {String} product.category Product category (based in our <a href="#api-Categories-GetCategories">categories</a>)
* @apiSuccess {String} product.subcategory Product subcategory (based in our <a href="#api-Categories-GetCategories">subcategories</a>)
* @apiSuccess {String} product.manufacturer Product manufacturer
* @apiSuccess {String} product.value Product value
* @apiSuccess {String} description Description
* @apiSuccess {String} id Policy id
* @apiSuccess {String} ticket Claim ticket
* @apiSuccess {Number} quote Policy quote
* @apiSuccess {String} createdAt Policy creation date
* @apiSuccess {Object} metadata Metadata
*
* @apiSuccessExample Response (example):
*  {
*    "startDate": 1463108400000,
*    "endDate": 1463194800000,
*    "currency": "usd",
*    "customer": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "renter": "cus_eN7LTGZnFboRULALItgd1qBk",
*    "product": {
*      "name": "iPhone 7",
*      "category": "Electronics",
*      "subcategory": "Cell Phones & Accessories",
*      "manufacturer": "Apple",
*      "value": 64900
*    },
*    "description": "New description for Policy for iPhone 7",
*    "id": "pol_Re2UTmiZNd6hvn3eklRNOWET",
*    "ticket": "ticket_xB5CE0Xj",
*    "quote": 200,
*    "createdAt": 1473458389559
*  }
*
* @apiError 400/bad_request_error The request was unacceptable, often due to a invalid or missing parameter.
* @apiError 401/unauthorized_error No valid API key provided.
* @apiError 402/invalid_request_error The parameters were valid but the request failed.
* @apiError 500/api_error Something went wrong on api
*
* @apiErrorExample {json} Error-Response (example):
*  {
*    "error": {
*      "type": "bad_request_error",
*      "status": 400,
*      "message": "{\"currency\":\"currency is not allowed by the schema\"}",
*    }
*  }
*
*/
router.post('/policies/update', (req, res, next) => {
  ShareTempus.policies.update({ req, res, next });
});

/**
* @api {get} /policies/:policy 4. Retrieve policy
* @apiVersion 0.1.0
* @apiName RetrievePolicy
* @apiGroup Policy
* @apiDescription Retrieve a created policy
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/policies/pol_Re2UTmiZNd6hvn3eklRNOWET \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.policies.retrieve({
*     policy: 'pol_Re2UTmiZNd6hvn3eklRNOWET'
*   }).then(function(policy) {
*     console.log(policy);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*     from sharetempus import ShareTempus;
*     sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*     policy = sharetempus.policies.retrieve({
*       policy: "pol_Re2UTmiZNd6hvn3eklRNOWET"
*     });
*     print(policy);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} policy Policy id
*
* @apiSuccess {Number} startDate Start date of policy active period
* @apiSuccess {Number} endDate End date of policy active period
* @apiSuccess {String} currency Currency type
* @apiSuccess {String} customer Customer id
* @apiSuccess {String} renter Customer id
* @apiSuccess {Object} product Product data
* @apiSuccess {String} product.name Product name
* @apiSuccess {String} product.category Product category (based in our <a href="#api-Categories-GetCategories">categories</a>)
* @apiSuccess {String} product.subcategory Product subcategory (based in our <a href="#api-Categories-GetCategories">subcategories</a>)
* @apiSuccess {String} product.manufacturer Product manufacturer
* @apiSuccess {String} product.value Product value
* @apiSuccess {String} description Description
* @apiSuccess {String} id Policy id
* @apiSuccess {String} ticket Claim ticket
* @apiSuccess {Number} quote Policy quote
* @apiSuccess {String} createdAt Policy creation date
* @apiSuccess {Object} metadata Metadata
*
* @apiSuccessExample Response (example):
*  {
*    "startDate": 1463108400000,
*    "endDate": 1463194800000,
*    "currency": "usd",
*    "customer": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "renter": "cus_eN7LTGZnFboRULALItgd1qBk",
*    "product": {
*      "name": "iPhone 7",
*      "category": "Electronics",
*      "subcategory": "Cell Phones & Accessories",
*      "manufacturer": "Apple",
*      "value": 64900
*    },
*    "description": "Policy for iPhone 7",
*    "id": "pol_Re2UTmiZNd6hvn3eklRNOWET",
*    "ticket": "ticket_xB5CE0Xj",
*    "quote": 200,
*    "createdAt": 1473458389559
*  }
*
* @apiError 400/bad_request_error The request was unacceptable, often due to a invalid or missing parameter.
* @apiError 401/unauthorized_error No valid API key provided.
* @apiError 402/invalid_request_error The parameters were valid but the request failed.
* @apiError 500/api_error Something went wrong on api
*
* @apiErrorExample {json} Error-Response (example):
*  {
*    "error": {
*      "type": "invalid_request_error",
*      "status": 402,
*      "message": "Policy pol_Re2UTmiZNd6hvn3eklRNOWET not found"
*    }
*  }
*
*/
router.get('/policies/:policy', (req, res, next) => {
  ShareTempus.policies.retrieve({ req, res, next });
});

export default router;
