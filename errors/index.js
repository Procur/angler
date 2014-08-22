module.exports = function errorHandler(app) {
  app.use(require('./404'));
  app.use(require('./500'));
};

