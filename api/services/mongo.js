(function() {
    'use strict';

    var MongoClient = require( 'mongodb' ).MongoClient,
        config = require('../config');

    var _db, _dbLive, _user;

    // Mongo
    module.exports = {

        /**
         * @method authenticateUser
         * @memberof Mongo
         * @description authenticate user
         * @param  {String} secretKey
         * @param  {Function} callback
         */
        authenticateUser(secretKey, callback) {
            var _this = this;

            if(!secretKey) {
                callback(true, false);
            }
            else if(_user) {
                checkSecretKey();
            }
            else {

                if(secretKey.indexOf('live') >= 0) {
                    MongoClient.connect(config.MONGO_URL, function(err, db) {
                        _db = db;
                        _dbLive = db;
                        checkSecretKey();
                    });
                }
                else if(secretKey.indexOf('test') >= 0) {
                    MongoClient.connect(config.MONGO_URL, function(err, db) {
                        _dbLive = db;

                        MongoClient.connect(config.MONGO_TEST_URL, function(err, db) {
                            _db = db;
                            checkSecretKey();
                        });
                    });
                }
                else {
                    callback(true, false);
                }
            }

            function checkSecretKey() {

                var db = _this.getDb(),
                    query = {};

                if(secretKey.indexOf('live') >= 0) {
                    query = { 'private.secretKey': secretKey }
                }
                else {
                    query = { 'private.secretTestKey': secretKey }
                }

                db.Users.findOne(query).then(function(user) {
                    if(user) {
                        _user = user;
                        callback(false, true);
                    }
                    else {
                        callback(true, false);
                    }
                });
            }
        },

        /**
         * @method getConnection
         * @memberof Mongo
         * @description get live or test connection based in secretKey
         * @param  {String} secretKey
         * @param  {Function} callback
         */
        getConnection(secretKey, callback, next) {
            var _this = this;

            if(secretKey.indexOf('live') >= 0) {
                MongoClient.connect(config.MONGO_URL, function(err, db) {
                    _db = db;
                    _dbLive = db;
                    checkSecretKey();
                });
            }
            else if(secretKey.indexOf('test') >= 0) {
                MongoClient.connect(config.MONGO_URL, function(err, db) {
                    _dbLive = db;

                    MongoClient.connect(config.MONGO_TEST_URL, function(err, db) {
                        _db = db;
                        checkSecretKey();
                    });
                });
            }

            function checkSecretKey() {

                var db = _this.getDb(),
                    query = {};

                if(secretKey.indexOf('live') >= 0) {
                    query = { 'private.secretKey': secretKey }
                }
                else {
                    query = { 'private.secretTestKey': secretKey }
                }

                db.Users.findOne(query).then(function(user) {
                    if(user) {
                        _user = user;
                        return callback();
                    }
                    else {
                        return next(new Error('Invalid secret key'));
                    }
                });
            }
        },

        /**
         * @method getDb
         * @memberof Mongo
         * @description get mongo collections
         * @return {Object}
         */
        getDb: function() {
            return {
                Counter: _db.collection('counter'),
                Customers: _db.collection('customers'),
                Matrix: _db.collection('matrix'),
                Payments: _db.collection('payments'),
                Policies: _db.collection('policies'),
                Users: _dbLive.collection('users')
            };
        },

        getLiveDb: function(callback) {
            MongoClient.connect(config.MONGO_URL, function(err, db) {
                if(!err) {
                    var liveDb = {
                        Counter: db.collection('counter'),
                        Customers: db.collection('customers'),
                        Matrix: db.collection('matrix'),
                        Payments: db.collection('payments'),
                        Policies: db.collection('policies'),
                    }

                    callback(false, liveDb)
                }
                else {
                    callback(err, false);
                }
            });
        },

        getTestDb: function(callback) {
            MongoClient.connect(config.MONGO_TEST_URL, function(err, db) {
                if(!err) {
                    var testDb = {
                        Counter: db.collection('counter'),
                        Customers: db.collection('customers'),
                        Matrix: db.collection('matrix'),
                        Payments: db.collection('payments'),
                        Policies: db.collection('policies'),
                    }

                    callback(false, testDb)
                }
                else {
                    callback(err, false);
                }
            });
        },

        getUser: function() {
            return _user;
        },

        getUserId: function() {
            return _user._id;
        }
    };

})();
