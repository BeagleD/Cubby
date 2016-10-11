(function() {
    'use strict';

    var utils = require('./utils');

    module.exports = _Error;

    function _Error(raw) {
        this.populate.apply(this, arguments);
        // this.stack = (new Error(this.message)).stack;
    }

    // Extend Native Error
    _Error.prototype = Object.create(Error.prototype);

    _Error.prototype.type = 'GenericError';
    _Error.prototype.populate = function(type, message) {
        this.type = type;
        this.message = message;
    };

    _Error.extend = utils.protoExtend;

    var STError = _Error.STError = _Error.extend({
        type: 'STError',
        status: 500,
        populate: function(raw) {
            // Move from prototype def (so it appears in stringified obj)
            this.type = this.type;
            this.status = this.status;

            this.createdAt = raw.createdAt;
            this.rawType = raw.type;
            this.message = raw.message;
            this.details = raw.details;
            this.data = raw.data;

            // this.stack = (new Error(raw.message)).stack;
            // this.code = raw.code;
            // this.param = raw.param;
            // this.raw = raw;
            // this.requestId = raw.requestId;

        },
    });

    // Specific ShareTempus Error types:

    // 400 - Bad Request
    _Error.STBadRequestError = STError.extend({type: 'STBadRequestError', status: 400});
    // 401 - Unauthorized
    _Error.STUnauthorizedError = STError.extend({type: 'STUnauthorizedError', status: 401});
    // 402 - Request Failed
    _Error.STInvalidRequestError = STError.extend({type: 'STInvalidRequestError', status: 402});
    // 404 - Not Found
    _Error.STNotFoundError = STError.extend({type: 'STNotFoundError', status: 404});
    // 429 - Too Many Requests
    _Error.STRateLimitError = STError.extend({type: 'STRateLimitError', status: 429});
    // 500 - Server Errors
    _Error.STServerError = STError.extend({type: 'STServerError', status: 500});

    // var test = new _Error.STInvalidRequestError({
    //     createdAt: new Date().getTime(),
    //     type: 'invalid_request_error',
    //     message: 'test',
    //     statusCode: 402,
    //     detail: ''
    // });
    //
    // console.log(test);

})();
