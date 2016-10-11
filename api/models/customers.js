(function() {
    'use strict';

    var mongo = require('../services/mongo'),
        randomid = require('randomid'),
        Schemas = require('../schemas/schemas'),
        Counter = require('../services/counter'),
        STError = require('../lib/error');

    var Customers = {

        /**
         * @method create
         * @memberof Customers
         * @description create a new customer
         * @param  {Object} req
         * @param  {Object} res
         * @param  {Function} next
         */
        create: function(req, res, next) {

            var db = mongo.getDb(),
                customer = req.body,
                context = Schemas.Customers.newContext();

            // parse numbers to curl request
            if( customer.legalEntity &&
                customer.legalEntity.birthdate &&
                typeof customer.legalEntity.birthdate === "string") {
                    customer.legalEntity.birthdate = Number(customer.legalEntity.birthdate);
                }

            // validate customer schema before add
            Schemas.validate(context, customer, function(isValid, message) {
                if(!isValid) {
                    var error = new STError.STBadRequestError({
                        createdAt: new Date().getTime(),
                        type: 'bad_request_error',
                        message: 'Invalid or missing parameter(s)',
                        details: message,
                        data: customer
                    });

                    return next(error);
                }
                else {
                    // find customer if schema is valid
                    findCustomer();
                }
            });

            // check if customer exists before create it
            function findCustomer() {

                // add user id
                customer.userId = mongo.getUserId();

                // check if customer exist
                db.Customers.findOne({ userId: customer.userId, email: customer.email }).then(function(existingCustomer) {
                    if(!existingCustomer) {
                        // generate customer id
                        customer.id = 'cus_' + randomid(24);
                        // generate customer creation date
                        customer.createdAt = (new Date()).getTime();

                        createCustomer(customer);
                    }
                    else {
                        var error = new STError.STInvalidRequestError({
                            createdAt: new Date().getTime(),
                            type: 'invalid_request_error',
                            message: 'Customer already exist',
                            details: existingCustomer.id + ' already exist',
                            data: existingCustomer
                        });

                        return next(error);
                    }
                });
            }

            // create customer
            function createCustomer(customer) {

                db.Customers.insert(customer).then(function(newCustomer) {
                    if(newCustomer) {
                        // increment customers Counter
                        Counter.incrementTotalCustomers(JSON.parse(JSON.stringify(customer)));

                        delete customer.userId;
                        delete customer._id;
                        res.send(JSON.stringify(customer, null, 2));
                    }
                    else {
                        var error = new STError.STServerError({
                            createdAt: new Date().getTime(),
                            type: 'api_error',
                            message: 'API Error',
                            details: 'Failure to create customer. Please try again in some minutes',
                            data: customer
                        });

                        return next(error);
                    }
                });
            }
        },

        /**
         * @method retrieve
         * @memberof Customers
         * @description retrieve a customer
         * @param  {Object} req
         * @param  {Object} res
         * @param  {Function} next
         */
        retrieve: function(req, res, next) {

            var db = mongo.getDb(),
                customerId = req.params.customer;

            if(customerId) {
                db.Customers.findOne({ 'id': customerId }).then(function(customer) {

                    if(customer) {
                        delete customer._id;
                        delete customer.userId;

                        res.send(JSON.stringify(customer, null, 2));
                    }
                    else {
                        var error = new STError.STInvalidRequestError({
                            createdAt: new Date().getTime(),
                            type: 'invalid_request_error',
                            message: 'Customer not found',
                            details: 'Customer ' + customerId + ' not found',
                            data: { customerId: customerId }
                        });

                        return next(error);
                    }
                });
            }
            else {
                var error = new STError.STBadRequestError({
                    createdAt: new Date().getTime(),
                    type: 'bad_request_error',
                    message: 'Invalid customer id',
                    details: customerId + ' is an invalid id',
                    data: customer
                });

                return next(error);
            }
        }
    }

    module.exports = Customers;

})();
