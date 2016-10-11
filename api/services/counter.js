(function() {
    'use strict';

    var mongo = require('../services/mongo');

    // Counter
    module.exports = {

        /**
         * @method incrementTotalCustomers
         * @memberof Counter
         * @description increment customers counter
         * @param  {String} userId
         * @param  {Object} customer
         */
        incrementTotalCustomers: function(customer) {

            var db = mongo.getDb(),
                self = this;

            db.Counter.findOne({ userId: customer.userId }).then(function(counter) {
                if(counter) {
                    counter.customers.total++;

                    var date = new Date(customer.createdAt),
                        year = date.getFullYear(),
                        month = date.getMonth(),
                        day = date.getDate() - 1;

                    // update counter by year
                    if(!counter.customers[year]) {

                        // start if not exist
                        counter.customers[year] = {
                            total: self._generateMonthArrays()
                        }
                    }

                    counter.customers[year].total[month][day]++;

                    // update counter
                    self.updateCounter(counter);
                }
                // create counter if doesn't exist
                else {
                    self.createCounter(customer.userId, function() {
                        self.incrementTotalCustomers(customer)
                    });
                }
            });
        },

        /**
         * @method incrementTotalPolicies
         * @memberof Counter
         * @description increment policies counter
         * @param  {String} userId
         * @param  {Object} policy
         */
        incrementTotalPolicies: function(policy) {

            var db = mongo.getDb(),
                self = this;

            db.Counter.findOne({ userId: policy.userId }).then(function(counter) {
                if(counter) {
                    counter.policies.total++;
                    counter.policies.value += policy.value;

                    var date = new Date(policy.createdAt),
                        year = date.getFullYear(),
                        month = date.getMonth(),
                        day = date.getDate() - 1;

                    // update counter by year
                    if(!counter.policies[year]) {

                        // start if not exist
                        counter.policies[year] = {
                            total: self._generateMonthArrays(),
                            canceled: self._generateMonthArrays(),
                            value: self._generateMonthArrays(),
                            canceledValue: self._generateMonthArrays()
                        }
                    }

                    counter.policies[year].total[month][day]++;
                    counter.policies[year].value[month][day] += policy.value;

                    // update counter by customer
                    if(!counter.policies.customers[policy.customer]) {
                        counter.policies.customers[policy.customer] = {
                            total: 1,
                            value: policy.value
                        }
                    }
                    else {
                        counter.policies.customers[policy.customer].total++;
                        counter.policies.customers[policy.customer].value += policy.value;
                    }

                    // update counter
                    self.updateCounter(counter);
                }
                // create counter if doesn't exist
                else {
                    self.createCounter(policy.userId, function() {
                        self.incrementTotalPolicies(policy)
                    });
                }
            });
        },

        /**
         * @method incrementTotalPayments
         * @memberof Counter
         * @description increment payments counter
         * @param  {String} userId
         * @param  {Object} payment
         */
        incrementTotalPayments: function(payment) {

            var db = mongo.getDb(),
                self = this;

            db.Counter.findOne({ userId: payment.userId }).then(function(counter) {
                if(counter) {
                    counter.payments.total++;

                    var date = new Date(payment.createdAt),
                        year = date.getFullYear(),
                        month = date.getMonth(),
                        day = date.getDate() - 1;

                    // update counter by year
                    if(!counter.payments[year]) {

                        // start if not exist
                        counter.payments[year] = {
                            total: self._generateMonthArrays()
                        }
                    }

                    counter.payments[year].total[month][day]++;

                    // update counter
                    self.updateCounter(counter);
                }
                // create counter if doesn't exist
                else {
                    self.createCounter(payment.userId, function() {
                        self.incrementTotalPayments(payment)
                    });
                }
            });
        },

        /**
         * @method createCounter
         * @memberof Counter
         * @description creater counter at mongo
         * @param  {Object} counter
         */
        createCounter: function(userId, callback) {

            var db = mongo.getDb(),
                counter = {
                    userId: userId,
                    claims: {
                        total: 0
                    },
                    customers: {
                        total: 0
                    },
                    policies: {
                        total: 0,
                        canceled: 0,
                        value: 0,
                        canceledValue: 0,
                        customers: {}
                    },
                    payments: {
                        total: 0
                    }
                };

            db.Counter.insert(counter, function(err) {
                if(!err) {
                    callback();
                }
            });
        },

        /**
         * @method updateCounter
         * @memberof Counter
         * @description update counter at mongo
         * @param  {Object} counter
         */
        updateCounter: function(counter) {

            var db = mongo.getDb();

            db.Counter.update({
                userId: counter.userId
            }, {
                $set: counter
            });
        },

        /**
         * @method _generateMonthArrays
         * @memberof Counter
         * @description generate array of 0 to each day of all months
         * @return {Array}
         */
        _generateMonthArrays: function() {

            var year = new Date().getFullYear(),
                numberOfDays,
                monthArray = [];

            for(var i = 0; i < 12; i++) {
                numberOfDays = new Date(year, (i + 1), 0).getDate();
                monthArray[i] = Array.apply(null, Array(numberOfDays)).map(Number.prototype.valueOf, 0);
            }

            return monthArray;
        }
    }
})();
