import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

/**
* @api {post} /customers/create 1. Create new customer
* @apiVersion 0.1.0
* @apiName CreateCustomer
* @apiGroup Customer
* @apiDescription Created a new customer
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/customers/create \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d email="customerjsmith@sharetempus.com" \
*     -d "legalEntity[type]=individual" \
*     -d "legalEntity[firstName]=John" \
*     -d "legalEntity[lastName]=Smith" \
*     -d "legalEntity[birthdate]=637124400000" \
*     -d "legalEntity[ssnLast4]=1234" \
*     -d "legalEntity[address][city]=New York City" \
*     -d "legalEntity[address][country]=US" \
*     -d "legalEntity[address][line1]=East 169th Street" \
*     -d "legalEntity[address][line2]=Apt. 2A Bronx" \
*     -d "legalEntity[address][postalCode]=10456" \
*     -d "legalEntity[address][state]=New York"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.customers.create({
*     email: 'customerjsmith@sharetempus.com',
*     legalEntity: {
*       type: 'individual',
*       firstName: 'John',
*       lastName: 'Smith',
*       birthdate: 637124400000,
*       ssnLast4: '1234',
*       address: {
*         city: 'New York City',
*         country: 'US',
*         line1: 'East 169th Street',
*         line2: 'Apt. 2A Bronx',
*         postalCode: '10456',
*         state: 'New York'
*       }
*     }
*   }).then(function(customer) {
*     console.log(customer);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   customer = sharetempus.customers.create({
*     email: "customerjsmith@sharetempus.com",
*     legalEntity: {
*       type: "individual",
*       firstName: "John",
*       lastName: "Smith",
*       birthdate: 637124400000,
*       ssnLast4: "1234",
*       address: {
*         city: "New York City",
*         country: "US",
*         line1: "East 169th Street",
*         line2: "Apt. 2A Bronx",
*         postalCode: "10456",
*         state: "New York"
*       }
*     }
*   });
*   print(customer);
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
*    "email": "customerjsmith@sharetempus.com",
*    "legalEntity": {
*      "type": "individual",
*      "firstName": "John",
*      "lastName": "Smith",
*      "birthdate": 637124400000,
*      "ssnLast4": "1234",
*        "address": {
*        "city": "New York City",
*        "country": "US",
*        "line1": "East 169th Street",
*        "line2": "Apt. 2A Bronx",
*        "postalCode": "10456",
*        "state": "New York"
*      }
*    },
*    "id": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "createdAt": 1473458205461
*  }
*
* @apiError 400/bad_request_error The request was unacceptable, often due to a invalid or missing parameter.
* @apiError 401/unauthorized_error No valid API key provided.
* @apiError 402/invalid_request_error The parameters were valid but the request failed.
* @apiError 500/api_error Something went wrong on api
*
* @apiErrorExample {json} Error-Response (example):
*   {
*    "error": {
*      "type": "bad_request_error",
*      "status": 400,
*      "message": "{\"legalEntity.birthdate\":\"Birthdate is required\"}"
*    }
*  }
*
*/
router.post('/customers/create', (req, res, next) => {
  ShareTempus.customers.create({ req, res, next });
});

