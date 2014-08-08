// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
        '../../assets/javascripts/components.js',

        '../../assets/components/angular-mocks/angular-mocks.js',

        '../../assets/javascripts/app.js',

        '../unit/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8081,

    preprocessors: {
      '../../assets/javascripts/app.js': ['coverage'],
    },

    // test results reporter to use
    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters: [
        {
          type : 'html',
          dir : '../reports/unit/coverage'
        },
        {
          type : 'cobertura',
          dir : '../reports/unit/coverage/covertura'
        },
      ]
    },

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};