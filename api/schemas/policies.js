(function() {
    'use strict';

    var SimpleSchema = require("node-simple-schema");

    var Schemas = {};

    Schemas.Product = new SimpleSchema({
    	name: { type: String },
        category: { type: String },
        subcategory: { type: String },
        manufacturer: { type: String, optional: true },
    	value: { type: Number }
    });

    Schemas.Policies = new SimpleSchema({
        customer: { type: String },
        startDate: { type: Number },
        endDate: { type: Number },
        currency: { type: String },
        product: { type: Schemas.Product },
        description: { type: String, optional: true },
        metadata: { type: Object, blackbox: true, optional: true }
    });

    module.exports = Schemas.Policies;
})();
