  var
    Api = require('./client'),
    Promise = require('bluebird');

module.exports = User;

function User(config) {
  config = config || {};

  this.apitoken = config.apitoken;
}

User.create = create;

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
    return api.post(api.hosts.v1a + '/signup', user);
  }
}