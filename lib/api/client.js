var
  Promise = require('bluebird'),
  request = require('request'),
  _ = require('lodash-node');

module.exports = ApiClient;

function ApiClient(config) {
  config = config || {};

  this.apitoken = config.apitoken;
}

ApiClient.prototype.methods = {
  post: 'POST',
  POST: 'POST',
  get: 'GET',
  GET: 'GET',
  put: 'PUT',
  PUT: 'PUT',
  DEL: 'DELETE',
  del: 'DELETE'
};

ApiClient.prototype.hosts = {
  v1a: 'http://procur-api-staging.herokuapp.com'
};

ApiClient.prototype.post = post;
ApiClient.prototype.put = put;
ApiClient.prototype.get = get;
ApiClient.prototype.del = del;
ApiClient.prototype.req = doRequest;
ApiClient.err = handleError;
ApiClient.tryJsonParse = tryJsonParse;

function post(url, body) {
  return this.req(this.methods.post, url, body);
}

function put(url, body) {
  return this.req(this.methods.put, url, body);
}

function get(url) {
  return this.req(this.methods.get, url);
}

function del(url) {
  return this.req(this.methods.del, url);
}

function doRequest(method, url, data) {
  var
    apitoken = this.apitoken;

  method = this.methods[method] || 'GET';

  return new Promise(defer);

  function defer(resolve, reject) {
    var
      reqOptions = {};

    reqOptions.method = method;
    reqOptions.url = url || '';
    reqOptions.headers = {
      'Content-Type': 'application/json',
      apitoken: apitoken
    };

    if (!_.isNull(data) && !_.isUndefined(data)) {
      reqOptions.body = JSON.stringify(data);
    }

    request(reqOptions, onRequestComplete);

    function onRequestComplete(err, res, body) {
      if (!err && (res.statusCode === 200 || res.statusCode === 201)) {
        resolve(tryJsonParse(body) || body);
      }
      else {
        reject(err || tryJsonParse(body) || body);
      }
    }
  }
}

function handleError(res) {
  return sendErrorResponse;

  function sendErrorResponse(err) {
    err = err || 'There was an error processing your request. Please try again';
    err = err.message || err;

    res.header('Content-Type', 'application/json');
    res.send(500, err);
  }
}

function tryJsonParse(json) {
  try {
    return JSON.parse(json);
  }
  catch (e) {
    return false;
  }
}


