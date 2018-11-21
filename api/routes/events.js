import express from 'express';
import ShareTempus from '../models';

const router = express.Router();

/**
* @api {get} /events/:event 1. Retrieve event
* @apiVersion 0.1.0
* @apiName RetrieveEvent
* @apiGroup Event
* @apiDescription Retrieve a created event
*
* @apiExample {curl} curl
*   curl https://api.sharetempus.com/v1/event/evt_i5OkJyAi3ffM4mTjf68bRFz0 \
*     -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:
*
* @apiExample {node} node
*   var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   ShareTempus.events.retrieve({
*     event: 'evt_i5OkJyAi3ffM4mTjf68bRFz0'
*   }).then(function(event) {
*     console.log(event);
*   }).catch(function(error) {
*     console.log(error);
*   });
*
* @apiExample {python} python
*   from sharetempus import ShareTempus;
*   sharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');
*
*   customer = sharetempus.events.retrieve({
*     customer: "evt_i5OkJyAi3ffM4mTjf68bRFz0"
*   });
*   print(event);
*
* @apiHeader Authorization Basic Access Authentication token.
*
* @apiParam {String} event Event id
*
* @apiSuccess {String} id Event id
* @apiSuccess {String} type Event type
* @apiSuccess {Number} createdAt Event creation date
* @apiSuccess {String} request request log id
* @apiSuccess {Boolean} isLiveMode test(false)|live(true) mode
* @apiSuccess {Object} data Event data
*
* @apiSuccessExample Response (example):
*  {
*    "id" : "evt_i5OkJyAi3ffM4mTjf68bRFz0",
*    "type" : "customer.created",
*    "createdAt" : 1484964039313,
*    "request" : "req_tWt2LCOAq2EYJJ10uWdGd3hP",
*    "isLiveMode" : false,
*    "data" : {
*      "email" : "customerjsmith@sharetempus.com",
*      "legalEntity" : {
*        "type" : "individual",
*        "firstName" : "John",
*        "lastName" : "Smith",
*        "birthdate" : 637124400000,
*        "ssnLast4" : "1234",
*        "address" : {
*          "city" : "New York City",
*          "country" : "US",
*          "line1" : "East 169th Street",
*          "line2" : "Apt. 2A Bronx",
*          "postalCode" : "10456",
*          "state" : "New York"
*        }
*      },
*      "id" : "cus_4lwmU6mHpavjzGEqEPVFXGhq",
*      "createdAt" : 1484964038659
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
*      "message": "Event evt_i5OkJyAi3ffM4mTjf68bRFz0 not found"
*    }
*  }
*
*/
router.get('/events/:event', (req, res, next) => {
  ShareTempus.events.retrieve({ req, res, next });
});

export default router;
