(function() {
    "use strict";

    var express = require('express'),
        router = express.Router(),
        Agent = require('../services/agent');

    router.post('/text-request', function(req, res, next) {
        Agent.textRequest(req, res, next);
    });

    module.exports = router;
})();
