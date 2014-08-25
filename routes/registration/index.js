var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  request = require('request');

router.get('/signup', function signup(req, res) {
  res.render('registration/signup');
});

router.post('/signup', formHelper, function doSignup(req, res) {
  // need to verify passwords are the same
  request({
    url: 'https://procur.fwd.wf/signup',
    body: JSON.stringify(req.formData),
    method: 'POST'
  }, function(err, response, body) {
    if (err || (response.statusCode !== 200 && response.statusCode !== 201)) { res.send(JSON.parse(body)); }
    else {
      request({
        method: 'POST',
        url: 'https://procur.fwd.wf/login',
        body: JSON.stringify({
          email: req.formData.email,
          password: req.formData.password
        })
      }, function(err, response, body) {
        if (err || (response.statusCode !== 200 && response.statusCode !== 201)) { res.send(JSON.parse(body)); }
        else {
          var
            locals = {};

          locals.localData = JSON.stringify({ user: JSON.parse(body)} );

          res.render('registration/wizard', locals);
        }
      });
    }
  });
});

router.get('/wizard', function wizard(req, res) {
  res.render('registration/wizard', { localData: null });
});

module.exports = router;