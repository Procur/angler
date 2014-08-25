var
  express = require('express'),
  router = express.Router(),
  procurApi = 'https://procur.fwd.wf',
  formHelper = require('../../helpers/form_helper'),
  request = require('request');

router.put('/*', formHelper, function api(req, res) {
  request({
    url: procurApi + req.originalUrl.replace('/api', ''),
    method: 'PUT',
    headers: {
      'apitoken': req.get('apitoken')
    },
    body: JSON.stringify(req.formData)
  }, function(err, response, body) {
    if (err || (response.statusCode !== 200 && response.statusCode !== 201)) { res.send(JSON.parse(body)); }
    else {
      res.send(JSON.parse(body));
    }
  });
});

module.exports = router;
