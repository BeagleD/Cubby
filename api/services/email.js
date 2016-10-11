(function(){
    'use strict';

    var nodemailer = require('nodemailer'),
        config = require('../config');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(config.MAIL_URL);

    // Email
    module.exports = {

        /**
         * sendTicketEmail - send a ticket to customer email
         *
         * @param  {Object} customer
         * @param  {Object} policy
         */
        sendTicketEmail: function(customer, policy) {

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: config.MAIL_FROM,
                to: customer.email,
                subject: 'Policy ticket number', // Subject line
                // text: 'Hello world', // plaintext body
                html: 'Your policy ticket number for "' + policy.product.name + '" is ' + '<b>' + policy.ticket + '</b>.'
            };

            this.sendEmail(mailOptions);
        },

        /**
         * sendEmail - send email
         *
         * @param  {Object} mailOptions
         */
        sendEmail(mailOptions) {
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
        }
    }

})();
