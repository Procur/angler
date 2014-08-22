var
  express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {localData: null});
});

module.exports = router;