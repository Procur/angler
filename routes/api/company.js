module.exports = {
  create: create,
  update: update
};

function create(req, res) {
  res.send(200, require('../../spec/support/test_data').company);
}

function update(req, res) {
  console.log(req.body);
  res.send(200, req.body);
}