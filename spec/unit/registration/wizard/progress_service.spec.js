describe('progressService', function() {

  var
    progressBar;

  beforeEach(module('pc.Registration'));

  beforeEach(inject(function($injector) {
    progressBar = $injector.get('progressService');
  }));

  it('should exist', function() {
    expect(progressBar).to.not.be.undefined;
  });

  it('should be an array of status items', function() {
    expect(angular.isArray(progressBar)).to.be.true;
    expect(progressBar[0].label).to.not.be.undefined;
    expect(progressBar[0].status).to.not.be.undefined;
  });

  it('should set the status to -1 by default', function() {
    expect(progressBar[0].status).to.equal(-1);
  });

  describe('update()', function() {
    it('should update the status to 0 when the step is equal to the index of the status item', function() {
      expect(progressBar[0].status).to.equal(-1);

      progressBar.update(0);

      expect(progressBar[0].status).to.equal(0);
    });

    it('should update the status to 1 when the step is greater than the index of the status item', function() {
      expect(progressBar[0].status).to.equal(-1);
      expect(progressBar[1].status).to.equal(-1);

      progressBar.update(1);

      expect(progressBar[0].status).to.equal(1);
      expect(progressBar[1].status).to.equal(0);
    });
  });
});