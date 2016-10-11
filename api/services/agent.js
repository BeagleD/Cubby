var apiai = require('apiai'),
    app = apiai("be52b1e5e6394286976cc2dea892bf6f");

module.exports = {

    textRequest: function(req, res, next) {
        var textQuery = req.body.textQuery || "",
            request = app.textRequest(textQuery);

        request.on('response', function(response) {
            res.send(response);
        });

        request.on('error', function(error) {
            // console.log(error);
            return next(new Error('Text query request failed'));
        });

        request.end()
    }
}
