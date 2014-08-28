var
  User = require('../lib/api').User;

module.exports = {
  addUser: addUser
};

function addUser(req, res, next) {
  var user = new User({ apitoken: req.apitoken });

  user.show()
    .then(addUserToRequest)
    .then(next)
    .catch(redirectToLogin);

  function addUserToRequest(user) {
    req.user = user;
  }

  function redirectToLogin(err) {
    res.redirect('/auth/login');
  }
}