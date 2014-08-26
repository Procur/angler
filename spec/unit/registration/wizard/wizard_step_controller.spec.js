describe('wizardStepController', function() {
  var
    controller,
    scope,
    mockState;

  beforeEach(module('pc.Wizard'));

  beforeEach(inject(function($rootScope, $controller) {
    var
      dependencies;

    scope = $rootScope.$new();
    scope.wizard = {
      progressBar: {
        update: sinon.spy()
      }
    };

    mockState = {
      current: {
        data: {
          leadText: 'foo'
        }
      }
    };

    dependencies = {
      '$scope': scope,
      '$state': mockState
    };

    controller = $controller('wizardStepController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the wizard', function() {
      expect(scope.wizard.leadText).to.equal(mockState.current.data.leadText);
      expect(scope.wizard.progressBar.update).to.have.been.calledWith(mockState.current.data.progressStep);
    });
  });
});