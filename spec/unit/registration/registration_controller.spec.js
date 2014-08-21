describe('registrationController', function() {
  var
    controller,
    scope,
    mockProgress;

  beforeEach(module('pc.Registration'));

  beforeEach(inject(function($rootScope, $controller) {
    var
      dependencies;

    scope = $rootScope.$new();

    mockProgress = {
      foo: 'bar'
    };

    dependencies = {
      '$scope': scope,
      'progressService': mockProgress,
    };

    controller = $controller('registrationController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the wizard', function() {
      expect(scope.wizard.leadText).to.equal('Welcome to Procur.');
      expect(scope.wizard.progressBar).to.equal(mockProgress);
    });
  });
});



