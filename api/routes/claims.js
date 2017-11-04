import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

/**
* @api {post} /claims/create 1. Create new claim
* @apiVersion 0.1.0
* @apiName CreateClaim
* @apiGroup Claim
* @apiDescription Created a new claim
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/claims/create \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \
*     -d subject="iPhone 7 Damaged" \
*     -d type="damaged" \
*     -d content="My iPhone 7 fell and broke the screen" \
*     -d "policy[id]=pol_PX7OhipGlRb4QcvOvklkreBv" \
*     -d "policy[ticket]=ticket_ONVGqM1k"
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.claims.create({
*     subject: 'iPhone 7 Damaged',
*     type: 'damaged',
*     content: 'My iPhone 7 fell and broke the screen',
*     policy: {
*       id: 'pol_PX7OhipGlRb4QcvOvklkreBv',
*       ticket: 'ticket_ONVGqM1k'
*     }
*   }).then(function(claim) {
*     console.log(claim);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   claim = sharetempus.claims.create({
*     subject: "iPhone 7 Damaged",
*     type: "damaged",
*     content: "My iPhone 7 fell and broke the screen",
*     policy: {
*       id: "pol_PX7OhipGlRb4QcvOvklkreBv",
*       ticket: "ticket_ONVGqM1k"
*     }
*   });
*   print(claim);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} subject Claim subject
* @apiParam {String} type Claim type
* @apiParam {String} content Claim content
* @apiParam {Array} images (optional) Product images
* @apiParam {Object} policy Policy data
* @apiParam {String} policy.id Policy id
* @apiParam {String} policy.ticket Policy ticket
*
* @apiSuccess {String} id Claim id
* @apiSuccess {String} subject Claim subject
* @apiSuccess {String} type Claim type
* @apiSuccess {String} content Claim content
* @apiSuccess {Array} images Product images (limit = 3)
* @apiSuccess {Object} policy Policy data
* @apiSuccess {String} policy.id Policy id
* @apiSuccess {String} policy.ticket Policy ticket
* @apiSuccess {Object} customer Customer data
* @apiSuccess {String} customer.id Customer id
* @apiSuccess {String} customer.email Customer email
* @apiSuccess {Number} createdAt Claim creation date
*
* @apiSuccessExample Response (example):
*  {
*    "id": "clm_NAlLt3lpam1THwijiL3nCyjR",
*    "subject": "iPhone 7 Damaged",
*    "type": "damaged",
*    "content": "My iPhone 7 fell and broke the screen",
*    "status": "opened",
*    "images": [],
*    "createdAt": 1485043299015,
*    "policy": {
*      "id": "pol_PX7OhipGlRb4QcvOvklkreBv",
*      "ticket": "ticket_ONVGqM1k"
*    },
*    "customer": {
*      "id": "cus_u4bXy2Zhkq9YW0hVSMwLdZ2U",
*      "email": "lucasbr.dafonseca@gmail.com"
*    }
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
*      "message": "Policy time expired",
*      "details": "pol_PX7OhipGlRb4QcvOvklkreBv time expired"
*    }
*  }
*
*/
router.post('/claims/create', (req, res, next) => {
  ShareTempus.claims.create({ req, res, next });
});

/**
* @api {post} /claims/:claim 2. Retrieve claim
* @apiVersion 0.1.0
* @apiName RetrieveClaim
* @apiGroup Claim
* @apiDescription Retrieve a created claim
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/claims/clm_NAlLt3lpam1THwijiL3nCyjR \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.claims.retrieve({
*     claim: 'clm_NAlLt3lpam1THwijiL3nCyjR'
*   }).then(function(claim) {
*     console.log(claim);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   claim = sharetempus.claims.retrieve({
*     claim: "clm_NAlLt3lpam1THwijiL3nCyjR"
*   });
*   print(claim);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} id Claim id
*
* @apiSuccess {String} id Claim id
* @apiSuccess {String} subject Claim subject
* @apiSuccess {String} type Claim type
* @apiSuccess {String} content Claim content
* @apiSuccess {Array} images Product images
* @apiSuccess {Object} policy Policy data
* @apiSuccess {String} policy.id Policy id
* @apiSuccess {String} policy.ticket Policy ticket
* @apiSuccess {Object} customer Customer data
* @apiSuccess {String} customer.id Customer id
* @apiSuccess {String} customer.email Customer email
* @apiSuccess {Number} createdAt Claim creation date
*
* @apiSuccessExample Response (example):
*  {
*    "id": "clm_NAlLt3lpam1THwijiL3nCyjR",
*    "subject": "iPhone 7 Damaged",
*    "type": "damaged",
*    "content": "My iPhone 7 fell and broke the screen",
*    "status": "opened",
*    "images": [],
*    "createdAt": 1485043299015,
*    "policy": {
*      "id": "pol_PX7OhipGlRb4QcvOvklkreBv",
*      "ticket": "ticket_ONVGqM1k"
*    },
*    "customer": {
*      "id": "cus_u4bXy2Zhkq9YW0hVSMwLdZ2U",
*      "email": "lucasbr.dafonseca@gmail.com"
*    }
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
*      "message": "Claim clm_NAlLt3lpam1THwijiL3nCyj not found"
*    }
*  }
*
*/
router.get('/claims/:claim', (req, res, next) => {
  ShareTempus.claims.retrieve({ req, res, next });
});

export default router;
