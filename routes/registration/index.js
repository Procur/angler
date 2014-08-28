var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  Promise = require('bluebird'),
  User = require('../../lib/api').User,
  Session = require('../../lib/api').Session,
  Api = require('../../lib/api').Client,
  checkToken = require('../../helpers/apitoken_helper').check;

router.get('/', getIndex);
router.get('/signup', getSignup);
router.post('/signup', formHelper, postSignup);
router.get('/wizard', checkToken, getWizard);

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
    .then(Session.create)
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