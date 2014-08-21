describe('pcValidator Directive:', function() {

  describe('Email validation', function() {
    var
    scope,
    compile,
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
    expect(goodEmailElement.children()[1]).to.be.undefined;
    goodForm.email.$setViewValue('aa@gmail.com');
    goodEmailElement.children().trigger("blur");
    expect(goodEmailElement.children()[1]).to.be.undefined;
  });
});

describe('Password validation', function() {
  var
  scope,
  compile,
  navElement,
  goodPasswordElement,
  badPasswordElement,
  goodForm,
  badForm;

  beforeEach(module('pc.Validation'));


  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    goodPasswordElement = angular.element(
      "<form name='goodForm'>"+
      "<input type='password' name='password' pc-validator='password' ng-model='password'/>"+
      "</form>");
    badPasswordElement = angular.element(
      "<form name='badForm'>"+
      "<input type='password' name='password' pc-validator='password' ng-model='password'/>"+
      "</form>");
    $compile(badPasswordElement)(scope);
    $compile(goodPasswordElement)(scope);
    scope.$digest();
    goodForm = scope.goodForm;
    badForm = scope.badForm;

  }));

  //password errors
  


  it('Error message when there is an invalid password ', function() {
    badForm.password.$setViewValue('blah');
    badPasswordElement.children().trigger("blur");
    expect(badPasswordElement.children()[1].innerHTML).to.equal('Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)');
  });
  /**
  it('Error message when there is an invalid password length', function() {
    badForm.password.$setViewValue('Blah1.');
    badPasswordElement.children().trigger("blur");
    expect(badPasswordElement.children()[1].innerHTML).to.equal('Passwords must be between 8 and 20 characters.');
  });*/

  it('No Error message initially', function() {
    expect(goodPasswordElement.children()[1]).to.be.undefined;
    goodPasswordElement.children().trigger("blur");
    scope.$digest();
    expect(goodPasswordElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid password ', function() {
    expect(goodPasswordElement.children()[1]).to.be.undefined;
    goodForm.password.$setViewValue('ValidPa55');
    goodPasswordElement.children().trigger("blur");
    expect(goodPasswordElement.children()[1]).to.be.undefined;
  });
});

describe('Url validation', function() {
    var
    scope,
    compile,
    navElement,
    urlErrorHtml,
    goodUrlElement,
    badUrlElement,
    goodForm,
    badForm;

    beforeEach(module('pc.Validation'));

    urlErrorHtml = '<p class="error">Enter a Valid Url.</p>';


    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      goodUrlElement = angular.element(
        "<form name='goodForm'>"+
        "<input type='url' name='url' pc-validator='url' ng-model='url'/>"+
        "</form>");
      badUrlElement = angular.element(
        "<form name='badForm'>"+
        "<input type='url' name='url' pc-validator='url' ng-model='url'/>"+
        "</form>");
      $compile(badUrlElement)(scope);
      $compile(goodUrlElement)(scope);
      scope.$digest();
      goodForm = scope.goodForm;
      badForm = scope.badForm;

    }));

  //url errors
  


  it('Error message when there is an invalid url ', function() {
    badForm.url.$setViewValue('blah');
    badUrlElement.children().trigger("blur");
    expect(badUrlElement.children()[1].innerHTML).to.equal('Enter a Valid Url With http://.');
  });

  it('No Error message initially', function() {
    expect(goodUrlElement.children()[1]).to.be.undefined;
    goodUrlElement.children().trigger("blur");
    expect(goodUrlElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid url ', function() {
    expect(goodUrlElement.children()[1]).to.be.undefined;
    goodForm.url.$setViewValue('http://www.hello.com');
    goodUrlElement.children().trigger("blur");
    expect(goodUrlElement.children()[1]).to.be.undefined;
  });
});

describe('Required validation', function() {
    var
    scope,
    compile,
    navElement,
    requiredErrorHtml,
    goodRequiredElement,
    badRequiredElement,
    goodForm,
    badForm;

    beforeEach(module('pc.Validation'));



    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      goodRequiredElement = angular.element(
        "<form name='goodForm'>"+
        "<input type='required' name='required' pc-validator='required' ng-model='required'/>"+
        "</form>");
      badRequiredElement = angular.element(
        "<form name='badForm'>"+
        "<input type='required' name='required' pc-validator='required' ng-model='required'/>"+
        "</form>");
      $compile(badRequiredElement)(scope);
      $compile(goodRequiredElement)(scope);
      scope.$digest();
      goodForm = scope.goodForm;
      badForm = scope.badForm;

    }));

  //required errors
  


  it('Error message when there is an invalid required ', function() {
    badForm.required.$setViewValue('blah');
    badForm.required.$setViewValue('');
    badRequiredElement.children().trigger("blur");
    expect(badRequiredElement.children()[1].innerHTML).to.equal('Required.');
  });

  it('No Error message initially', function() {
    expect(goodRequiredElement.children()[1]).to.be.undefined;
    goodRequiredElement.children().trigger("blur");
    expect(goodRequiredElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid required ', function() {
    expect(goodRequiredElement.children()[1]).to.be.undefined;
    goodForm.required.$setViewValue('http://www.hello.com');
    goodRequiredElement.children().trigger("blur");
    expect(goodRequiredElement.children()[1]).to.be.undefined;
  });
});



});