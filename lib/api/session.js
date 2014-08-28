  var
    Api = require('./client');

  module.exports = {
    create: create
  };

  function create(userCredentials) {
    var
      api = new Api(),
      credentials;

    credentials = {
      email: userCredentials.email,
      password: userCredentials.password
    };

    return api.post(api.hosts.v1a + '/login', credentials);
  }