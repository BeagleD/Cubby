(function() {
    'use strict';

    var mongo = require('../services/mongo'),
        randomid = require('randomid'),
        Schemas = require('../schemas/schemas'),
        Counter = require('../services/counter');

    var Payments = {

        /**
         * create - create new payment
         *
         * @param  {String} userId
         * @param  {String} policyId
         * @param  {Object} policy
         */
        create: function(policy) {

            var db = mongo.getDb(),
                date = new Date(policy.createdAt),
                year = date.getFullYear(),
                month = date.getMonth(),
                payment = {
                    userId: policy.userId,
                    createdAt: policy.createdAt,
                    expires: (new Date(year, month, 10)).getTime(),
                    status: 'active',
                    year: year,
                    month: month,
                    value: policy.value,
                    policies: [policy._id]
                };

            db.Payments.insert(payment).then(function(newPayment) {
                Counter.incrementTotalPayments(payment);
            });
        },

        /**
         * addPolicy - add policy to user payment
         *
         * @param  {String} userId
         * @param  {String} policyId
         * @param  {Object} policy
         */
        addPolicy: function(policy) {

            var self = this,
                db = mongo.getDb(),
                date = new Date(policy.createdAt),
                year = date.getFullYear(),
                month = date.getMonth();

            db.Payments.findOne({
                userId: policy.userId,
                year: year,
                month: month
            }).then(function(payment){
                if(!payment) {
                    self.create(policy);
                }
                else {
                    payment.value += policy.value;
                    payment.policies.push(policy._id);

                    db.Payments.update({
                        userId: policy.userId,
                        year: year,
                        month: month
                    }, {
                        $set: payment
                    })
                }
            });
        }
    }

    module.exports = Payments;
})();
