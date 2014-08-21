describe('pcValidator Directive', function() {

  var
  scope,
  compile,
  navElement,
  emailErrorHtml,
  goodEmailElement,
  badEmailElement,
  goodForm,
  badForm;

  beforeEach(module('pc.Validation'));

  emailErrorHtml = '<p class="error">Enter a Valid Email.</p>';


  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    goodEmailElement = angular.element("<input type='email' name='email' pc-validator='email' ng-model='email' value='blah@gmail.com'/>");
    badEmailElement = angular.element("<input type='email' name='email' pc-validator='email' ng-model='email' value='blah'/>");
    scope.model = { email: null }
    $compile(badEmailElement)(scope);
    goodForm = scope.goodForm;
    badForm = scope.email;
    
  }));

  //email errors
  
/**
  it('No error message when there is a valid email ', function() {
    goodEmailElement.trigger("blur");
    scope.$digest();
    expect(goodEmailElement.next().html()).to.not.equal(emailErrorHtml);
  });*/

  it('Error message when there is an invalid email ', function() {
    expect()
    console.log(badEmailElement);
    badEmailElement.$setViewValue("blah");
    scope.$digest();
    console.log(badEmailElement);
    expect(badEmailElement.next().html()).to.equal(emailErrorHtml);
  });

  

});