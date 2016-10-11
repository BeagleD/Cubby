var request = require("request");

// var _baseURL = "http://localhost:8888/api/",
var _baseURL = "http://104.236.60.113:8888/api/",
    _url = {
        customer: {
            create: _baseURL + 'customers/create',
            retrieve: _baseURL + 'customers/:customer'
        }
    };

/* ============================================================================
    TEST ACCOUNT
    username: example@test.com
    password: test123
    liveKey: sk_live_JhA9GjR2wgsBnBKHLmAmPaS3
    testKey: sk_test_wCPyemzK7r6ZYaiRkEqzNvFN
============================================================================ */

describe("Customers", function() {

    it("Should generate an error of unauthorized", function(done) {
        _getRequestWithInvalidKey(_url.customer.retrieve
            .replace(':customer', "cus_test123")
            .replace(':secretKey', "sk_test_12345"),
        function(error, response, body) {
            expect(body).toBe('Unauthorized');
            done();
        });
    });

    it("Should generate an error of customer already exist", function(done) {
        _postRequest(_url.customer.create, {
            "email": "customer@test.com",
            "legalEntity": {
                "type": "individual",
                "firstName": "Customer",
                "lastName": "Example",
                "birthdate": 637124400000,
                "ssnLast4": "1234",
                "address": {
                    "city": "New York City",
                    "country": "US",
                    "line1": "East 169th Street",
                    "line2": "Apt. 2A Bronx",
                    "postalCode": "10456",
                    "state": "New York"
                }
            }
        }, function(error, response, body) {
            expect(response.statusCode).toBe(402);
            expect(body.error.message).toBe('Customer already exist');
            done();
        });
    });

    it("Should generate a field required error", function(done) {
        _postRequest(_url.customer.create, {
            "email": "customer@test.com",
            "legalEntity": {
                "type": "individual",
                "firstName": "Customer",
                "lastName": "Example",
                "ssnLast4": "1234",
                "address": {
                    "city": "New York City",
                    "country": "US",
                    "line1": "East 169th Street",
                    "line2": "Apt. 2A Bronx",
                    "postalCode": "10456",
                    "state": "New York"
                }
            }
        }, function(error, response, body) {
            expect(response.statusCode).toBe(400);
            expect(body.error.details).toBe('{"legalEntity.birthdate":"Birthdate is required"}');
            done();
        });
    });

    it("Should generate an error of field not allowed in schema", function(done) {
        _postRequest(_url.customer.create, {
            "email": "customer@test.com",
            "errorField": "error",
            "legalEntity": {
                "type": "individual",
                "firstName": "Customer",
                "lastName": "Example",
                "birthdate": 637124400000,
                "ssnLast4": "1234",
                "address": {
                    "city": "New York City",
                    "country": "US",
                    "line1": "East 169th Street",
                    "line2": "Apt. 2A Bronx",
                    "postalCode": "10456",
                    "state": "New York"
                }
            }
        }, function(error, response, body) {
            expect(response.statusCode).toBe(400);
            expect(body.error.details).toBe('{"errorField":"errorField is not allowed by the schema"}');
            done();
        });
    });

    it("Should retrieve a customer", function(done) {
        _getRequest(_url.customer.retrieve
            .replace(':customer', "cus_dD2r2Ib8kPMhg5C3YvlqRwb7")
            .replace(':secretKey', "sk_test_wCPyemzK7r6ZYaiRkEqzNvFN"),
        function(error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(body.email).toBe('customer@test.com');
            expect(body.id).toBe('cus_dD2r2Ib8kPMhg5C3YvlqRwb7');
            done();
        });
    });
});

/**
 * _postRequest - http post request
 *
 * @param  {String} url
 * @param  {Object} body
 * @param  {Function} callback
 */
function _postRequest(url, body, callback) {

    var auth = 'Basic ' + new Buffer("sk_test_wCPyemzK7r6ZYaiRkEqzNvFN:").toString('base64');

    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': auth
        },
        body: body
    }, callback);
}

/**
 * _getRequest - http get request
 *
 * @param  {String} url
 * @param  {Function} callback
 */
function _getRequest(url, callback) {

    var auth = 'Basic ' + new Buffer("sk_test_wCPyemzK7r6ZYaiRkEqzNvFN:").toString('base64');

    request({
        url: url,
        method: "GET",
        json: true,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': auth
        },
    }, callback);
}

/**
 * _getRequest - http get request
 *
 * @param  {String} url
 * @param  {Function} callback
 */
function _getRequestWithInvalidKey(url, callback) {

    var auth = 'Basic ' + new Buffer("invalid_key:").toString('base64');

    request({
        url: url,
        method: "GET",
        json: true,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': auth
        },
    }, callback);
}
