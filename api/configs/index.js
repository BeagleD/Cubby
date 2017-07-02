const API_VERSION = '/v1';
const MAIL_URL = 'smtps://webmaster%40sharetempus.com:share123@smtp.zoho.com';
const MAIL_FROM = 'webmaster@sharetempus.com';
const MAIL_NAME = 'ShareTempus';

// prod urls
let MONGO_URL = 'mongodb://admin:admin@127.0.0.1:27017/live';
let MONGO_TEST_URL = 'mongodb://admin:admin@127.0.0.1:27017/test';

if (process.argv[2] === 'dev') {
  MONGO_URL = 'mongodb://admin:admin@ds015403.mlab.com:15403/sharetempus';
  MONGO_TEST_URL = 'mongodb://admin:admin@ds015403.mlab.com:15403/sharetempus-test';
}

export {
  API_VERSION,
  MONGO_URL,
  MONGO_TEST_URL,
  MAIL_URL,
  MAIL_FROM,
  MAIL_NAME,
};
