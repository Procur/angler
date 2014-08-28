module.exports = {
  get: get,
  check: check
};

function get(req, res, next) {
  req.apitoken = req.cookies['pc.token'];
  next();
}

function check(req, res, next) {
  if (req.apitoken) { next(); }
  else { res.redirect('/'); }
}

