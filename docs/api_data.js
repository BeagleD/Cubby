define({ "api": [
  {
    "type": "get",
    "url": "/categories",
    "title": "1. Retrieve categories",
    "version": "0.1.0",
    "name": "GetCategories",
    "group": "Categories",
    "description": "<p>Retrieve the product categories used to get a policy quote</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/categories \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.categories.retrieve().then(function(categories) {\n  console.log(categories);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\ncategories = sharetempus.categories.retrieve();\nprint(categories);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "categories",
            "description": "<p>Categories object</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          }
        ]
      }
    },
    "filename": "api/routes/categories.js",
    "groupTitle": "Categories"
  },
  {
    "type": "post",
    "url": "/claims/create",
    "title": "1. Create new claim",
    "version": "0.1.0",
    "name": "CreateClaim",
    "group": "Claim",
    "description": "<p>Created a new claim</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/claims/create \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d subject=\"iPhone 7 Damaged\" \\\n  -d type=\"damaged\" \\\n  -d content=\"My iPhone 7 fell and broke the screen\" \\\n  -d \"policy[id]=pol_PX7OhipGlRb4QcvOvklkreBv\" \\\n  -d \"policy[ticket]=ticket_ONVGqM1k\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.claims.create({\n  subject: 'iPhone 7 Damaged',\n  type: 'damaged',\n  content: 'My iPhone 7 fell and broke the screen',\n  policy: {\n    id: 'pol_PX7OhipGlRb4QcvOvklkreBv',\n    ticket: 'ticket_ONVGqM1k'\n  }\n}).then(function(claim) {\n  console.log(claim);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nclaim = sharetempus.claims.create({\n  subject: \"iPhone 7 Damaged\",\n  type: \"damaged\",\n  content: \"My iPhone 7 fell and broke the screen\",\n  policy: {\n    id: \"pol_PX7OhipGlRb4QcvOvklkreBv\",\n    ticket: \"ticket_ONVGqM1k\"\n  }\n});\nprint(claim);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Claim subject</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Claim type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Claim content</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>(optional) Product images</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "policy",
            "description": "<p>Policy data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "policy.id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "policy.ticket",
            "description": "<p>Policy ticket</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Claim id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Claim subject</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Claim type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Claim content</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>Product images (limit = 3)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "policy",
            "description": "<p>Policy data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "policy.id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "policy.ticket",
            "description": "<p>Policy ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer.id",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer.email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Claim creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"id\": \"clm_NAlLt3lpam1THwijiL3nCyjR\",\n  \"subject\": \"iPhone 7 Damaged\",\n  \"type\": \"damaged\",\n  \"content\": \"My iPhone 7 fell and broke the screen\",\n  \"status\": \"opened\",\n  \"images\": [],\n  \"createdAt\": 1485043299015,\n  \"policy\": {\n    \"id\": \"pol_PX7OhipGlRb4QcvOvklkreBv\",\n    \"ticket\": \"ticket_ONVGqM1k\"\n  },\n  \"customer\": {\n    \"id\": \"cus_u4bXy2Zhkq9YW0hVSMwLdZ2U\",\n    \"email\": \"lucasbr.dafonseca@gmail.com\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Policy time expired\",\n    \"details\": \"pol_PX7OhipGlRb4QcvOvklkreBv time expired\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/claims.js",
    "groupTitle": "Claim"
  },
  {
    "type": "post",
    "url": "/claims/:claim",
    "title": "2. Retrieve claim",
    "version": "0.1.0",
    "name": "RetrieveClaim",
    "group": "Claim",
    "description": "<p>Retrieve a created claim</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/claims/clm_NAlLt3lpam1THwijiL3nCyjR \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.claims.retrieve({\n  claim: 'clm_NAlLt3lpam1THwijiL3nCyjR'\n}).then(function(claim) {\n  console.log(claim);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nclaim = sharetempus.claims.retrieve({\n  claim: \"clm_NAlLt3lpam1THwijiL3nCyjR\"\n});\nprint(claim);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Claim id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Claim id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Claim subject</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Claim type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Claim content</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>Product images</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "policy",
            "description": "<p>Policy data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "policy.id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "policy.ticket",
            "description": "<p>Policy ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer.id",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer.email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Claim creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"id\": \"clm_NAlLt3lpam1THwijiL3nCyjR\",\n  \"subject\": \"iPhone 7 Damaged\",\n  \"type\": \"damaged\",\n  \"content\": \"My iPhone 7 fell and broke the screen\",\n  \"status\": \"opened\",\n  \"images\": [],\n  \"createdAt\": 1485043299015,\n  \"policy\": {\n    \"id\": \"pol_PX7OhipGlRb4QcvOvklkreBv\",\n    \"ticket\": \"ticket_ONVGqM1k\"\n  },\n  \"customer\": {\n    \"id\": \"cus_u4bXy2Zhkq9YW0hVSMwLdZ2U\",\n    \"email\": \"lucasbr.dafonseca@gmail.com\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Claim clm_NAlLt3lpam1THwijiL3nCyj not found\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/claims.js",
    "groupTitle": "Claim"
  },
  {
    "type": "post",
    "url": "/customers/create",
    "title": "1. Create new customer",
    "version": "0.1.0",
    "name": "CreateCustomer",
    "group": "Customer",
    "description": "<p>Created a new customer</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/customers/create \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d email=\"customerjsmith@sharetempus.com\" \\\n  -d \"legalEntity[type]=individual\" \\\n  -d \"legalEntity[firstName]=John\" \\\n  -d \"legalEntity[lastName]=Smith\" \\\n  -d \"legalEntity[birthdate]=637124400000\" \\\n  -d \"legalEntity[ssnLast4]=1234\" \\\n  -d \"legalEntity[address][city]=New York City\" \\\n  -d \"legalEntity[address][country]=US\" \\\n  -d \"legalEntity[address][line1]=East 169th Street\" \\\n  -d \"legalEntity[address][line2]=Apt. 2A Bronx\" \\\n  -d \"legalEntity[address][postalCode]=10456\" \\\n  -d \"legalEntity[address][state]=New York\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.customers.create({\n  email: 'customerjsmith@sharetempus.com',\n  legalEntity: {\n    type: 'individual',\n    firstName: 'John',\n    lastName: 'Smith',\n    birthdate: 637124400000,\n    ssnLast4: '1234',\n    address: {\n      city: 'New York City',\n      country: 'US',\n      line1: 'East 169th Street',\n      line2: 'Apt. 2A Bronx',\n      postalCode: '10456',\n      state: 'New York'\n    }\n  }\n}).then(function(customer) {\n  console.log(customer);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\ncustomer = sharetempus.customers.create({\n  email: \"customerjsmith@sharetempus.com\",\n  legalEntity: {\n    type: \"individual\",\n    firstName: \"John\",\n    lastName: \"Smith\",\n    birthdate: 637124400000,\n    ssnLast4: \"1234\",\n    address: {\n      city: \"New York City\",\n      country: \"US\",\n      line1: \"East 169th Street\",\n      line2: \"Apt. 2A Bronx\",\n      postalCode: \"10456\",\n      state: \"New York\"\n    }\n  }\n});\nprint(customer);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "legalEntity",
            "description": "<p>Legal entity data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.type",
            "description": "<p>Legal entity type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.firstName",
            "description": "<p>Customer first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.lastName",
            "description": "<p>Customer last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "legalEntity.birthdate",
            "description": "<p>Customer birthdate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.ssnLast4",
            "description": "<p>Customer last 4 digits of SSN</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "legalEntity.address",
            "description": "<p>Customer address data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.city",
            "description": "<p>Customer city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.country",
            "description": "<p>Customer country</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line1",
            "description": "<p>Customer line 1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line2",
            "description": "<p>Customer line 2</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.postalCode",
            "description": "<p>Customer postal code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.state",
            "description": "<p>Customer state</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>(optional) Metadata</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity",
            "description": "<p>Legal entity data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.type",
            "description": "<p>Legal entity type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.firstName",
            "description": "<p>Customer first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.lastName",
            "description": "<p>Customer last name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "legalEntity.birthdate",
            "description": "<p>Customer birthdate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.ssnLast4",
            "description": "<p>Customer last 4 digits of SSN</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity.address",
            "description": "<p>Customer address data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.city",
            "description": "<p>Customer city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.country",
            "description": "<p>Customer country</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line1",
            "description": "<p>Customer line 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line2",
            "description": "<p>Customer line 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.postalCode",
            "description": "<p>Customer postal code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.state",
            "description": "<p>Customer state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Custome creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"email\": \"customerjsmith@sharetempus.com\",\n  \"legalEntity\": {\n    \"type\": \"individual\",\n    \"firstName\": \"John\",\n    \"lastName\": \"Smith\",\n    \"birthdate\": 637124400000,\n    \"ssnLast4\": \"1234\",\n      \"address\": {\n      \"city\": \"New York City\",\n      \"country\": \"US\",\n      \"line1\": \"East 169th Street\",\n      \"line2\": \"Apt. 2A Bronx\",\n      \"postalCode\": \"10456\",\n      \"state\": \"New York\"\n    }\n  },\n  \"id\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"createdAt\": 1473458205461\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": " {\n  \"error\": {\n    \"type\": \"bad_request_error\",\n    \"status\": 400,\n    \"message\": \"{\\\"legalEntity.birthdate\\\":\\\"Birthdate is required\\\"}\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/customers.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customers/find",
    "title": "4. Find customer",
    "version": "0.1.0",
    "name": "FindCustomer",
    "group": "Customer",
    "description": "<p>Find a customer by email</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/customers/find \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d email=\"customerjsmith@sharetempus.com\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.customers.find({\n  email: 'customerjsmith@sharetempus.com'\n}).then(function(customer) {\n  console.log(customer);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\ncustomer = sharetempus.customers.find({\n  email: \"customerjsmith@sharetempus.com\"\n});\nprint(customer);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity",
            "description": "<p>Legal entity data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.type",
            "description": "<p>Legal entity type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.firstName",
            "description": "<p>Customer first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.lastName",
            "description": "<p>Customer last name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "legalEntity.birthdate",
            "description": "<p>Customer birthdate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.ssnLast4",
            "description": "<p>Customer last 4 digits of SSN</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity.address",
            "description": "<p>Customer address data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.city",
            "description": "<p>Customer city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.country",
            "description": "<p>Customer country</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line1",
            "description": "<p>Customer line 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line2",
            "description": "<p>Customer line 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.postalCode",
            "description": "<p>Customer postal code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.state",
            "description": "<p>Customer state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Custome creation date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Metadata</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"email\": \"customerjsmith@sharetempus.com\",\n  \"legalEntity\": {\n    \"type\": \"individual\",\n    \"firstName\": \"John\",\n    \"lastName\": \"Smith\",\n    \"birthdate\": 637124400000,\n    \"ssnLast4\": \"1234\",\n    \"address\": {\n      \"city\": \"New York City\",\n      \"country\": \"US\",\n      \"line1\": \"East 169th Street\",\n      \"line2\": \"Apt. 2A Bronx\",\n      \"postalCode\": \"10456\",\n      \"state\": \"New York\"\n    }\n  },\n  \"id\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"createdAt\": 1473458205461\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Customer customerjsmith@sharetempus.com not found\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/customers.js",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/customers/:customer",
    "title": "3. Retrieve customer",
    "version": "0.1.0",
    "name": "RetrieveCustomer",
    "group": "Customer",
    "description": "<p>Retrieve a customer by id</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/customers/cus_oC3ImnDw1Iqw1b3sx5CITtbc \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.customers.retrieve({\n  customer: 'cus_oC3ImnDw1Iqw1b3sx5CITtbc'\n}).then(function(customer) {\n  console.log(customer);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\ncustomer = sharetempus.customers.retrieve({\n  customer: \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\"\n});\nprint(customer);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity",
            "description": "<p>Legal entity data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.type",
            "description": "<p>Legal entity type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.firstName",
            "description": "<p>Customer first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.lastName",
            "description": "<p>Customer last name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "legalEntity.birthdate",
            "description": "<p>Customer birthdate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.ssnLast4",
            "description": "<p>Customer last 4 digits of SSN</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity.address",
            "description": "<p>Customer address data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.city",
            "description": "<p>Customer city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.country",
            "description": "<p>Customer country</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line1",
            "description": "<p>Customer line 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line2",
            "description": "<p>Customer line 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.postalCode",
            "description": "<p>Customer postal code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.state",
            "description": "<p>Customer state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Custome creation date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Metadata</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"email\": \"customerjsmith@sharetempus.com\",\n  \"legalEntity\": {\n    \"type\": \"individual\",\n    \"firstName\": \"John\",\n    \"lastName\": \"Smith\",\n    \"birthdate\": 637124400000,\n    \"ssnLast4\": \"1234\",\n    \"address\": {\n      \"city\": \"New York City\",\n      \"country\": \"US\",\n      \"line1\": \"East 169th Street\",\n      \"line2\": \"Apt. 2A Bronx\",\n      \"postalCode\": \"10456\",\n      \"state\": \"New York\"\n    }\n  },\n  \"id\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"createdAt\": 1473458205461\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Customer cus_oC3ImnDw1Iqw1b3sx5CItbc not found\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/customers.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customers/update",
    "title": "2. Update customer",
    "version": "0.1.0",
    "name": "UpdateCustomer",
    "group": "Customer",
    "description": "<p>Update a customer</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/customers/update \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d \"id=cus_dD2r2Ib8kPMhg5C3YvlqRwb7\" \\\n  -d \"legalEntity[address][line2]=Apt. 1A Bronx\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.customers.update({\n  id: 'cus_dD2r2Ib8kPMhg5C3YvlqRwb7',\n  legalEntity: {\n    address: {\n      line2: 'Apt. 1A Bronx'\n    }\n  }\n}).then(function(customer) {\n  console.log(customer);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\ncustomer = sharetempus.customers.update({\n  id: \"cus_dD2r2Ib8kPMhg5C3YvlqRwb7\",\n  legalEntity: {\n    address: {\n      line2: \"Apt. 1A Bronx\"\n    }\n  }\n});\nprint(customer);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>(optional) Customer email</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "legalEntity",
            "description": "<p>(optional) Legal entity data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.firstName",
            "description": "<p>(optional) Customer first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.lastName",
            "description": "<p>(optional) Customer last name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "legalEntity.birthdate",
            "description": "<p>(optional) Customer birthdate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.ssnLast4",
            "description": "<p>(optional) Customer last 4 digits of SSN</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "legalEntity.address",
            "description": "<p>(optional) Customer address data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.city",
            "description": "<p>(optional) Customer city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.country",
            "description": "<p>(optional) Customer country</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line1",
            "description": "<p>(optional) Customer line 1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line2",
            "description": "<p>(optional) Customer line 2</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.postalCode",
            "description": "<p>(optional) Customer postal code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.state",
            "description": "<p>(optional) Customer state</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>(optional) Metadata</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity",
            "description": "<p>Legal entity data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.type",
            "description": "<p>Legal entity type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.firstName",
            "description": "<p>Customer first name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.lastName",
            "description": "<p>Customer last name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "legalEntity.birthdate",
            "description": "<p>Customer birthdate</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.ssnLast4",
            "description": "<p>Customer last 4 digits of SSN</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "legalEntity.address",
            "description": "<p>Customer address data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.city",
            "description": "<p>Customer city</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.country",
            "description": "<p>Customer country</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line1",
            "description": "<p>Customer line 1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.line2",
            "description": "<p>Customer line 2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.postalCode",
            "description": "<p>Customer postal code</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "legalEntity.address.state",
            "description": "<p>Customer state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Custome creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"email\": \"customerjsmith@sharetempus.com\",\n  \"legalEntity\": {\n    \"type\": \"individual\",\n    \"firstName\": \"John\",\n    \"lastName\": \"Smith\",\n    \"birthdate\": 637124400000,\n    \"ssnLast4\": \"1234\",\n    \"address\": {\n      \"city\": \"New York City\",\n      \"country\": \"US\",\n      \"line1\": \"East 169th Street\",\n      \"line2\": \"Apt. 1A Bronx\",\n      \"postalCode\": \"10456\",\n      \"state\": \"New York\"\n    }\n  },\n  \"id\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"createdAt\": 1473458205461\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n   \"error\": {\n     \"type\": \"bad_request_error\",\n     \"status\": 400,\n     \"message\": \"{\\\"legalEntity.type\\\":\\\"legalEntity.type is not allowed by the schema\\\"}\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/customers.js",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/events/:event",
    "title": "1. Retrieve event",
    "version": "0.1.0",
    "name": "RetrieveEvent",
    "group": "Event",
    "description": "<p>Retrieve a created event</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/event/evt_i5OkJyAi3ffM4mTjf68bRFz0 \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.events.retrieve({\n  event: 'evt_i5OkJyAi3ffM4mTjf68bRFz0'\n}).then(function(event) {\n  console.log(event);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\ncustomer = sharetempus.events.retrieve({\n  customer: \"evt_i5OkJyAi3ffM4mTjf68bRFz0\"\n});\nprint(event);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "event",
            "description": "<p>Event id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Event id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Event type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Event creation date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "request",
            "description": "<p>request log id</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isLiveMode",
            "description": "<p>test(false)|live(true) mode</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Event data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"id\" : \"evt_i5OkJyAi3ffM4mTjf68bRFz0\",\n  \"type\" : \"customer.created\",\n  \"createdAt\" : 1484964039313,\n  \"request\" : \"req_tWt2LCOAq2EYJJ10uWdGd3hP\",\n  \"isLiveMode\" : false,\n  \"data\" : {\n    \"email\" : \"customerjsmith@sharetempus.com\",\n    \"legalEntity\" : {\n      \"type\" : \"individual\",\n      \"firstName\" : \"John\",\n      \"lastName\" : \"Smith\",\n      \"birthdate\" : 637124400000,\n      \"ssnLast4\" : \"1234\",\n      \"address\" : {\n        \"city\" : \"New York City\",\n        \"country\" : \"US\",\n        \"line1\" : \"East 169th Street\",\n        \"line2\" : \"Apt. 2A Bronx\",\n        \"postalCode\" : \"10456\",\n        \"state\" : \"New York\"\n      }\n    },\n    \"id\" : \"cus_4lwmU6mHpavjzGEqEPVFXGhq\",\n    \"createdAt\" : 1484964038659\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Event evt_i5OkJyAi3ffM4mTjf68bRFz0 not found\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/events.js",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/policies/create",
    "title": "2. Create new policy",
    "version": "0.1.0",
    "name": "CreatePolicy",
    "group": "Policy",
    "description": "<p>Create a new policy using the token generated by quote method</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/policies/create \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d token=\"tok_Q1gBkjj8wdAkOg0pj8bf8uQO\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.policies.create({\n  token: 'tok_Q1gBkjj8wdAkOg0pj8bf8uQO'\n}).then(function(policy) {\n  console.log(policy);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\npolicy = sharetempus.policies.create({\n  token: \"tok_Q1gBkjj8wdAkOg0pj8bf8uQO\"\n});\nprint(policy);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token used to create the policy</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date of policy active period</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "endDate",
            "description": "<p>End date of policy active period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "renter",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Product data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.category",
            "description": "<p>Product category (based in our <a href=\"#api-Categories-GetCategories\">categories</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.subcategory",
            "description": "<p>Product subcategory (based in our <a href=\"#api-Categories-GetCategories\">subcategories</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.manufacturer",
            "description": "<p>Product manufacturer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.value",
            "description": "<p>Product value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ticket",
            "description": "<p>Claim ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quote",
            "description": "<p>Policy quote</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Policy creation date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Metadata</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"startDate\": 1463108400000,\n  \"endDate\": 1463194800000,\n  \"currency\": \"usd\",\n  \"customer\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"renter\": \"cus_eN7LTGZnFboRULALItgd1qBk\",\n  \"product\": {\n    \"name\": \"iPhone 7\",\n    \"category\": \"Electronics\",\n    \"subcategory\": \"Cell Phones & Accessories\",\n    \"manufacturer\": \"Apple\",\n    \"value\": 64900\n  },\n  \"description\": \"Policy for iPhone 7\",\n  \"id\": \"pol_Re2UTmiZNd6hvn3eklRNOWET\",\n  \"ticket\": \"ticket_xB5CE0Xj\",\n  \"quote\": 200,\n  \"createdAt\": 1473458389559\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Token invalid or expired\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/policies.js",
    "groupTitle": "Policy"
  },
  {
    "type": "post",
    "url": "/policies/quote",
    "title": "1. Generate policy quote",
    "version": "0.1.0",
    "name": "QuotePolicy",
    "group": "Policy",
    "description": "<p>Generate a token used to create a policy</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/policies/quote \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d startDate=1474473004564 \\\n  -d endDate=1475473004564 \\\n  -d currency=usd \\\n  -d customer=\"cus_dD2r2Ib8kPMhg5C3YvlqRwb7\" \\\n  -d renter=\"cus_eN7LTGZnFboRULALItgd1qBk\" \\\n  -d \"product[name]=iPhone 7\" \\\n  -d \"product[category]=Electronics\" \\\n  -d \"product[subcategory]=Cell Phones %26 Accessories\" \\\n  -d \"product[manufacturer]=Apple\" \\\n  -d \"product[value]=64900\" \\\n  -d \"description=Policy for iPhone 7\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.policies.quote({\n  customer: 'cus_dD2r2Ib8kPMhg5C3YvlqRwb7',\n  renter: 'cus_eN7LTGZnFboRULALItgd1qBk',\n  currency: 'usd',\n  startDate: 1474473004564,\n  endDate: 1475473004564,\n  product: {\n    name: 'iPhone 7',\n    category: 'Electronics',\n    subcategory: 'Cell Phones & Accessories',\n    manufacturer: 'Apple',\n    value: 64900\n  },\n  description: 'Policy for iPhone 7',\n  metadata: {}\n}).then(function(quote) {\n  console.log(quote);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\npolicy = sharetempus.policies.quote({\n  customer: \"cus_dD2r2Ib8kPMhg5C3YvlqRwb7\",\n  renter: \"cus_eN7LTGZnFboRULALItgd1qBk\",\n  currency: \"usd\",\n  startDate: 1474473004564,\n  endDate: 1475473004564,\n  product: {\n    name: \"iPhone 7\",\n    category: \"Electronics\",\n    subcategory: \"Cell Phones & Accessories\",\n    manufacturer: \"Apple\",\n    value: 64900\n  },\n  description: \"Policy for iPhone 7\",\n  metadata: {}\n});\nprint(policy);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date of policy active period</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "endDate",
            "description": "<p>End date of policy active period</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "renter",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Product data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product.name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product.category",
            "description": "<p>Product category (based in our <a href=\"#api-Categories-GetCategories\">categories</a>)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product.subcategory",
            "description": "<p>Product subcategory (based in our <a href=\"#api-Categories-GetCategories\">subcategories</a>)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product.manufacturer",
            "description": "<p>Product manufacturer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product.value",
            "description": "<p>Product value</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) Description</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>(optional) Metadata</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token used to create the policy</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quote",
            "description": "<p>Policy quote</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  token: \"tok_Q1gBkjj8wdAkOg0pj8bf8uQO\",\n  quote: 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"bad_request_error\",\n    \"status\": 400,\n    \"message\": \"{\\\"product.name\\\":\\\"Name is required\\\",\\\"customer\\\":\\\"Customer is required\\\"}\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/policies.js",
    "groupTitle": "Policy"
  },
  {
    "type": "get",
    "url": "/policies/:policy",
    "title": "4. Retrieve policy",
    "version": "0.1.0",
    "name": "RetrievePolicy",
    "group": "Policy",
    "description": "<p>Retrieve a created policy</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/policies/pol_Re2UTmiZNd6hvn3eklRNOWET \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth:",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.policies.retrieve({\n  policy: 'pol_Re2UTmiZNd6hvn3eklRNOWET'\n}).then(function(policy) {\n  console.log(policy);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\npolicy = sharetempus.policies.retrieve({\n  policy: \"pol_Re2UTmiZNd6hvn3eklRNOWET\"\n});\nprint(policy);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "policy",
            "description": "<p>Policy id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date of policy active period</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "endDate",
            "description": "<p>End date of policy active period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "renter",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Product data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.category",
            "description": "<p>Product category (based in our <a href=\"#api-Categories-GetCategories\">categories</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.subcategory",
            "description": "<p>Product subcategory (based in our <a href=\"#api-Categories-GetCategories\">subcategories</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.manufacturer",
            "description": "<p>Product manufacturer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.value",
            "description": "<p>Product value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ticket",
            "description": "<p>Claim ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quote",
            "description": "<p>Policy quote</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Policy creation date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Metadata</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"startDate\": 1463108400000,\n  \"endDate\": 1463194800000,\n  \"currency\": \"usd\",\n  \"customer\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"renter\": \"cus_eN7LTGZnFboRULALItgd1qBk\",\n  \"product\": {\n    \"name\": \"iPhone 7\",\n    \"category\": \"Electronics\",\n    \"subcategory\": \"Cell Phones & Accessories\",\n    \"manufacturer\": \"Apple\",\n    \"value\": 64900\n  },\n  \"description\": \"Policy for iPhone 7\",\n  \"id\": \"pol_Re2UTmiZNd6hvn3eklRNOWET\",\n  \"ticket\": \"ticket_xB5CE0Xj\",\n  \"quote\": 200,\n  \"createdAt\": 1473458389559\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"invalid_request_error\",\n    \"status\": 402,\n    \"message\": \"Policy pol_Re2UTmiZNd6hvn3eklRNOWET not found\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/policies.js",
    "groupTitle": "Policy"
  },
  {
    "type": "post",
    "url": "/policies/update",
    "title": "3. Update a policy",
    "version": "0.1.0",
    "name": "UpdatePolicy",
    "group": "Policy",
    "description": "<p>Update a created policy. This method allows only update description and medatada properties.</p>",
    "examples": [
      {
        "title": "curl",
        "content": "curl https://api.sharetempus.com/v1/policies/update \\\n  -u sk_test_BWLY8F59QFqgrhfaH8qbXDth: \\\n  -d id=\"pol_Re2UTmiZNd6hvn3eklRNOWET\" \\\n  -d description=\"New description for Policy for iPhone 7\"",
        "type": "curl"
      },
      {
        "title": "node",
        "content": "var ShareTempus = require('sharetempus')('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\nShareTempus.policies.update({\n  id: \"pol_Re2UTmiZNd6hvn3eklRNOWET\",\n  description: \"New description for Policy for iPhone 7\"\n}).then(function(policy) {\n  console.log(policy);\n}).catch(function(error) {\n  console.log(error);\n});",
        "type": "node"
      },
      {
        "title": "python",
        "content": "from sharetempus import ShareTempus;\nsharetempus = ShareTempus('sk_test_BWLY8F59QFqgrhfaH8qbXDth');\n\npolicy = sharetempus.policies.update({\n  id: \"pol_Re2UTmiZNd6hvn3eklRNOWET\",\n  description: \"New description for Policy for iPhone 7\"\n});\nprint(policy);",
        "type": "python"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic Access Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>(optional) Description</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>(optional) Metadata</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date of policy active period</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "endDate",
            "description": "<p>End date of policy active period</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Currency type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "customer",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "renter",
            "description": "<p>Customer id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>Product data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.name",
            "description": "<p>Product name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.category",
            "description": "<p>Product category (based in our <a href=\"#api-Categories-GetCategories\">categories</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.subcategory",
            "description": "<p>Product subcategory (based in our <a href=\"#api-Categories-GetCategories\">subcategories</a>)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.manufacturer",
            "description": "<p>Product manufacturer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "product.value",
            "description": "<p>Product value</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Policy id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ticket",
            "description": "<p>Claim ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quote",
            "description": "<p>Policy quote</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Policy creation date</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Metadata</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n  \"startDate\": 1463108400000,\n  \"endDate\": 1463194800000,\n  \"currency\": \"usd\",\n  \"customer\": \"cus_oC3ImnDw1Iqw1b3sx5CITtbc\",\n  \"renter\": \"cus_eN7LTGZnFboRULALItgd1qBk\",\n  \"product\": {\n    \"name\": \"iPhone 7\",\n    \"category\": \"Electronics\",\n    \"subcategory\": \"Cell Phones & Accessories\",\n    \"manufacturer\": \"Apple\",\n    \"value\": 64900\n  },\n  \"description\": \"New description for Policy for iPhone 7\",\n  \"id\": \"pol_Re2UTmiZNd6hvn3eklRNOWET\",\n  \"ticket\": \"ticket_xB5CE0Xj\",\n  \"quote\": 200,\n  \"createdAt\": 1473458389559\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400/bad_request_error",
            "description": "<p>The request was unacceptable, often due to a invalid or missing parameter.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401/unauthorized_error",
            "description": "<p>No valid API key provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "402/invalid_request_error",
            "description": "<p>The parameters were valid but the request failed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500/api_error",
            "description": "<p>Something went wrong on api</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "{\n  \"error\": {\n    \"type\": \"bad_request_error\",\n    \"status\": 400,\n    \"message\": \"{\\\"currency\\\":\\\"currency is not allowed by the schema\\\"}\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/policies.js",
    "groupTitle": "Policy"
  }
] });
