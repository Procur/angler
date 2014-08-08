var
  baseUrl = 'http://localhost:8080/';

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: baseUrl,

  framework: 'mocha',

  specs: [
    '../e2e/**/*.spec.js'
  ],

  exlude: [],

  chromeOnly: false,

  // Capabilities to be passed to the webdriver instance.
  capabilities: { 'browserName': 'chrome' },

  /*
  multiCapabilities: [
    { 'browserName': 'chrome' },
    { 'browserName': 'safari' },
    { 'browserName': 'firefox' }
  ],
  */

  onPrepare: function(){
    global.isAngularSite = function(flag){
        browser.ignoreSynchronization = !flag;
    };

    global.baseUrl = function() {
      return baseUrl;
    };

    global.chai = require('chai');
    global.chaiAsPromised = require('chai-as-promised');
    global.chai.use(global.chaiAsPromised);
    global.expect = global.chai.expect;
  }
};