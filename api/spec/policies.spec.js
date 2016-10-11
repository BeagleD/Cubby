var request = require("request");

// var _baseURL = "http://localhost:8888/api/",
var _baseURL = "http://104.236.60.113:8888/api/",
    _url = {
        policy: {
            quote: _baseURL + 'policies/quote',
            create: _baseURL + 'policies/create',
            retrieve: _baseURL + 'policies/:policy'
        }
    };

/* ============================================================================
    TEST ACCOUNT
    username: example@test.com
    password: test123
    liveKey: sk_live_JhA9GjR2wgsBnBKHLmAmPaS3
    testKey: sk_test_wCPyemzK7r6ZYaiRkEqzNvFN

    customer: cus_dD2r2Ib8kPMhg5C3YvlqRwb7
============================================================================ */

describe("Policies", function() {

    var token, policyId;

    it("Should generate an error of unauthorized", function(done) {
        _getRequestWithInvalidKey(_url.policy.retrieve
            .replace(':policy', "pol_jld6O3mLdeMzrzTP83pR2jJF")
            .replace(':secretKey', "sk_test_12345"),
        function(error, response, body) {
            expect(body).toBe('Unauthorized');
            done();
        });
    });

    it("Should generate a policy quote", function(done) {

        var today = new Date().getTime();

        _postRequest(_url.policy.quote, {
            "customer": "cus_dD2r2Ib8kPMhg5C3YvlqRwb7",
            "currency": "usd",
            "startDate": today,
            "endDate": (today + 10000000),
            "product": {
                "name": "FIAT Uno",
                "category": "Automotive",
                "subcategory": "Car Electronics & Accessories",
                "manufacturer": "FIAT",
                "value": 4272212
            },
            "description": "",
            "metadata": {}
        }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(body.token).not.toBe(undefined);
            expect(body.quote).not.toBe(undefined);

            token = body.token;

            done();
        });
    });

    it("Should create a policy", function(done) {
        _postRequest(_url.policy.create, {
            "token": token
        }, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(body).not.toBeUndefined();
            expect(body.id).not.toBeUndefined();
            expect(body.token).toBeUndefined();
            expect(body.private).toBeUndefined();

            policyId = body.id;

            done();
        });
    });

    it("Should retrieve a policy", function(done) {
        _getRequest(_url.policy.retrieve
            .replace(':policy', policyId)
            .replace(':secretKey', "sk_test_wCPyemzK7r6ZYaiRkEqzNvFN"),
        function(error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(body.id).toBe(policyId);
            expect(body.product).not.toBeUndefined();
            expect(body.token).toBeUndefined();
            expect(body.private).toBeUndefined();
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
