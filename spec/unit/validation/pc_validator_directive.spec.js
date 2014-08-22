describe('pcValidator Directive:', function() {

  describe('Email validation', function() {
    var
    scope,
    compile,
    emailElement,
    form;

    beforeEach(module('pc.Validation'));

    emailErrorHtml = '<p class="error">Enter a Valid Email.</p>';


    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      emailElement = angular.element(
        "<form name='form'>"+
        "<input type='email' name='email' pc-validator='email' ng-model='email'/>"+
        "</form>");
      $compile(emailElement)(scope);
      scope.$digest();
      form = scope.form;


    }));

  //email errors
  


  it('Error message when there is an invalid email ', function() {
    form.email.$setViewValue('blah');
    emailElement.children().trigger("blur");
    expect(emailElement.children()[1].innerHTML).to.equal('Enter a Valid Email.');
  });

  it('No Error message initially', function() {
    expect(emailElement.children()[1]).to.be.undefined;
    emailElement.children().trigger("blur");
    expect(emailElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid email ', function() {
    expect(emailElement.children()[1]).to.be.undefined;
    form.email.$setViewValue('aa@gmail.com');
    emailElement.children().trigger("blur");
    expect(emailElement.children()[1]).to.be.undefined;
  });
});

describe('Password validation', function() {
  var
  scope,
  compile,
  passwordElement,
  form;

  beforeEach(module('pc.Validation'));


  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    passwordElement = angular.element(
      "<form name='form'>"+
      "<input type='password' name='password' pc-validator='password' ng-model='password'/>"+
      "</form>");
    $compile(passwordElement)(scope);
    scope.$digest();
    form = scope.form;
  }));

  //password errors
  


  it('Error message when there is an invalid password ', function() {
    form.password.$setViewValue('blah');
    passwordElement.children().trigger("blur");
    expect(passwordElement.children()[1].innerHTML).to.equal('Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)');
  });

  it('Error message when there is an invalid password length', function() {
    form.password.$setViewValue('Blah1.');
    passwordElement.children().trigger("blur");
    expect(passwordElement.children()[1].innerHTML).to.equal('Passwords must be between 8 and 20 characters.');
  });

  it('No Error message initially', function() {
    expect(passwordElement.children()[1]).to.be.undefined;
    passwordElement.children().trigger("blur");
    scope.$digest();
    expect(passwordElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid password ', function() {
    expect(passwordElement.children()[1]).to.be.undefined;
    form.password.$setViewValue('ValidPa55');
    passwordElement.children().trigger("blur");
    expect(passwordElement.children()[1]).to.be.undefined;
  });
});

describe('Url validation', function() {
    var
    scope,
    compile,
    urlElement,
    form;

    beforeEach(module('pc.Validation'));

    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      urlElement = angular.element(
        "<form name='form'>"+
        "<input type='url' name='url' pc-validator='url' ng-model='url'/>"+
        "</form>");
      urlElement = angular.element(
        "<form name='form'>"+
        "<input type='url' name='url' pc-validator='url' ng-model='url'/>"+
        "</form>");
      $compile(urlElement)(scope);
      $compile(urlElement)(scope);
      scope.$digest();
      form = scope.form;
      form = scope.form;

    }));

  //url errors
  


  it('Error message when there is an invalid url ', function() {
    form.url.$setViewValue('blah');
    urlElement.children().trigger("blur");
    expect(urlElement.children()[1].innerHTML).to.equal('Enter a Valid Url With http://.');
  });

  it('No Error message initially', function() {
    expect(urlElement.children()[1]).to.be.undefined;
    urlElement.children().trigger("blur");
    expect(urlElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid url ', function() {
    expect(urlElement.children()[1]).to.be.undefined;
    form.url.$setViewValue('http://www.hello.com');
    urlElement.children().trigger("blur");
    expect(urlElement.children()[1]).to.be.undefined;
  });
});

describe('Required validation', function() {
    var
    scope,
    compile,
    requiredElement,
    requiredElement,
    form;

    beforeEach(module('pc.Validation'));

    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      requiredElement = angular.element(
        "<form name='form'>"+
        "<input type='required' name='required' pc-validator='required' ng-model='required'/>"+
        "</form>");
      $compile(requiredElement)(scope);
      scope.$digest();
      form = scope.form;

    }));

  //required errors
  


  it('Error message when there is an invalid required ', function() {
    form.required.$setViewValue('blah');
    form.required.$setViewValue('');
    requiredElement.children().trigger("blur");
    expect(requiredElement.children()[1].innerHTML).to.equal('Required.');
  });

  it('No Error message initially', function() {
    expect(requiredElement.children()[1]).to.be.undefined;
    requiredElement.children().trigger("blur");
    expect(requiredElement.children()[1]).to.be.undefined;
  });

  it('No Error message when there is an valid required ', function() {
    expect(requiredElement.children()[1]).to.be.undefined;
    form.required.$setViewValue('http://www.hello.com');
    requiredElement.children().trigger("blur");
    expect(requiredElement.children()[1]).to.be.undefined;
  });
});



});