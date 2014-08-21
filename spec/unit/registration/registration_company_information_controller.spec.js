describe('registrationCompanyInformationController', function() {
  var
    controller,
    scope,
    mockState,
    mockAjax,
    mockPromise,
    companyService,
    FILE_EVENTS;

  beforeEach(module('pc.Registration'));

  beforeEach(inject(function($rootScope, $controller, $injector) {
    var
      dependencies,
      window = $injector.get('$window');

    window.pc = {
      localData: {
        company: {
          supplier: true
        }
      }
    };

    scope = $rootScope.$new();
    scope.wizard = {
      progressBar: {
        update: sinon.spy()
      }
    };
    scope.$on = sinon.spy();
    scope.companyInformationForm = {
      $valid: false
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
      post: sinon.stub(),
      handleError: sinon.spy()
    };

    mockAjax.post.returns(mockPromise);

    companyService = $injector.get('companyService');
    companyService.setAll = sinon.spy();

    FILE_EVENTS = $injector.get('FILE_EVENTS');

    dependencies = {
      '$scope': scope,
      '$state': mockState,
      'ajaxService': mockAjax,
      'companyService': companyService,
      'FILE_EVENTS': FILE_EVENTS
    };

    controller = $controller('registrationCompanyInformationController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the wizard', function() {
      expect(scope.wizard.leadText).to.equal(mockState.current.data.leadText);
      expect(scope.wizard.progressBar.update).to.have.been.calledWith(mockState.current.data.progressStep);
    });

    it('should set the company information', function() {
      expect(scope.companyInformation).to.not.be.undefined;
    });

    it('should set the isSupplier value', function() {
      expect(scope.isSupplier).to.be.true;
    });

    it('should register a FILE_EVENTS.SELECTED listener', function() {
      expect(scope.$on).to.have.been.calledWith(FILE_EVENTS.SELECTED);
    });

    describe('submitCompanyInformation()', function() {
      beforeEach(function() {
        scope.companyInformationForm.$valid = true;
        scope.agreeTerms = true;
        scope.agreeAuthorized = true;
      });

      it('should not submit the company information if the form is invalid', function() {
        scope.companyInformationForm.$valid = false;
        scope.submitCompanyInformation();
        expect(mockAjax.post).to.not.have.been.called;
      });

      it('should submit the company information is the form is valid', function() {
        scope.submitCompanyInformation();

        expect(mockAjax.post).to.have.been.called;
        expect(mockAjax.post.getCall(0).args[1]).to.equal(scope.companyInformation);
      });

      it('should setAll data on the company on successful post', function() {
        scope.submitCompanyInformation();

        expect(companyService.setAll).to.have.been.called;
      });

      it('should go to the email verification state on success', function() {
        scope.submitCompanyInformation();

        expect(mockState.go).to.have.been.calledWith('registration.email_verification');
      });
    });
  });
});



