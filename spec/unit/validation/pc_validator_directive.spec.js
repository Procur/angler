describe.only('pcValidator Directive', function() {

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
    goodEmailElement = angular.element(
      "<form name='goodForm'>"+
      "<input type='email' name='email' pc-validator='email' ng-model='email'/>"+
      "</form>");
    badEmailElement = angular.element(
      "<form name='badForm'>"+
      "<input type='email' name='email' pc-validator='email' ng-model='email'/>"+
      "</form>");
    $compile(badEmailElement)(scope);
    $compile(goodEmailElement)(scope);
    scope.$digest();
    goodForm = scope.goodForm;
    badForm = scope.badForm;
    
  }));

  //email errors
  
/**
  it('No error message when there is a valid email ', function() {
    goodEmailElement.trigger("blur");
    scope.$digest();
    expect(goodEmailElement.next().html()).to.not.equal(emailErrorHtml);
  });*/

  it('Error message when there is an invalid email ', function() {
    badForm.email.$setViewValue('blah');
    badEmailElement.children().trigger("blur");
    expect(badEmailElement.children()[1].innerHTML).to.equal('Enter a Valid Email.');
  });
  it('No Error message initially', function() {
    expect(goodEmailElement.children()[1]).to.be.undefined;
    goodEmailElement.children().trigger("blur");
    expect(goodEmailElement.children()[1]).to.be.undefined;
  });
  it('No Error message when there is an valid email ', function() {
    console.log(goodEmailElement.children()[1]);
    expect(goodEmailElement.children()[1]).to.be.undefined;
    goodForm.email.$setViewValue('aa@gmail.com');
    goodEmailElement.children().trigger("blur");
    console.log(goodEmailElement.children());
    expect(goodEmailElement.children()[1]).to.be.undefined;
  });




  

});