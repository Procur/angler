module.exports = function routeHandler(app) {
  app.use('/', require('./main'));

  app.use('/registration', require('./registration'));
};

