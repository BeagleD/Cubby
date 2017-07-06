const API_VERSION = '/v1';
const SIZE_LIMIT = '300kb';
const MAIL_URL = 'smtps://webmaster%40sharetempus.com:share123@smtp.zoho.com';
const MAIL_FROM = 'webmaster@sharetempus.com';
const MAIL_NAME = 'ShareTempus';
const RAVEN_KEY = 'https://a82dce46e102401c9407cf3514a5b736:eb9e5b18038446aaa6be9e399adcced7@sentry.io/138935';

// prod urls
let MONGO_URL = 'mongodb://admin:admin@127.0.0.1:27017/live';
let MONGO_TEST_URL = 'mongodb://admin:admin@127.0.0.1:27017/test';

if (process.argv[2] === 'dev') {
  MONGO_URL = 'mongodb://admin:admin@ds015403.mlab.com:15403/sharetempus';
  MONGO_TEST_URL = 'mongodb://admin:admin@ds015403.mlab.com:15403/sharetempus-test';
}

export {
  API_VERSION,
  SIZE_LIMIT,
  MONGO_URL,
  MONGO_TEST_URL,
  MAIL_URL,
  MAIL_FROM,
  MAIL_NAME,
  RAVEN_KEY,
};
