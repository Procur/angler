var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  Api = require('../../lib/api').Client,
  Session = require('../../lib/api').Session,
  Promise = require('bluebird');

router.get('/login', getLogin);
router.post('/login', formHelper, postLogin);

module.exports = router;

function getLogin(req, res) {
  res.render('auth/login', { error: null });
}

function postLogin(req, res) {
  Session.create(req.formData)
    .then(sendResponse)
    .catch(Api.err(res));

  function sendResponse(user) {
    if (!user.apiToken) {
      return Promise.reject('There was a problem logging in. Please try again.');
    }
    else {
      res.send(200, {
        apitoken: user.apiToken,
        redirect: '/my_procur/'
      });
    }
  }

}