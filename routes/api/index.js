var
  express = require('express'),
  router = express.Router(),
  company = require('./company'),
  user = require('./user'),
  env = process.env.NODE_ENV || 'production';

router.post('/company', company.create);
router.put('/company', company.update);

router.get('/user/verify_email', user.verifyEmail);

module.exports = router;
