module.exports = function routeHandler(app) {
  app.use('/', require('./main'));

  app.use('/my_procur', require('./my_procur'));

  app.use('/registration', require('./registration'));

  app.use('/api', require('./api'));
};

