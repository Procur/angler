module.exports = {
  dev: {
    options: {
      reporter: 'dot'
    },
    src: [
      './spec/config/mocha_test.conf.js',
      './spec/node/**/*.spec.js'
    ]
  }
};