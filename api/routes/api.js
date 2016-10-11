(function() {
    "use strict";

    var express = require('express'),
        router = express.Router(),
        mongo = require('../services/mongo'),
        randomid = require('randomid'),
        RateLimit = require('express-rate-limit'),
        Agent = require('../services/agent'),
        Categories = require('../models/categories'),
        Customers = require('../models/customers'),
        Policies = require('../models/policies');

    // request limiter
    var limiter = {
        get: new RateLimit({
            windowMs: 1*60*1000, // 1 minutes
            max: 100,
            delayMs: 0
        }),
        post: new RateLimit({
            windowMs: 10*60*1000, // 10 minutes
            max: 100,
            delayMs: 0
        }),
    }

    // schedules
    Policies.startPoliciesSchedules();

    /**
     * @api {get} /categories 1. Retrieve categories
     * @apiVersion 0.1.0
     * @apiName GetCategories
     * @apiGroup Categories
     * @apiDescription Retrieve the product categories used to get a policy quote
     *
     * @apiExample {curl} curl
     *     curl http://api.sharetempus.com/v1/categories \
	 *         -u sk_test_wCPyemzK7r6ZYaiRkEqzNvFN:
     *
     * @apiExample {node} node
     *     var ShareTempus = require('sharetempus')('sk_test_wCPyemzK7r6ZYaiRkEqzNvFN');
     *
     *     ShareTempus.categories.retrieve()
     *       .then(function(categories) {
     *         console.log(categories);
     *     }).catch(function(error) {
     *         console.log(error);
     *     });
     *
     * @apiHeader Authorization Basic Access Authentication token.
     *
     * @apiSuccess {Object} categories Categories object
     *
     * @apiError 401/Unauthorized No valid API key provided.
     *
     */
    router.get('/categories', limiter.get, function(req, res, next) {
        res.send(JSON.stringify(Categories.getCategories(), null, 2));
    });

    /**
     * @api {post} /customers/create 1. Create new customer
     * @apiVersion 0.1.0
     * @apiName CreateCustomer
     * @apiGroup Customer
     * @apiDescription Created a new customer
     *
     * @apiExample {curl} curl
     *     curl http://api.sharetempus.com/v1/customers/create \
	 *         -u sk_test_wCPyemzK7r6ZYaiRkEqzNvFN: \
	 *         -d email="email@test.com" \
	 *         -d "legalEntity[type]=individual" \
	 *         -d "legalEntity[firstName]=Trenton" \
	 *         -d "legalEntity[lastName]=Large" \
	 *         -d "legalEntity[birthdate]=637124400000" \
	 *         -d "legalEntity[ssnLast4]=1234" \
	 *         -d "legalEntity[address][city]=New York City" \
	 *         -d "legalEntity[address][country]=US" \
	 *         -d "legalEntity[address][line1]=East 169th Street" \
	 *         -d "legalEntity[address][line2]=Apt. 2A Bronx" \
	 *         -d "legalEntity[address][postalCode]=10456" \
	 *         -d "legalEntity[address][state]=New York"
     *
     * @apiExample {node} node
     *    var ShareTempus = require('sharetempus')('sk_test_wCPyemzK7r6ZYaiRkEqzNvFN');
     *
     *    ShareTempus.customers.create({
     *         "email": "email@test.com",
     *         "legalEntity": {
     *             "type": "individual",
     *             "firstName": "Trenton",
     *             "lastName": "Large",
     *             "birthdate": 637124400000,
     *             "ssnLast4": "1234",
     *             "address": {
     *                 "city": "New York City",
     *                 "country": "US",
     *                 "line1": "East 169th Street",
     *                 "line2": "Apt. 2A Bronx",
     *                 "postalCode": "10456",
     *                 "state": "New York"
     *             }
     *         }
     *     }).then(function(customer) {
     *         console.log(customer);
     *     }).catch(function(error) {
     *         console.log(error);
     *     });
     *
     * @apiHeader Authorization Basic Access Authentication token.
     *
     * @apiParam {String} email Customer email
     * @apiParam {Object} legalEntity Legal entity data
     * @apiParam {String} legalEntity.type Legal entity type
     * @apiParam {String} legalEntity.firstName Customer first name
     * @apiParam {String} legalEntity.lastName Customer last name
     * @apiParam {Number} legalEntity.birthdate Customer birthdate
     * @apiParam {String} legalEntity.ssnLast4 Customer last 4 digits of SSN
     * @apiParam {Object} legalEntity.address Customer address data
     * @apiParam {String} legalEntity.address.city Customer city
     * @apiParam {String} legalEntity.address.country Customer country
     * @apiParam {String} legalEntity.address.line1 Customer line 1
     * @apiParam {String} legalEntity.address.line2 Customer line 2
     * @apiParam {String} legalEntity.address.postalCode Customer postal code
     * @apiParam {String} legalEntity.address.state Customer state
     * @apiParam {Object} metadata (optional) Metadata
     *
     * @apiSuccess {String} email Customer email
     * @apiSuccess {Object} legalEntity Legal entity data
     * @apiSuccess {String} legalEntity.type Legal entity type
     * @apiSuccess {String} legalEntity.firstName Customer first name
     * @apiSuccess {String} legalEntity.lastName Customer last name
     * @apiSuccess {Number} legalEntity.birthdate Customer birthdate
     * @apiSuccess {String} legalEntity.ssnLast4 Customer last 4 digits of SSN
     * @apiSuccess {Object} legalEntity.address Customer address data
     * @apiSuccess {String} legalEntity.address.city Customer city
     * @apiSuccess {String} legalEntity.address.country Customer country
     * @apiSuccess {String} legalEntity.address.line1 Customer line 1
     * @apiSuccess {String} legalEntity.address.line2 Customer line 2
     * @apiSuccess {String} legalEntity.address.postalCode Customer postal code
     * @apiSuccess {String} legalEntity.address.state Customer state
     * @apiSuccess {String} id Customer id
     * @apiSuccess {Number} createdAt Custome creation date
     *
     * @apiSuccessExample {json} Response (example):
     *  {
     *      "email": "email@test.com",
     *      "legalEntity": {
     *          "type": "individual",
     *          "firstName": "Trenton",
     *          "lastName": "Large",
     *          "birthdate": 637124400000,
     *          "ssnLast4": "1234",
     *              "address": {
     *              "city": "New York City",
     *              "country": "US",
     *              "line1": "East 169th Street",
     *              "line2": "Apt. 2A Bronx",
     *              "postalCode": "10456",
     *              "state": "New York"
     *          }
     *      },
     *      "id": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
     *      "createdAt": 1473458205461
     *  }
     *
     * @apiError 400/STBadRequestError The request was unacceptable, often due to a invalid or missing parameter.
     * @apiError 401/Unauthorized No valid API key provided.
     * @apiError 402/STInvalidRequestError The parameters were valid but the request failed.
     * @apiError 500/STServerError Something went wrong on api
     *
     * @apiErrorExample {json} Error-Response (example):
     *  {
     *      "error": {
     *          "type": "STBadRequestError",
     *          "status": 400,
     *          "message": "Invalid parameter(s)",
     *          "details": "{\"legalEntity.birthdate\":\"Birthdate is required\"}"
     *      }
     *  }
     *
     */
    router.post('/customers/create', limiter.post, function(req, res, next) {
        Customers.create(req, res, next);
    });

    /**
     * @api {get} /customers/:customer 2. Retrieve customer
     * @apiVersion 0.1.0
     * @apiName RetrieveCustomer
     * @apiGroup Customer
     * @apiDescription Retrieve a created customer
     *
     * @apiExample {curl} curl
     *     curl http://api.sharetempus.com/v1/customers/cus_oC3ImnDw1Iqw1b3sx5CITtbc \
     *          -u sk_test_wCPyemzK7r6ZYaiRkEqzNvFN:
     *
     * @apiExample {curl} curl
     *     var ShareTempus = require('sharetempus')('sk_test_wCPyemzK7r6ZYaiRkEqzNvFN');
     *
     *     ShareTempus.customers.retrieve({
     *          customer: "cus_oC3ImnDw1Iqw1b3sx5CITtbc"
     *     }).then(function(customer) {
     *          console.log(customer);
     *     }).catch(function(error) {
     *          console.log(error);
     *     });
     *
     * @apiHeader Authorization Basic Access Authentication token.
     *
     * @apiParam {String} customer Customer ID
     *
     * @apiSuccess {String} email Customer email
     * @apiSuccess {Object} legalEntity Legal entity data
     * @apiSuccess {String} legalEntity.type Legal entity type
     * @apiSuccess {String} legalEntity.firstName Customer first name
     * @apiSuccess {String} legalEntity.lastName Customer last name
     * @apiSuccess {Number} legalEntity.birthdate Customer birthdate
     * @apiSuccess {String} legalEntity.ssnLast4 Customer last 4 digits of SSN
     * @apiSuccess {Object} legalEntity.address Customer address data
     * @apiSuccess {String} legalEntity.address.city Customer city
     * @apiSuccess {String} legalEntity.address.country Customer country
     * @apiSuccess {String} legalEntity.address.line1 Customer line 1
     * @apiSuccess {String} legalEntity.address.line2 Customer line 2
     * @apiSuccess {String} legalEntity.address.postalCode Customer postal code
     * @apiSuccess {String} legalEntity.address.state Customer state
     * @apiSuccess {String} id Customer id
     * @apiSuccess {Number} createdAt Custome creation date
     * @apiSuccess {Object} metadata Metadata
     *
     * @apiSuccessExample Response (example):
     *  {
     *      "email": "email@test.com",
     *      "legalEntity": {
     *          "type": "individual",
     *          "firstName": "Trenton",
     *          "lastName": "Large",
     *          "birthdate": 637124400000,
     *          "ssnLast4": "1234",
     *              "address": {
     *              "city": "New York City",
     *              "country": "US",
     *              "line1": "East 169th Street",
     *              "line2": "Apt. 2A Bronx",
     *              "postalCode": "10456",
     *              "state": "New York"
     *          }
     *      },
     *      "id": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
     *      "createdAt": 1473458205461
     *  }
     *
     * @apiError 400/STBadRequestError The request was unacceptable, often due to a invalid or missing parameter.
     * @apiError 401/Unauthorized No valid API key provided.
     * @apiError 402/STInvalidRequestError The parameters were valid but the request failed.
     * @apiError 500/STServerError Something went wrong on api
     *
     * @apiErrorExample {json} Error-Response (example):
     *  {
     *      "error": {
     *          "type": "STInvalidRequestError",
     *          "status": 402,
     *          "message": "Customer not found",
     *          "details": "Customer cus_oC3ImnDw1Iqw1b3sx5CItbc not found"
     *      }
     *  }
     *
     */
    router.get('/customers/:customer', limiter.get, function(req, res, next) {
        Customers.retrieve(req, res, next);
    });

    /**
     * @api {post} /policies/quote 1. Generate policy quote
     * @apiVersion 0.1.0
     * @apiName QuotePolicy
     * @apiGroup Policy
     * @apiDescription Generate a token used to create a policy
     *
     * @apiExample {curl} curl
     *     curl http://api.sharetempus.com/v1/policies/quote \
     *          -u sk_test_wCPyemzK7r6ZYaiRkEqzNvFN: \
     *          -d startDate=1474473004564 \
     *          -d endDate=1475473004564 \
     *          -d currency=usd \
     *          -d customer="cus_dD2r2Ib8kPMhg5C3YvlqRwb7" \
     *          -d "product[name]=iPhone 7" \
     *          -d "product[category]=Electronics" \
     *          -d "product[subcategory]=Cell Phones %26 Accessories" \
     *          -d "product[manufacturer]=Apple" \
     *          -d "product[value]=64900" \
     *          -d "description=Policy for iPhone 7"
     *
     * @apiExample {node} node
     *     var ShareTempus = require('sharetempus')('sk_test_wCPyemzK7r6ZYaiRkEqzNvFN');
     *
     *     ShareTempus.policies.quote({
     *          "customer": "cus_dD2r2Ib8kPMhg5C3YvlqRwb7",
     *          "currency": "usd",
     *          "startDate": 1474473004564,
     *          "endDate": 1475473004564,
     *          "product": {
     *              "name": "iPhone 7",
     *              "category": "Electronics",
     *              "subcategory": "Cell Phones & Accessories",
     *              "manufacturer": "Apple",
     *              "value": "Policy for iPhone 7"
     *          },
     *          "description": "",
     *          "metadata": {}
     *     }).then(function(quote) {
     *          console.log(quote);
     *     }).catch(function(error) {
     *          console.log(error);
     *     });
     *
     * @apiHeader Authorization Basic Access Authentication token.
     *
     * @apiParam {Number} startDate Start date of policy active period
     * @apiParam {Number} endDate End date of policy active period
     * @apiParam {String} currency Currency type
     * @apiParam {String} customer Customer id
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
     *      "token": "tok_Q1gBkjj8wdAkOg0pj8bf8uQO",
     *      "quote": 200
     *  }
     *
     * @apiError 400/STBadRequestError The request was unacceptable, often due to a invalid or missing parameter.
     * @apiError 401/Unauthorized No valid API key provided.
     * @apiError 402/STInvalidRequestError The parameters were valid but the request failed.
     * @apiError 500/STServerError Something went wrong on api
     *
     * @apiErrorExample {json} Error-Response (example):
     *  {
     *      "error": {
     *          "type": "STBadRequestError",
     *          "status": 400,
     *          "message": "Invalid parameter(s)",
     *          "details": "{\"product.name\":\"Name is required\",\"customer\":\"Customer is required\"}"
     *      }
     *  }
     *
     */
    router.post('/policies/quote', limiter.post, function(req, res, next) {
        Policies.quote(req, res, next);
    });

    /**
     * @api {post} /policies/create 2. Create new policy
     * @apiVersion 0.1.0
     * @apiName CreatePolicy
     * @apiGroup Policy
     * @apiDescription Create a new policy using the token generated by quote method
     *
     * @apiExample {curl} curl
     *     curl http://api.sharetempus.com/v1/policies/create \
     *          -u sk_test_wCPyemzK7r6ZYaiRkEqzNvFN: \
     *         	-d token="tok_Q1gBkjj8wdAkOg0pj8bf8uQO"
     *
     * @apiExample {node} node
     *     var ShareTempus = require('sharetempus')('sk_test_wCPyemzK7r6ZYaiRkEqzNvFN');
     *
     *     ShareTempus.policies.create({
     *          token: "tok_Q1gBkjj8wdAkOg0pj8bf8uQO"
     *     }).then(function(policy) {
     *          console.log(policy);
     *     }).catch(function(error) {
     *          console.log(error);
     *     });
     *
     * @apiHeader Authorization Basic Access Authentication token.
     *
     * @apiParam {String} token Token used to create the policy
     *
     * @apiSuccess {Number} startDate Start date of policy active period
     * @apiSuccess {Number} endDate End date of policy active period
     * @apiSuccess {String} currency Currency type
     * @apiSuccess {String} customer Customer id
     * @apiSuccess {Object} product Product data
     * @apiSuccess {String} product.name Product name
     * @apiSuccess {String} product.category Product category (based in our <a href="#api-Categories-GetCategories">categories</a>)
     * @apiSuccess {String} product.subcategory Product subcategory (based in our <a href="#api-Categories-GetCategories">subcategories</a>)
     * @apiSuccess {String} product.manufacturer Product manufacturer
     * @apiSuccess {String} product.value Product value
     * @apiSuccess {String} description Description
     * @apiSuccess {String} id Policy id
     * @apiSuccess {String} ticket Claim ticket
     * @apiSuccess {Number} value Policy value (quote)
     * @apiSuccess {String} createdAt Policy creation date
     * @apiSuccess {Object} metadata Metadata
     *
     * @apiSuccessExample Response (example):
     *  {
     *      "startDate": 1463108400000,
     *      "endDate": 1463194800000,
     *      "currency": "usd",
     *      "customer": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
     *      "product": {
     *          "name": "iPhone 7",
     *          "category": "Electronics",
     *          "subcategory": "Cell Phones & Accessories",
     *          "manufacturer": "Apple",
     *          "value": 64900
     *      },
     *      "description": "Policy for iPhone 7",
     *      "id": "pol_Re2UTmiZNd6hvn3eklRNOWET",
     *      "ticket": "ticket_xB5CE0Xj",
     *      "value": 200,
     *      "createdAt": 1473458389559
     *  }
     *
     * @apiError 400/STBadRequestError The request was unacceptable, often due to a invalid or missing parameter.
     * @apiError 401/Unauthorized No valid API key provided.
     * @apiError 402/STInvalidRequestError The parameters were valid but the request failed.
     * @apiError 500/STServerError Something went wrong on api
     *
     *  @apiErrorExample {json} Error-Response (example):
     *  {
     *      "error": {
     *          "type": "STInvalidRequestError",
     *          "status": 402,
     *          "message": "Policy not found",
     *          "details": "Token invalid or expired"
     *      }
     *  }
     *
     */
    router.post('/policies/create', limiter.post, function(req, res, next) {
        Policies.create(req, res, next);
    });

    /**
     * @api {get} /policies/:policy 3. Retrieve policy
     * @apiVersion 0.1.0
     * @apiName RetrievePolicy
     * @apiGroup Policy
     * @apiDescription Retrieve a created policy
     *
     * @apiExample {curl} curl
     *     curl http://api.sharetempus.com/v1/policies/pol_Re2UTmiZNd6hvn3eklRNOWET \
	 *         -u sk_test_wCPyemzK7r6ZYaiRkEqzNvFN:
     *
     * @apiExample {node} node
     *     var ShareTempus = require('sharetempus')('sk_test_wCPyemzK7r6ZYaiRkEqzNvFN');
     *
     *     ShareTempus.policies.retrieve({
     *          policy: "pol_Re2UTmiZNd6hvn3eklRNOWET"
     *     }).then(function(policy) {
     *          console.log(policy);
     *     }).catch(function(error) {
     *          console.log(error);
     *     });
     *
     * @apiHeader Authorization Basic Access Authentication token.
     *
     * @apiParam {String} policy Policy id
     *
     * @apiSuccess {Number} startDate Start date of policy active period
     * @apiSuccess {Number} endDate End date of policy active period
     * @apiSuccess {String} currency Currency type
     * @apiSuccess {String} customer Customer id
     * @apiSuccess {Object} product Product data
     * @apiSuccess {String} product.name Product name
     * @apiSuccess {String} product.category Product category (based in our <a href="#api-Categories-GetCategories">categories</a>)
     * @apiSuccess {String} product.subcategory Product subcategory (based in our <a href="#api-Categories-GetCategories">subcategories</a>)
     * @apiSuccess {String} product.manufacturer Product manufacturer
     * @apiSuccess {String} product.value Product value
     * @apiSuccess {String} description Description
     * @apiSuccess {String} id Policy id
     * @apiSuccess {String} ticket Claim ticket
     * @apiSuccess {Number} value Policy value (quote)
     * @apiSuccess {String} createdAt Policy creation date
     * @apiSuccess {Object} metadata Metadata
     *
     * @apiSuccessExample Response (example):
     *  {
     *      "startDate": 1463108400000,
     *      "endDate": 1463194800000,
     *      "currency": "usd",
     *      "customer": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
     *      "product": {
     *          "name": "iPhone 7",
     *          "category": "Electronics",
     *          "subcategory": "Cell Phones & Accessories",
     *          "manufacturer": "Apple",
     *          "value": 64900
     *      },
     *      "description": "Policy for iPhone 7",
     *      "id": "pol_Re2UTmiZNd6hvn3eklRNOWET",
     *      "ticket": "ticket_xB5CE0Xj",
     *      "value": 200,
     *      "createdAt": 1473458389559
     *  }
     *
     * @apiError 400/STBadRequestError The request was unacceptable, often due to a invalid or missing parameter.
     * @apiError 401/Unauthorized No valid API key provided.
     * @apiError 402/STInvalidRequestError The parameters were valid but the request failed.
     * @apiError 500/STServerError Something went wrong on api
     *
     * @apiErrorExample {json} Error-Response (example):
     *  {
     *      "error": {
     *          "type": "STInvalidRequestError",
     *          "status": 402,
     *          "message": "Policy not found",
     *          "details": "Policy pol_Re2UTmiZNd6hvn3eklRNOWET not found"
     *      }
     *  }
     *
     */
    router.get('/policies/:policy', limiter.get, function(req, res, next) {
        Policies.retrieve(req, res, next);
    });

    module.exports = router;
})();
