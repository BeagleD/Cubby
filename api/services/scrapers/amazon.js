const rp        = require('request-promise');
const cheerio   = require('cheerio');
const tough     = require('tough-cookie');
const errors    = require('request-promise/errors');

function scrapeAmazon(policy) {
    return new Promise((res) => {
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
        };

        // Format product (Replace spaces with "+", make lower case)
        var product = policy.product.name.replace(/\s/g, "+").toLowerCase();

        // Query first 5 pages
        for( var i=0; i<5; i++ ) {
            var query = new Promise( function(resolve, reject) {
                // Set uri to specific page
                requestOptions.uri = 'https://www.amazon.com/s?ref=a9_asi_1&sort=price-desc-rank&k=' + product + '&page=' + i;

                rp(requestOptions)
                .then(($) => {
                    var itemsToReturn = [];
                    var items = $('.s-result-item');

                    // If scraper doesn't find items, return original policy
                    if( items.length == 0 ) {
                        resolve(policy);
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

            // 
            var sum = 0.0;
            for( var i=parseInt(prices.length / 2); i<prices.length; i++ ) {
                sum += prices[i];
            }

            // Estimated value is the mean of the top 50% most expensive results
            var estimatedValue = sum / (prices.length - parseInt(prices.length / 2) );

            // If no values are returned or there is an error, estimatedValue will be NaN
            if( !isNaN(estimatedValue) ) {
                policy.product.value = Math.round(estimatedValue * 100);
            }

            res(policy);
        });

    });
}

export default scrapeAmazon;