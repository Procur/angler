var
  express = require('express'),
  router = express.Router();

router.get('/login', function login(req, res) {
  res.render('auth/login');
});

router.get('/signup', function signup(req, res) {
  res.render('auth/signup');
});

module.exports = router;