describe('/dashboard', function() {

  var
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect;

  chai.use(chaiAsPromised);
  expect = chai.expect;

  beforeEach(function() {
    isAngularSite(true);
  });

  beforeEach(function() {
    browser.get('views/');
  });

  it('should default to the /#/dashboard page', function() {
    expect(browser.getCurrentUrl()).to.eventually.contain('/#/dashboard');
  });


});