import scrapeAmazon from './scrapers/amazon';

const singleton = Symbol('PriceScraper');
const singletonEnforcer = Symbol('PriceScraperEnforcer');

class PriceScraper {
    // Takes a policy object and scrapes multiple data sources to get value for product. 
    getPrice({session, policy}) {
        return new Promise((resolve) => {
            // Check database for existing entry
            // TODO

            // If entry doesn't exist or needs to be updated, run scrapers
            scrapeAmazon(policy)
            .then( policy => {
                resolve({session, policy})
            });
        });
    }

    static get instance() {
    if (!this[singleton]) {
      this[singleton] = new PriceScraper(singletonEnforcer);
    }

    return this[singleton];
  }
}

const priceScraper = PriceScraper.instance;
export default priceScraper;