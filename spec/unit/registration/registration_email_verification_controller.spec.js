describe('registrationEmailVerificationController', function() {
  var
    controller,
    scope,
    mockState,
    mockPromise,
    mockAjax,
    userService,
    snackbar;

  beforeEach(module('pc.Registration'));

  beforeEach(inject(function($rootScope, $controller, $injector) {
    var
      dependencies,
      window = $injector.get('$window');

    window.pc = {
      localData: {
        user: {
          emailVerified: false
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
      post: sinon.stub(),
      handleError: sinon.spy()
    };

    mockAjax.post.returns(mockPromise);

    userService = $injector.get('userService');
    userService.setAll = sinon.spy();

    snackbar = $injector.get('snackbarService');
    snackbar.success = sinon.spy();
    snackbar.error = sinon.spy();

    dependencies = {
      '$scope': scope,
      '$state': mockState,
      'ajaxService': mockAjax,
      'userService': userService,
      'snackbarService': snackbar
    };

    controller = $controller('registrationEmailVerificationController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the wizard', function() {
      expect(scope.wizard.leadText).to.equal(mockState.current.data.leadText);
      expect(scope.wizard.progressBar.update).to.have.been.calledWith(mockState.current.data.progressStep);
    });

    describe('resendEmailVerification()', function() {
      it('should set resendEmailVerification function', function() {
        expect(typeof scope.resendEmailVerification).to.equal('function');
      });

      it('should send a post request to resend the email verification', function() {
        scope.resendEmailVerification();
        expect(mockAjax.post).to.have.been.called;
      });

      it('should show a success snackbar', function() {
        scope.resendEmailVerification();
        expect(snackbar.success).to.have.been.called;
      });
    });

    describe('alreadyVerified()', function() {
      it('should set alreadyVerified function', function() {
        expect(typeof scope.alreadyVerified).to.equal('function');
      });

      it('should show an error if the email is not already verified', function() {
        scope.alreadyVerified();
        expect(snackbar.error).to.have.been.called;
      });

      it('should go to the handle state if the email is already verified', function() {
        userService.set('emailVerified', true);
        scope.alreadyVerified();
        expect(mockState.go).to.have.been.calledWith('registration.handle');
      });
    });
  });
});



