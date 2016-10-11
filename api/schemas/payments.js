(function() {
    'use strict';

    var SimpleSchema = require("node-simple-schema");

    var Schemas = {};

    Schemas.Payments = new SimpleSchema({
        userId: { type: String },
        createdAt: { type: Number },
        expires: { type: Number },
        status: { type: String },
        year: { type: Number },
        month: { type: Number },
        value: { type: Number },
        policies: { type: Array }
    });

    module.exports = Schemas.Policies;
})();
