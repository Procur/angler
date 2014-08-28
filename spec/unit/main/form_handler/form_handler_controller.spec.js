describe('formHandlerController', function() {

  var
    controller,
    scope,
    windowSpy,
    mockAjax,
    mockPromise,
    mockSnackbar,
    mockResponse,
    VALIDATION_EVENT;

  beforeEach(module('pc.FormHandler'));

  beforeEach(inject(function($rootScope, $controller, $injector) {

    scope = $rootScope.$new();
    scope.$broadcast = sinon.spy();
    scope.form = {
      $valid: true
    };

    windowSpy = $injector.get('$window');
    windowSpy.location.assign = sinon.spy();

    mockAjax = {
      post: sinon.stub(),
      handleError: sinon.spy()
    };

    mockResponse = {
      message: 'Foobar',
      apiToken: '134',
      redirect: 'foo/bar'
    };

    mockPromise = {
      then: function(cb) {
        cb(mockResponse);
        return mockPromise;
      },
      catch: sinon.spy()
    };
    mockAjax.post.returns(mockPromise);

    mockSnackbar = {
      success: sinon.spy()
    };

    VALIDATION_EVENT = $injector.get('VALIDATION_EVENT');

    controller = $controller('formHandlerController', {
      '$scope': scope,
      '$window': windowSpy,
      'ajaxService': mockAjax,
      'snackbarService': mockSnackbar,
      'VALIDATION_EVENT': VALIDATION_EVENT
    });
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  it('should initialize the fields property', function() {
    expect(scope.fields).to.not.be.undefined;
  });

  describe('onSubmit()', function() {
    it('should broadcast the validation event', function() {
      scope.onSubmit('path');
      expect(scope.$broadcast).to.have.been.calledWith(VALIDATION_EVENT.VALIDATE);
    });

    it('should post the form when it is valid', function() {
      scope.onSubmit('path');
      expect(mockAjax.post).to.have.been.calledWith(null, 'path', scope.fields);
    });

    it('should handle the response and errors', function() {
      scope.onSubmit('path');
      expect(mockSnackbar.success).to.have.been.calledWith(mockResponse.message);
      expect(windowSpy.location.assign).to.have.been.calledWith(mockResponse.redirect);
    });

    it('should not post the form if the form is invalid', function() {
      scope.form.$valid = false;
      scope.onSubmit('path');
      expect(mockAjax.post).to.not.have.been.called;
    });
  });

});


