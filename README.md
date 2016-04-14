# amazon-mws
Tiny library for interacting with the Amazon MWS API

## Installation
`$ npm install amazon-mws-node`

## Usage
```sh
  var mws = require('amazon-mws-node')({
    AmzSecretKey: 'AMZ_SECRET_KEY',
    AWSAccessKeyId: 'AMZ_ACCESS_KEY_ID'
  });

  mws({
    method: 'GET',
    base: 'mws.amazonservices.com',
    endpoint: '/Orders/2013-09-01',
    params: {
      'Action': 'ListOrders',
      'CreatedAfter': '2014-01-01',
      'MarketplaceId.Id.1': 'MARKETPLACE_ID',
      'SellerId': 'SELLER_ID',
      'MWSAuthToken': 'MWS_AUTH_TOKEN',
      'Version': '2013-09-01'
    },
    callback: function (error, response, body) {
      console.log(body);
    }
  });
```

