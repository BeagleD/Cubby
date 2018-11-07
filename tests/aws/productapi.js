const rp        = require('request-promise');
const cheerio   = require('cheerio');
const tough     = require('tough-cookie');
const errors    = require('request-promise/errors');

var product = 'iphone+7';

// Cookie taken from Amazon session signed in to my own account. 
let cookie = new tough.Cookie({
    'aws-target-static-id':'1505332909232-883749',
    'aws-target-data':'%7B%22support%22%3A%221%22%7D',
    's_fid':'35F0119730947594-173938C1D26C5FC9',
    'aws-ubid-main':'333-7727086-0487073',
    'aws-session-id':'133-7451016-0006737',
    'ca':'AK8AAAgBAAALAkQCQAEAAEQ=',
    'session-id':'134-4920701-8018346',
    'ubid-main':'132-4510036-4111069',
    'amznacsleftnav-bcfec23d-3a59-3c4f-8152-9d928eb49a6d':'1',
    'aws-session-id-time':'2160343583l',
    'aws-priv':'eyJ2IjoxLCJldSI6MCwic3QiOjB9',
    'aws-business-metrics-last-visit':'1540678516741',
    'spblockdate':'1536507164172',
    'session-token':'ZS/oRdHnNNsgbOJpKQRAUjN4TQa2HHTV1Vfn+jkxOTgn5bdJ1BEhTNIfTmY8dccXeOr42ukjhFHLiwTNvRpXQXD7NfRpuIkyxFJdKN7B2QA5YGu9op10WZ9OOzdhJSvDN7JgzqWnUwYeVIIlE4593PAZFkrd0/uTaqAvjsaUHDXdgw/uS0YZISZw/kg1BP0Dfq0xdljtZABz0MdaGBm6SFOIboNZZ7x9ODADjPaQc6F6Pzh5pjc/Dr9JYFxXG5NHxWytDUGtVgG+J7wkHJekMg=='
});

var cookiejar = rp.jar();
cookiejar.setCookie(cookie, 'https://amazon.com');

// Array to hold query promises
var queries = [];

// Request information
var requestOptions = {
    uri: '',
    transform: function(body) {
        return cheerio.load(body);
    },
    headers: {
        'Accept-Encoding':'deflate'
    }
    // Sometimes this is needed, sometimes it's not???
    //jar: cookiejar
};

// Query first 5 pages
for( var i=0; i<5; i++ ) {
    var query = new Promise( function(resolve, reject) {
        // Set uri to specific page
        requestOptions.uri = 'https://www.amazon.com/s?ref=a9_asi_1&sort=price-desc-rank&k=' + product + '&page=' + i;

        rp(requestOptions)
        .then(($) => {
            var itemsToReturn = [];
            var items = $('.s-result-item');

            if( items.length == 0 ) {
                reject("No items");
            }

            // Iterate through items
            for( var j=0; j<items.length; j++ ) {
                let item = items[j];

                // Valid items contain a 'data-asin' which is a unique identifier. Ignore items with "AdHolder" class because they are sponsored ads and usually not what we want
                if( item.attribs['data-asin'] && !$(this).hasClass("AdHolder") ) {
                    var result = {};
                    result['id'] = item.attribs['data-asin'];
                    result['title'] = $(item).find('h2').attr('data-attribute');
                    result['url'] = $(item).find('.a-offscreen').parent().attr('href');
                    result['ref'] = requestOptions.uri;

                    var dollars = $(item).find('.sx-price-whole').text().replace(",","");
                    var cents = $(item).find('.sx-price-fractional').text();

                    // Parse dollars and add to results array
                    if( dollars != '' && cents != '') {
                        result['price'] = parseFloat( dollars + "." + cents );
                        itemsToReturn.push(result);
                    }
                }
            }
            resolve(itemsToReturn);

        })
        .catch( errors.StatusCodeError, function(err) {
            console.log("Request failed!");
            console.log(err);

            reject(err);
        });
    })

    // Add query promise to queries array
    queries.push(query);
}

// Wait for all queries to resolve
Promise.all(queries)
    .then( function(results) {
        var prices = [];

        // Results are returned as an array of arrays.
        // Combine results into single array
        for( var i=0; i<results.length; i++ ) {
            for( var j=0; j<results[i].length; j++ ) {
                // Ignore broken results
                if( parseFloat(results[i][j].price) > 10000 ) continue;

                prices.push( parseFloat(results[i][j].price) );
            }
        }
        
        // Sort values in incrementing order
        prices.sort((a,b) => isNaN(a) || a-b);

        console.log(prices);

        console.log("Low: " + prices[0]);
        console.log("Middle: " + prices[ parseInt(prices.length / 2) ]);
        console.log("High: " + prices[prices.length-1]);

        // Test mean
        var sum = 0.0;
        for( var i=parseInt(prices.length / 2); i<prices.length; i++ ) {
            sum += prices[i];
        }

        var mean = sum / (prices.length - parseInt(prices.length / 2) );

        console.log("Mean: " + mean );
    });