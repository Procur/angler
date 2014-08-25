var
  express = require('express'),
  router = express.Router();

router.get('/login', function login(req, res) {
  res.render('auth/login');
});

module.exports = router;