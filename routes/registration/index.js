var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  Api = require('../../lib/api'),
  Promise = require('bluebird');

router.get('/', function signup(req, res) {
  res.redirect('/registration/signup');
});

router.get('/signup', function signup(req, res) {
  res.render('registration/signup');
});

router.post('/signup', formHelper, function doSignup(req, res) {
  var
    api = new Api(),
    user = req.formData;

  confirmPasswords()
    .then(signUpUser)
    .then(loginUser)
    .then(sendResponse)
    .catch(api.err(res));

  function confirmPasswords() {
    return new Promise(defer);

    function defer(resolve, reject) {
      if (user.password !== user.passwordConfirmation) {
        reject({ error: 'Passwords are not the same.' });
      }
      else {
        resolve();
      }
    }
  }

  function signUpUser() {
    return api.post(api.hosts.v1a + '/signup', user);
  }

  function loginUser() {
    var
      credentials;

    credentials = {
      email: user.email,
      password: user.password
    };

    return api.post(api.hosts.v1a + '/login', credentials);
  }

  function sendResponse(user) {
    res.render('registration/wizard', { localData: '{ "user": ' + user + '}'});
  }
});

router.get('/wizard', function wizard(req, res) {
  res.render('registration/wizard', { localData: null });
});

module.exports = router;