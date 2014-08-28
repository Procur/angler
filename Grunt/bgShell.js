module.exports = {
  server: {
    cmd: 'nodemon app'
  },
  passenger: {
    cmd: 'passenger start'
  },
  protractor: {
    cmd: 'protractor spec/config/protractor.conf.js'
  }
};