describe('pcValidator directive:', function() {

  var
    scope,
    rootScope,
    formElement,
    inputElement,
    VALIDATION_EVENT,
    VALIDATION_MESSAGE,
    VALIDATION_ERROR;

  beforeEach(module('pc.Validation'));


  beforeEach(inject(function($rootScope, $compile, $injector) {
    VALIDATION_EVENT = $injector.get('VALIDATION_EVENT');
    VALIDATION_MESSAGE = $injector.get('VALIDATION_MESSAGE');
    VALIDATION_ERROR = $injector.get('VALIDATION_ERROR');

    scope = $rootScope.$new();
    rootScope = $rootScope;

    formElement = angular.element('<form name="myForm"><input type="text" name="foobar" ng-model="foobar" pc-validator="required" /></form>');

    $compile(formElement)(scope);

    scope.$digest();

    inputElement = formElement.children();
  }));

  it('should exist', function() {
    expect(formElement).to.not.be.undefined;
    expect(inputElement).to.not.be.undefined;
  });

  describe('setting validity', function() {
    it('should set the validity to false if the field is invalid', function() {
      inputElement.triggerHandler('blur');

      expect(scope.myForm.foobar.$invalid).to.be.true;
      expect(scope.myForm.foobar.$error[VALIDATION_ERROR['REQUIRED']]).to.be.true;
    });

    it('should set the validity to true if the field is valid', function() {
      scope.foobar = 'blah';
      scope.$digest();
      inputElement.triggerHandler('keyup');

      expect(scope.myForm.foobar.$valid).to.be.true;
      expect(scope.myForm.foobar.$error[VALIDATION_ERROR['REQUIRED']]).to.be.false;
    });
  });

  describe('field decoration', function(){
    it('should set an error element after the input field if the field is invalid', function() {
      inputElement.triggerHandler('blur');

      expect(inputElement.next().text()).to.equal(VALIDATION_MESSAGE['REQUIRED']);
    });

    it('should clear the error element after the input field if the field is valid', function() {
      inputElement.triggerHandler('blur');

      expect(inputElement.next().text()).to.equal(VALIDATION_MESSAGE['REQUIRED']);

      scope.foobar = 'blah';
      scope.$digest();

      inputElement.triggerHandler('blur');

      expect(inputElement.next().length).to.equal(0);
    });
  });

  describe('trigger events', function() {
    it('should validate on the VALIDATION_EVENT.VALIDATE event', function() {
      rootScope.$broadcast(VALIDATION_EVENT.VALIDATE);

      expect(scope.myForm.foobar.$invalid).to.be.true;
      expect(scope.myForm.foobar.$error[VALIDATION_ERROR['REQUIRED']]).to.be.true;
      expect(inputElement.next().text()).to.equal(VALIDATION_MESSAGE['REQUIRED']);
    });
  });

});