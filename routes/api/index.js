var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  Api = require('../../lib/api');

router.put('/*', formHelper, putApiWrapper);
router.post('/*', formHelper, postApiWrapper);
router.get('/*', getApiWrapper);
router.delete('/*', deleteApiWrapper);

module.exports = router;

function putApiWrapper(req, res) {
  var
    api = new Api({ apitoken: req.get('apitoken') }),
    path = req.originalUrl.replace('/api', '');

  api.put(api.hosts.v1a + path, req.formData)
    .then(handleResponse(res, 201))
    .catch(api.err(res));
}

function postApiWrapper(req, res) {
  var
    api = new Api({ apitoken: req.get('apitoken') }),
    path = req.originalUrl.replace('/api', '');

  api.post(api.hosts.v1a + path, req.formData)
    .then(handleResponse(res))
    .catch(api.err(res));
}

function getApiWrapper(req, res) {
  var
    api = new Api({ apitoken: req.get('apitoken') }),
    path = req.originalUrl.replace('/api', '');

  api.get(api.hosts.v1a + path)
    .then(handleResponse(res))
    .catch(api.err(res));
}

function deleteApiWrapper(req, res) {
  var
    api = new Api({ apitoken: req.get('apitoken') }),
    path = req.originalUrl.replace('/api', '');

  api.del(api.hosts.v1a + path)
    .then(handleResponse(res))
    .catch(api.err(res));
}

function handleResponse(res, status) {
  return sendSuccessResponse;

  function sendSuccessResponse(data) {
    res.send(status || 200, data);
  }
}
