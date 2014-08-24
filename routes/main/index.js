var
  express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('main/index', { title: 'B2B Wholesale Marketplace & Platform | Procur' });
});

module.exports = router;
