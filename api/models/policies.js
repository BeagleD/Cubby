(function() {
    'use strict';

    var mongo = require('../services/mongo'),
        randomid = require('randomid'),
        schedule = require('node-schedule'),
        Categories = require('./categories'),
        Schemas = require('../schemas/schemas'),
        Email = require('../services/email'),
        Counter = require('../services/counter'),
        Matrix = require('./matrix'),
        Payments = require('./payments'),
        STError = require('../lib/error');

    var Policies = {

        /**
         * @method create
         * @memberof Policies
         * @description create a new policy
         * @param  {Object} req
         * @param  {Object} res
         * @param  {Function} next
         */
        quote: function(req, res, next) {

            var db = mongo.getDb(),
                policy = req.body,
                categories = Categories.getCategories(),
                context = Schemas.Policies.newContext();

            // parse numbers to curl request
            if(policy) {
                if(typeof policy.startDate === "string") {
                    policy.startDate = Number(policy.startDate);
                }
                if(typeof policy.endDate === "string") {
                    policy.endDate = Number(policy.endDate);
                }
                if(policy.product && typeof policy.product.value === "string") {
                    policy.product.value = Number(policy.product.value);
                }
            }

            // validate policy schema before add
            Schemas.validate(context, policy, function(isValid, message) {
                if(!isValid) {
                    return sendValidateError(message);
                }
                else {
                    var today = new Date(new Date().setHours(0,0,0,0)).getTime();

                    if(policy.startDate < today) {
                        return sendValidateError('startDate should be greater than today');
                    }
                    else if(policy.startDate > policy.endDate) {
                        return sendValidateError('endDate should be greater than startDate');
                    }
                    else if(!categories[policy.product.category]) {
                        return sendValidateError('Invalid category');
                    }
                    else if(categories[policy.product.category].indexOf(policy.product.subcategory) < 0) {
                        return sendValidateError('Invalid subcategory');
                    }
                    else {
                        // create customer if schema is valid
                        Matrix.generatePolicyQuote(policy, function(quote) {
                            createPolicy(quote);
                        });
                    }
                }

                function sendValidateError(details) {
                    var error = new STError.STBadRequestError({
                        createdAt: new Date().getTime(),
                        type: 'bad_request_error',
                        message: 'Invalid parameter(s)',
                        details: details,
                        data: policy
                    });

                    return next(error);
                }
            });

            // create policy
            function createPolicy(quote) {

                // generate a policy id
                policy.id = 'pol_' + randomid(24);
                // generate a claim ticket
                policy.ticket = 'ticket_' + randomid(8);
                // get policy quote
                policy.value = quote; //Math.round((policy.product.value * 0.1));
                // generate policy creation date
                policy.createdAt = (new Date()).getTime();
                // get user id
                policy.userId = mongo.getUserId();
                // private flags
                policy.private = {
                    created: false,
                    paid: false,
                    matrixUpdated: false
                };

                db.Customers.findOne({ 'id': policy.customer, 'userId': mongo.getUserId() }).then(function(customer) {
                    if(customer) {
                        inserPolicy(customer);
                    }
                    else {
                        var error = new STError.STInvalidRequestError({
                            createdAt: new Date().getTime(),
                            type: 'Invalid_request_error',
                            message: 'Customer not found',
                            details: policy.customer + ' not found',
                            data: policy
                        });

                        return next(error);
                    }
                });
            }

            // inser policy
            function inserPolicy(customer) {

                policy.customerId = customer._id;
                policy.token = 'tok_' + randomid(24);

                db.Policies.insert(policy).then(function(newPolicy) {
                    if(newPolicy) {

                        var resultPolicy = {
                            token: policy.token,
                            quote: policy.value
                        };

                        res.send(JSON.stringify(resultPolicy, null, 2));
                    }
                    else {
                        var error = new STError.STServerError({
                            createdAt: new Date().getTime(),
                            type: 'api_error',
                            message: 'API Error',
                            details: 'Failure to generate quote. Please try again in some minutes',
                            data: policy
                        });

                        return next(error);
                    }
                });
            }
        },

        /**
         * @method accept
         * @memberof Policies
         * @description registered policy
         * @param  {Object} req
         * @param  {Object} res
         * @param  {Function} next
         */
        create: function(req, res, next) {

            var db = mongo.getDb(),
                token = req.body.token;

            if(!token) {
                var error = new STError.STBadRequestError({
                    createdAt: new Date().getTime(),
                    type: 'bad_request_error',
                    message: 'Token not found',
                    details: 'Use the quote endpoint to generate a token before create a policy',
                    data: token
                });

                return next(error);
            }
            else if(token.indexOf('tok_') !== 0) {
                var error = new STError.STBadRequestError({
                    createdAt: new Date().getTime(),
                    type: 'bad_request_error',
                    message: 'Invalid token',
                    details: token + ' invalid',
                    data: policy
                });

                return next(error);
            }
            else {
                db.Policies.findOne({ 'token': token, 'userId': mongo.getUserId() }).then(function(policy) {

                    if(!policy) {
                        var error = new STError.STInvalidRequestError({
                            createdAt: new Date().getTime(),
                            type: 'invalid_request_error',
                            message: 'Policy not found',
                            details: 'Token invalid or expired',
                            data: policy
                        });

                        return next(error);
                    }
                    else if(!policy.private.created) {
                        registerPolicy(policy)
                    }
                    else {
                        var error = new STError.STInvalidRequestError({
                            createdAt: new Date().getTime(),
                            type: 'invalid_request_error',
                            message: 'Policy already created',
                            details: policy.id + ' already created',
                            data: policy
                        });

                        return next(error);
                    }
                });
            }

            function registerPolicy(policy) {

                db.Customers.findOne({ 'id': policy.customer, 'userId': mongo.getUserId() }).then(function(customer) {
                    if(customer) {
                        // send ticket email
                        Email.sendTicketEmail(customer, policy);
                    }
                });

                // add policy to payments
                Payments.addPolicy(JSON.parse(JSON.stringify(policy)));
                // increment policies Counter
                Counter.incrementTotalPolicies(JSON.parse(JSON.stringify(policy)));

                // create policy
                policy.private.created = true;
                // update created at
                policy.createdAt = (new Date()).getTime();

                db.Policies.update({
                    'token': token,
                    'userId': mongo.getUserId()
                }, {
                    // $unset : { token : 1 },
                    $set: policy
                }, function(err) {
                    if(!err) {
                        delete policy._id;
                        delete policy.userId;
                        delete policy.customerId;
                        delete policy.token;
                        delete policy.private;

                        res.send(JSON.stringify(policy, null, 2));
                        // res.send({ message: 'Policy registered'});
                    }
                    else {
                        var error = new STError.STServerError({
                            createdAt: new Date().getTime(),
                            type: 'api_error',
                            message: 'API Error',
                            details: 'Failure to create policy. Please try again in some minutes',
                            data: policy
                        });

                        return next(error);
                    }
                });
            }
        },

        /**
         * @method retrieve
         * @memberof Policies
         * @description retrieve a policy
         * @param  {Object} req
         * @param  {Object} res
         * @param  {Function} next
         */
        retrieve: function(req, res, next) {

            var db = mongo.getDb(),
                policyId = req.params.policy;

            db.Policies.findOne({ 'id': policyId, 'private.created': true }).then(function(policy) {

                if(policy) {
                    delete policy._id;
                    delete policy.userId;
                    delete policy.customerId;
                    delete policy.private;
                    delete policy.token;

                    res.send(JSON.stringify(policy, null, 2));
                }
                else {
                    var error = new STError.STInvalidRequestError({
                        createdAt: new Date().getTime(),
                        type: 'invalid_request_error',
                        message: 'Policy not found',
                        details: 'Policy ' + policyId + ' not found',
                        data: { policyId: policyId }
                    });

                    return next(error);
                }
            });
        },

        /**
         * @method startPoliciesSchedules
         * @memberof Policies
         * @description start policies schedules
         */
        startPoliciesSchedules: function() {
            var self = this;

            mongo.getTestDb(function(err, db) {
                if(!err) {
                    self._runPolicySchedule(db, {
                        hour: 3,
                        minute: 5
                    });
                }
            });

            mongo.getLiveDb(function(err, db) {
                if(!err) {
                    self._runPolicySchedule(db, {
                        hour: 1,
                        minute: 5
                    });
                }
            });
        },

        /**
         * @method _runPolicySchedule
         * @memberof Policies
         * @description run policies schedule to update matrix with expired policies
         * @param {Object} db live or test database
         * @param {Object} scheduleTime schedule time
         */
        _runPolicySchedule(db, scheduleTime) {

            var date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth(),
                rule = new schedule.RecurrenceRule();

            // rule.date = 25;
            rule.hour = scheduleTime.hour;
            rule.minute = scheduleTime.minute;

            var j = schedule.scheduleJob(rule, function() {

                var today = new Date(new Date().setHours(0,0,0,0)).getTime(),
                    yesterday = new Date(today),
                    yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1)).getTime();

                // remove rejected policies
                db.Policies.find({ 'createdAt': { $gte: yesterday }, 'private.created': false }).toArray(function(err, policies) {

                    if(!err && policies && policies.length > 0) {

                        var policiesId = [];

                        for(var i = 0, len = policies.length; i < len; i++) {
                            policiesId.push(policies[i]._id);
                        }

                        db.Policies.deleteMany({ _id: { $in: policiesId }}, function(err, deletedPolicies) {
                            // console.log(deletedPolicies);
                        });
                    }
                });

                // update matrix
                db.Policies.find({
                    'endDate': { $lte: today },
                    'private.matrixUpdated': false,
                    'private.created': true }).toArray(function(err, policies) {

                    if(!err && policies && policies.length > 0) {
                        updatePolicyMatrix(policies);
                    }
                });

                function updatePolicyMatrix(policies) {

                    if(policies.length === 0) {
                        return false;
                    }
                    else {
                        Matrix.updateMatrixValues(db, policies[0], function() {
                            policies[0].private.matrixUpdated = true;

                            db.Policies.update({
                                _id: policies[0]._id
                            }, {
                                $set: policies[0]
                            }, function(err) {
                                policies.splice(0, 1);
                                updatePolicyMatrix(policies);
                            });
                        });
                    }
                }
            });
        }
    }

    module.exports = Policies;

})();
