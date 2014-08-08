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
  }
};