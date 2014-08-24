var
  express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('my_procur/index', {localData: null});
});

module.exports = router;