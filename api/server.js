(function() {
    "use strict";

    var express = require('express'),
        basicAuth = require('basic-auth-connect'),
        bodyParser = require('body-parser'),
        app = express(),
        config = require('./config'),
        mongo = require('./services/mongo'),
        STError = require('./lib/error');

    // Asynchronous authentication
    var auth = basicAuth(function(user, pass, callback) {

        // check user credentials
        mongo.authenticateUser(user, function(error, result) {
            callback(error, result);
        });
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/api', auth, require('./routes/api'));
    app.use('/agent', require('./routes/agentApi'));

    app.use(function(req, res, next) {

        var error = new STError.STNotFoundError({
            createdAt: new Date().getTime(),
            type: 'not_found_error',
            message: 'Not found',
            details: req.url + ' not found'
        });

        next(error);
    });

    app.use(function(error, req, res, next) {

        var propertiesToDelete = ['createdAt', 'rawType', 'data'];

        for(var i = 0, len = propertiesToDelete.length; i < len; i++) {
            delete error[propertiesToDelete[i]];
        }

        res.status(error.status || 500).send(JSON.stringify({ error: error }, null, 2));
    });

    app.listen(8888);

    console.log('API is running on port 8888');

})();
