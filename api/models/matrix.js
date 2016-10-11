(function() {
    'use strict';

    var mongo = require('../services/mongo');

    var Matrix = {

        /**
         * @method createMatrix
         * @memberof Matrix
         * @description create a new matrix
         * @param {Object} matrix
         */
        createMatrix: function(db, matrix) {
            db.Matrix.insert(matrix)
        },

        /**
         * @method updateMatrix
         * @memberof Matrix
         * @description update matrix in mongodb
         * @param {Object} matrix
         */
        updateMatrix: function(db, matrix) {
            db.Matrix.update({
                _id: matrix._id
            }, {
                $set: matrix
            });
        },

        /**
         * @method updateMatrixValues
         * @memberof Matrix
         * @description update matrix values
         * @param {Object} policy policy object
         * @param {function} callback callback function
         */
        updateMatrixValues: function(db, policy, callback) {

            var self = this,
                subcategory = policy.product.subcategory,
                soldPrice = policy.value,

                startDate = new Date(policy.startDate),
                endDate = new Date(policy.endDate),
                timeDiff = Math.abs(endDate.getTime() - startDate.getTime()),
                diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)),
                interval = {};

                // number of years
                interval.year = Math.floor(diffDays / 365);
                diffDays = diffDays % 365;

                // number of months
                interval.month = Math.floor(diffDays / 30);
                diffDays = diffDays % 30;

                // number of weeks
                interval.week = Math.floor(diffDays / 7);
                diffDays = diffDays % 7;

                // number of days
                interval.day = diffDays;

                db.Matrix.find({}).toArray(function(err, matrices) {

                    var date    = new Date(policy.createdAt),
                        year    = date.getFullYear(),
                        month   = date.getMonth(),
                        day     = date.getDate() - 1,
                        matrix  = {};

                    if(matrices.length > 0) {
                        matrix = matrices[0];

                        if(!matrix[subcategory]) {
                            matrix[subcategory] = self._generateNewMatrix();
                        }
                    }
                    else {
                        matrix[subcategory] = self._generateNewMatrix();
                    }

                    // increment total
                    matrix[subcategory].total++;

                    // calculate value
                    var productValue = policy.product.value,
                        value = {
                            day     : productValue * matrix[subcategory].price.day * interval.day,
                            week    : productValue * matrix[subcategory].price.week * interval.week,
                            month   : productValue * matrix[subcategory].price.month * interval.month,
                            year    : productValue * matrix[subcategory].price.year * interval.year
                        };

                    // update income matrix
                    matrix[subcategory].income.day   += value.day;
                    matrix[subcategory].income.week  += value.week;
                    matrix[subcategory].income.month += value.month;
                    matrix[subcategory].income.year  += value.year;

                    // profit = (income / expense) / profitExpected
                    var minimumExpense = 0.4,
                        expense = {
                            day: (function() {
                                return ( matrix[subcategory].income.day * minimumExpense > matrix[subcategory].expense.day) ?
                                            matrix[subcategory].income.day * minimumExpense : matrix[subcategory].expense.day
                            })(),
                            week: (function() {
                                return ( matrix[subcategory].income.week * minimumExpense > matrix[subcategory].expense.week) ?
                                            matrix[subcategory].income.week * minimumExpense : matrix[subcategory].expense.week
                            })(),
                            month: (function() {
                                return ( matrix[subcategory].income.month * minimumExpense > matrix[subcategory].expense.month) ?
                                            matrix[subcategory].income.month * minimumExpense : matrix[subcategory].expense.month
                            })(),
                            year: (function() {
                                return ( matrix[subcategory].income.year * minimumExpense > matrix[subcategory].expense.year) ?
                                            matrix[subcategory].income.year * minimumExpense : matrix[subcategory].expense.year
                            })()
                        },
                        profitExpected = 1.5,
                        profit = {
                            day     : ( matrix[subcategory].income.day   / expense.day   ) / profitExpected,
                            week    : ( matrix[subcategory].income.week  / expense.week  ) / profitExpected,
                            month   : ( matrix[subcategory].income.month / expense.month ) / profitExpected,
                            year    : ( matrix[subcategory].income.year  / expense.year  ) / profitExpected,
                        };

                    if(profit.day   === 0) { profit.day   = 1 }
                    if(profit.week  === 0) { profit.week  = 1 }
                    if(profit.month === 0) { profit.month = 1 }
                    if(profit.year  === 0) { profit.year  = 1 }

                    var profitAverage = {
                        day     : ((matrix[subcategory].averageProfit.day   * (matrix[subcategory].total - 1)) / matrix[subcategory].total) + (profit.day   / matrix[subcategory].total),
                        week    : ((matrix[subcategory].averageProfit.week  * (matrix[subcategory].total - 1)) / matrix[subcategory].total) + (profit.week  / matrix[subcategory].total),
                        month   : ((matrix[subcategory].averageProfit.month * (matrix[subcategory].total - 1)) / matrix[subcategory].total) + (profit.month / matrix[subcategory].total),
                        year    : ((matrix[subcategory].averageProfit.year  * (matrix[subcategory].total - 1)) / matrix[subcategory].total) + (profit.year  / matrix[subcategory].total)
                    }

                    // update average profit matrix
                    matrix[subcategory].averageProfit.day   = profitAverage.day;
                    matrix[subcategory].averageProfit.week  = profitAverage.week;
                    matrix[subcategory].averageProfit.month = profitAverage.month;
                    matrix[subcategory].averageProfit.year  = profitAverage.year;

                    // update profit matrix
                    matrix[subcategory].profit.day   = profit.day;
                    matrix[subcategory].profit.week  = profit.week;
                    matrix[subcategory].profit.month = profit.month;
                    matrix[subcategory].profit.year  = profit.year;

                    // price = ( currentPrice / profit )
                    var price = {
                        day     : matrix[subcategory].price.day   / profit.day,
                        week    : matrix[subcategory].price.week  / profit.week,
                        month   : matrix[subcategory].price.month / profit.month,
                        year    : matrix[subcategory].price.year  / profit.year
                    }

                    // update price matrix
                    matrix[subcategory].price.day   = price.day;
                    matrix[subcategory].price.week  = price.week;
                    matrix[subcategory].price.month = price.month;
                    matrix[subcategory].price.year  = price.year;

                    if(matrices.length > 0) {
                        self.updateMatrix(db, matrix);
                    }
                    else {
                        self.createMatrix(db, matrix);
                    }

                    callback();
                });

        },

        /**
         * @method generatePolicyQuote
         * @memberof Matrix
         * @description generate policy quote
         * @param {Object} policy policy object
         * @param {function} callback callback function
         */
        generatePolicyQuote: function(policy, callback) {

            var db = mongo.getDb(),
                self = this,
                subcategory = policy.product.subcategory,
                soldPrice = policy.value,

                startDate = new Date(policy.startDate),
                endDate = new Date(policy.endDate),
                timeDiff = Math.abs(endDate.getTime() - startDate.getTime()),
                diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)),
                interval = {};

                // number of years
                interval.year = Math.floor(diffDays / 365);
                diffDays = diffDays % 365;

                // number of months
                interval.month = Math.floor(diffDays / 30);
                diffDays = diffDays % 30;

                // number of weeks
                interval.week = Math.floor(diffDays / 7);
                diffDays = diffDays % 7;

                // number of days
                interval.day = diffDays;

                db.Matrix.find({}).toArray(function(err, matrices) {

                    var date    = new Date(policy.createdAt),
                        year    = date.getFullYear(),
                        month   = date.getMonth(),
                        day     = date.getDate() - 1,
                        matrix  = {};

                    if(matrices.length > 0) {
                        matrix = matrices[0];

                        if(!matrix[subcategory]) {
                            matrix[subcategory] = self._generateNewMatrix();
                        }
                    }
                    else {
                        matrix[subcategory] = self._generateNewMatrix();
                    }

                    // increment total
                    matrix[subcategory].total++;

                    // calculate value
                    var productValue = policy.product.value,
                        value = {
                            day     : productValue * matrix[subcategory].price.day * interval.day,
                            week    : productValue * matrix[subcategory].price.week * interval.week,
                            month   : productValue * matrix[subcategory].price.month * interval.month,
                            year    : productValue * matrix[subcategory].price.year * interval.year
                        },
                        totalValue = ( value.day    ) +
                                     ( value.week   ) +
                                     ( value.month  ) +
                                     ( value.year   );

                    totalValue = Math.round(totalValue);

                    // lower value is 1
                    if(totalValue < 200) {
                        totalValue = 200;
                    }

                    callback(totalValue);
                });

        },

        /**
         * @method _generateNewMatrix
         * @memberof Matrix
         * @description generate new matrix object
         * @return {Object}
         */
        _generateNewMatrix: function() {

            var percent = {
                    day     : 0.15,
                    week    : 0.15,
                    month   : 0.15,
                    year    : 0.15
                },
                price = {
                    day     : (percent.day   / 365),
                    week    : (percent.week  / 365)  * 7,
                    month   : (percent.month / 365)  * 30,
                    year    : (percent.year  / 365)  * 365
                };

            return {
                total   : 0,
                income  : { day: 0, week: 0, month: 0, year: 0 },
                expense : { day: 1, week: 1, month: 1, year: 1 },
                profit  : { day: 1, week: 1, month: 1, year: 1 },
                price   : { day: price.day, week: price.week, month: price.month, year: price.year },

                averageProfit  : { day: 1, week: 1, month: 1, year: 1 },
            };
        }
    }

    module.exports = Matrix;
})();
