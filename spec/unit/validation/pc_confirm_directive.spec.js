describe('pcConfirm Directive:', function() {
  var 
  scope,
  compile,
  confirmElement,
  form;


  beforeEach(module('pc.Validation'));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope.$new();
    confirmElement = angular.element(
      "<form name='form'>"+
      "<input type='email' name='email' ng-model='field'/>"+
      "<input type='email' name='email_c' pc-confirm='field' ng-model='formData.email_c'/>"+
      "</form>");
    $compile(confirmElement)(scope);
    scope.$digest();
    form = scope.form;
  }));
  
  it("No error message if both are the same", function() {
    expect(confirmElement.children()[2]).to.be.undefined;
    scope.field = "Valid1..";
    scope.$digest();
    form.email_c.$setViewValue("Valid1..");
    confirmElement.children().trigger('blur');
    expect(confirmElement.children()[2]).to.be.undefined;  
  }); 

  it("No error message if not messed with", function() {
    expect(confirmElement.children()[2]).to.be.undefined;
  });

  it("Error message if second has value but not first", function() {
    expect(confirmElement.children()[2]).to.be.undefined;
    form.email_c.$setViewValue("text");
    confirmElement.children().trigger('blur');
    expect(confirmElement.children()[2].innerHTML).to.equal('Does not match.');
  });

  it("Error message if both fields are different", function() {
    expect(confirmElement.children()[2]).to.be.undefined;
    scope.field = "Valid1..";
    scope.$digest();
    form.email_c.$setViewValue("text");
    confirmElement.children().trigger('blur');
    expect(confirmElement.children()[2].innerHTML).to.equal('Does not match.');
  });


});