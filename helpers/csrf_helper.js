module.exports = csrfHelper;

function csrfHelper(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
}