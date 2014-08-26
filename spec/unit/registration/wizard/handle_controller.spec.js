describe('companyHandleController', function() {
  var
    controller,
    scope,
    mockState,
    mockPromise,
    mockAjax,
    companyService;

  beforeEach(module('pc.Wizard'));

  beforeEach(inject(function($rootScope, $controller, $injector) {
    var
      dependencies,
      window = $injector.get('$window');

    window.pc = {
      localData: {
        company: {
          foo: 'bar'
        }
      }
    };

    scope = $rootScope.$new();
    scope.wizard = {
      progressBar: {
        update: sinon.spy()
      }
    };

    mockState = {
      current: {
        data: {
          leadText: 'foobar',
          progressStep: 1
        }
      },
      go: sinon.spy()
    };

    mockPromise = {
      then: function(cb) {
        cb();
        return mockPromise;
      },
      catch: sinon.spy()
    };

    mockAjax = {
      put: sinon.stub(),
      handleError: sinon.spy()
    };

    mockAjax.put.returns(mockPromise);

    companyService = $injector.get('companyService');
    companyService.setAll = sinon.spy();

    dependencies = {
      '$scope': scope,
      '$state': mockState,
      'ajaxService': mockAjax,
      'companyService': companyService
    };

    controller = $controller('companyHandleController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the wizard', function() {
      expect(scope.wizard.leadText).to.equal(mockState.current.data.leadText);
      expect(scope.wizard.progressBar.update).to.have.been.calledWith(mockState.current.data.progressStep);
    });

    describe('setHandle()', function() {
      it('should set setHandle() function', function() {
        expect(typeof scope.setHandle).to.equal('function');
      });

      it('should send a put with the companys handle', function() {
        scope.handle = 'foobar';
        scope.setHandle();

        expect(mockAjax.put.getCall(0).args[1].handle).to.equal(scope.handle);
      });

      it('should set the companys handle', function() {
        scope.setHandle();

        expect(companyService.setAll).to.have.been.called;
      });

      it('should go to the dashboard', function() {
        scope.setHandle();

        expect(mockState.go).to.have.been.calledWith('dashboard');
      });
    });
  });
});



