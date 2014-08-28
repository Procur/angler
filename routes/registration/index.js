var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  User = require('../../lib/api/user'),
  session = require('../../lib/api').Session,
  Promise = require('bluebird'),
  Api = require('../../lib/api').Client;

router.get('/', getIndex);
router.get('/signup', getSignup);
router.post('/signup', formHelper, postSignup);
router.get('/wizard', getWizard);

module.exports = router;

function getIndex(req, res) {
  res.redirect('/registration/signup');
}

function getSignup(req, res) {
  res.render('registration/signup', { error: null });
}

function postSignup(req, res) {
  User.create(req.formData)
    .then(getUserCredentials)
    .then(session.create)
    .then(sendResponse)
    .catch(Api.err(res));

  function getUserCredentials(user) {
    return {
      email: user.email,
      password: req.formData.password
    };
  }

  function sendResponse(user) {
    if (!user.apiToken) {
      return Promise.reject('There was a problem logging in. Please try again.');
    }
    else {
      res.send(200, {
        apitoken: user.apiToken,
        redirect: '/registration/wizard/'
      });
    }
  }
}

function getWizard(req, res) {
  res.render('registration/wizard', { localData: null });
}