/**
* @api {post} /customers/update 2. Update customer
* @apiVersion 0.1.0
* @apiName UpdateCustomer
* @apiGroup Customer
* @apiDescription Update a customer
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/customers/update \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d "id=cus_dD2r2Ib8kPMhg5C3YvlqRwb7" \
*     -d "legalEntity[address][line2]=Apt. 1A Bronx"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.customers.update({
*     id: 'cus_dD2r2Ib8kPMhg5C3YvlqRwb7',
*     legalEntity: {
*       address: {
*         line2: 'Apt. 1A Bronx'
*       }
*     }
*   }).then(function(customer) {
*     console.log(customer);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   customer = sharetempus.customers.update({
*     id: "cus_dD2r2Ib8kPMhg5C3YvlqRwb7",
*     legalEntity: {
*       address: {
*         line2: "Apt. 1A Bronx"
*       }
*     }
*   });
*   print(customer);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} email (optional) Customer email
* @apiParam {Object} legalEntity (optional) Legal entity data
* @apiParam {String} legalEntity.firstName (optional) Customer first name
* @apiParam {String} legalEntity.lastName (optional) Customer last name
* @apiParam {Number} legalEntity.birthdate (optional) Customer birthdate
* @apiParam {String} legalEntity.ssnLast4 (optional) Customer last 4 digits of SSN
* @apiParam {Object} legalEntity.address (optional) Customer address data
* @apiParam {String} legalEntity.address.city (optional) Customer city
* @apiParam {String} legalEntity.address.country (optional) Customer country
* @apiParam {String} legalEntity.address.line1 (optional) Customer line 1
* @apiParam {String} legalEntity.address.line2 (optional) Customer line 2
* @apiParam {String} legalEntity.address.postalCode (optional) Customer postal code
* @apiParam {String} legalEntity.address.state (optional) Customer state
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
*    "email": "customerjsmith@sharetempus.com",
*    "legalEntity": {
*      "type": "individual",
*      "firstName": "John",
*      "lastName": "Smith",
*      "birthdate": 637124400000,
*      "ssnLast4": "1234",
*      "address": {
*        "city": "New York City",
*        "country": "US",
*        "line1": "East 169th Street",
*        "line2": "Apt. 1A Bronx",
*        "postalCode": "10456",
*        "state": "New York"
*      }
*    },
*    "id": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "createdAt": 1473458205461
*  }
*
* @apiError 400/bad_request_error The request was unacceptable, often due to a invalid or missing parameter.
* @apiError 401/unauthorized_error No valid API key provided.
* @apiError 402/invalid_request_error The parameters were valid but the request failed.
* @apiError 500/api_error Something went wrong on api
*
* @apiErrorExample {json} Error-Response (example):
*  {
*     "error": {
*       "type": "bad_request_error",
*       "status": 400,
*       "message": "{\"legalEntity.type\":\"legalEntity.type is not allowed by the schema\"}"
*     }
*  }
*
*/
router.post('/customers/update', (req, res, next) => {
  ShareTempus.customers.update({ req, res, next });
});

/**
* @api {get} /customers/:customer 3. Retrieve customer
* @apiVersion 0.1.0
* @apiName RetrieveCustomer
* @apiGroup Customer
* @apiDescription Retrieve a customer by id
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/customers/cus_oC3ImnDw1Iqw1b3sx5CITtbc \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.customers.retrieve({
*     customer: 'cus_oC3ImnDw1Iqw1b3sx5CITtbc'
*   }).then(function(customer) {
*     console.log(customer);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   customer = sharetempus.customers.retrieve({
*     customer: "cus_oC3ImnDw1Iqw1b3sx5CITtbc"
*   });
*   print(customer);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} customer Customer id
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
*    "email": "customerjsmith@sharetempus.com",
*    "legalEntity": {
*      "type": "individual",
*      "firstName": "John",
*      "lastName": "Smith",
*      "birthdate": 637124400000,
*      "ssnLast4": "1234",
*      "address": {
*        "city": "New York City",
*        "country": "US",
*        "line1": "East 169th Street",
*        "line2": "Apt. 2A Bronx",
*        "postalCode": "10456",
*        "state": "New York"
*      }
*    },
*    "id": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "createdAt": 1473458205461
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
*      "message": "Customer cus_oC3ImnDw1Iqw1b3sx5CItbc not found",
*    }
*  }
*
*/
router.get('/customers/:customer', (req, res, next) => {
  ShareTempus.customers.retrieve({ req, res, next });
});

/**
* @api {post} /customers/find 4. Find customer
* @apiVersion 0.1.0
* @apiName FindCustomer
* @apiGroup Customer
* @apiDescription Find a customer by email
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/customers/find \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d email="customerjsmith@sharetempus.com"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.customers.find({
*     email: 'customerjsmith@sharetempus.com'
*   }).then(function(customer) {
*     console.log(customer);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   customer = sharetempus.customers.find({
*     email: "customerjsmith@sharetempus.com"
*   });
*   print(customer);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} email Customer email
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
*    "email": "customerjsmith@sharetempus.com",
*    "legalEntity": {
*      "type": "individual",
*      "firstName": "John",
*      "lastName": "Smith",
*      "birthdate": 637124400000,
*      "ssnLast4": "1234",
*      "address": {
*        "city": "New York City",
*        "country": "US",
*        "line1": "East 169th Street",
*        "line2": "Apt. 2A Bronx",
*        "postalCode": "10456",
*        "state": "New York"
*      }
*    },
*    "id": "cus_oC3ImnDw1Iqw1b3sx5CITtbc",
*    "createdAt": 1473458205461
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
*      "message": "Customer customerjsmith@sharetempus.com not found",
*    }
*  }
*
*/
router.post('/customers/find', (req, res, next) => {
  ShareTempus.customers.find({ req, res, next });
});

export default router;
