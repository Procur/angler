var
  express = require('express'),
  router = express.Router(),
  env = process.env.NODE_ENV || 'production';

router.get('/', function(req, res) {
  var
    locals = {};

  if (env !== 'production') {
    locals.localData = JSON.stringify(require('../../spec/support/test_data'));
  }

  res.render('my_procur/index', locals);
});

module.exports = router;
