module.exports = function(env) {
  return handle500;

  function handle500(err, req, res, next) {
    res.status(err.status || 500);

    // no stacktraces leaked to user in production
    res.render('error', {
      message: err.message,
      error: (env === 'production') ? {} : err
    });
  }
};


