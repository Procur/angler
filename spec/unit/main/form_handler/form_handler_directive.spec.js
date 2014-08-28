describe('pcFormHandler directive:', function() {

  var
    scope,
    element,
    VALIDATION_EVENT,
    mockSubmitEvent;

  beforeEach(module('pc.FormHandler'));

  beforeEach(inject(function($rootScope, $compile, $injector) {
    VALIDATION_EVENT = $injector.get('VALIDATION_EVENT');

    scope = $rootScope.$new();
    scope.$broadcast = sinon.spy();

    mockSubmitEvent = $.Event('submit');
    mockSubmitEvent.preventDefault = sinon.spy();

    element = angular.element('<form name="myForm" pc-form-handler><input type="text" name="foobar" ng-model="foobar"/></form>');

    $compile(element)(scope);

    scope.$digest();
  }));

  it('should exist', function() {
    expect(element).to.not.be.undefined;
  });

  describe('handleSubmit()', function() {
    it('should broadcast the VALIDATION_EVENT.VALIDATE event', function() {
      element.triggerHandler('submit');

      expect(scope.$broadcast).to.have.been.calledWith(VALIDATION_EVENT.VALIDATE);
    });

    it('should prevent the submission if the form is invalid', function() {
      scope.myForm.$invalid = true;
      element.triggerHandler(mockSubmitEvent);

      expect(mockSubmitEvent.preventDefault).to.have.been.called;
    });
  });

});