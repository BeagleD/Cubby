const API_VERSION = 'v1';
const API_URL = `http://127.0.0.1:8888/${API_VERSION}`;
const TIMEOUT = 10000;
const SECRET_KEY = 'sk_test_wCPyemzK7r6ZYaiRkEqzNvFN';
const USER_ID = '8hxw9x5A9QgSMXR6L';
const HEADERS = {
  authorization: `Basic ${new Buffer(`${SECRET_KEY}:`).toString('base64')}`,
};

export {
  API_URL,
  HEADERS,
  SECRET_KEY,
  TIMEOUT,
  USER_ID,
};
