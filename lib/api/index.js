var
  Promise = require('bluebird'),
  request = require('request'),
  _ = require('lodash-node');

module.exports = Api;

function Api(config) {
  config = config || {};

  this.apitoken = config.apitoken;
}

Api.prototype.methods = {
  post: 'POST',
  POST: 'POST',
  get: 'GET',
  GET: 'GET',
  put: 'PUT',
  PUT: 'PUT',
  DEL: 'DELETE',
  del: 'DELETE'
};

Api.prototype.hosts = {
  v1a: 'http://procur-api-staging.herokuapp.com'
};

Api.prototype.post = post;
Api.prototype.put = put;
Api.prototype.get = get;
Api.prototype.del = del;
Api.prototype.req = doRequest;
Api.prototype.err = handleError;

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
    reqOptions.headers = { apitoken: apitoken };

    if (!_.isNull(data) && !_.isUndefined(data)) {
      reqOptions.body = JSON.stringify(data);
    }

    request(reqOptions, onRequestComplete);

    function onRequestComplete(err, res, body) {
      if (!err && (res.statusCode === 200 || res.statusCode === 201)) {
        resolve(body);
      }
      else {
        reject(err || body);
      }
    }
  }
}

function handleError(res) {
  return sendErrorResponse;

  function sendErrorResponse(err) {
    res.send(500, err);
  }
}


