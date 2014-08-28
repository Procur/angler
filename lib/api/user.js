  var
    Api = require('./client'),
    Promise = require('bluebird');

module.exports = User;

function User(config) {
  config = config || {};

  this.api = new Api({ apitoken: config.apitoken });
}

User.create = create;

User.prototype.show = show;

function create(userData) {
  var
    api = new Api(),
    user;

  user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    passwordConfirmation: userData.passwordConfirmation
  };

  return confirmPasswords()
    .then(signUpUser);

  function confirmPasswords() {
    return new Promise(defer);

    function defer(resolve, reject) {
      if (user.password !== user.passwordConfirmation) {
        reject('Passwords are not the same. Please try again.');
      }
      else {
        resolve();
      }
    }
  }

  function signUpUser() {
    return api.post(Api.hosts.v1a + '/signup', user);
  }
}

function show() {
  return this.api.get(Api.hosts.v1a + '/users');
}