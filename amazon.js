var path = require('path');
var request = require('request');
var HmacSHA256 = require('crypto-js/hmac-sha256');
var base64 = require('crypto-js/enc-base64');

var initializeAmazon = function (initOptions) {
  return function (options) {
    var method = options.method || 'GET';
    var url = 'https://';
    url += options.base || 'mws.amazonservices.com';
    url += options.endpoint;

    options.params.AWSAccessKeyId = options.params.AWSAccessKeyId || initOptions.AWSAccessKeyId;
    options.params.SignatureMethod = 'HmacSHA256';
    options.params.SignatureVersion = '2';
    options.params.Timestamp = new Date().toISOString();


    var paramsArr = [];
    for (param in options.params) {
      paramsArr.push([param, options.params[param]]);
    }
    paramsArr.sort(function (a, b) {
      return a[0] > b[0] ? 1 : -1;
    });

    var keys = [];
    var vals = [];
    paramsArr.forEach(function (tuple) {
      keys.push(encodeURIComponent(tuple[0]));
      vals.push(encodeURIComponent(tuple[1]));
    });

    var paramsString = '';
    keys.forEach(function (key, index) {
      paramsString += key + '=' + vals[index];
      if (index !== keys.length - 1) {
        paramsString += '&';
      }
    });


    var query = [method, options.base, options.endpoint, paramsString];
    var queryString = query.join('\n');


    var hmac = HmacSHA256(queryString, initOptions.AmzSecretKey);
    var signature = base64.stringify(hmac);

    paramsString += '&Signature=' + encodeURIComponent(signature);

    url += '?' + paramsString;

    request[method.toLowerCase()](url, function (error, response, body) {
      options.callback && options.callback(error, response, body);
    });
  }
};

module.exports = initializeAmazon;
