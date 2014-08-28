var
  express = require('express'),
  router = express.Router(),
  checkToken = require('../../helpers/apitoken_helper').check,
  addUser = require('../../helpers/user_helper').addUser;

router.get('/', checkToken, addUser, getIndex);

module.exports = router;

function getIndex(req, res) {
  var
    localData;

  localData = {
    user: JSON.stringify(req.user)
  };

  res.render('my_procur/index', localData);
}
