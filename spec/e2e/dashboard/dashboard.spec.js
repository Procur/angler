describe('/dashboard', function() {

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