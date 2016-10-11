(function() {
    'use strict';

    module.exports = {
        Customers: require('./customers'),
        Policies: require('./policies'),


        /**
         * validate - validate schema context
         *
         * @param  {Object} context
         * @param  {Object} data
         * @param  {Function} callback
         */
        validate: function(context, data, callback) {
            
            if(!context.validate(data)) {
                var fields = context.invalidKeys();
                var message = {};

                for(var i in fields) {
                    message[fields[i].name] = context.keyErrorMessage(fields[i].name);
                }

                callback(false, JSON.stringify(message));
            }
            else {
                callback(true);
            }
        }
    }

})();
