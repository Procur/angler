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

    it('Error message appears when wrong, and goes away when good', function() {
      expect(emailElement.children()[1]).to.be.undefined;
      form.email.$setViewValue('blah');
      emailElement.children().trigger("blur");
      expect(emailElement.children()[1].innerHTML).to.equal('Enter a Valid Email.');
      form.email.$setViewValue('aa@gmail.com');
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


    beforeEach(inject(function($compile, $rootScope) {
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

    it('Error message goes away with good input', function() {
      form.required.$setViewValue('blah');
      form.required.$setViewValue('');
      requiredElement.children().trigger("blur");
      expect(requiredElement.children()[1].innerHTML).to.equal('Required.');
      form.required.$setViewValue('blah');
      requiredElement.children().trigger("blur");
      expect(requiredElement.children()[1]).to.be.undefined;
    });
  });

  describe('Digits Validation', function() {
    var
    scope,
    compile,
    digitElement,
    form;

    beforeEach(module('pc.Validation'));

    emailErrorHtml = '<p class="error">Must be numbers only.</p>';


    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      digitElement = angular.element(
        "<form name='form'>"+
        "<input type='email' name='email' pc-validator='digits' ng-model='email'/>"+
        "</form>");
      $compile(digitElement)(scope);
      scope.$digest();
      form = scope.form;


    }));

    //email errors
    


    it('Error message when not digits', function() {
      form.email.$setViewValue('bl2ah');
      digitElement.children().trigger("blur");
      expect(digitElement.children()[1].innerHTML).to.equal('Must be numbers only.');
    });

    it('No Error message initially', function() {
      expect(digitElement.children()[1]).to.be.undefined;
      digitElement.children().trigger("blur");
      expect(digitElement.children()[1]).to.be.undefined;
    });

    it('Error message appears when wrong, and goes away when good', function() {
      expect(digitElement.children()[1]).to.be.undefined;
      form.email.$setViewValue('aa12dd');
      digitElement.children().trigger("blur");
      expect(digitElement.children()[1].innerHTML).to.equal('Must be numbers only.');
      form.email.$setViewValue('54545');
      digitElement.children().trigger("blur");
      expect(digitElement.children()[1]).to.be.undefined;
    });

    it('No Error message when there is an valid email ', function() {
      expect(digitElement.children()[1]).to.be.undefined;
      form.email.$setViewValue('52354');
      digitElement.children().trigger("blur");
      expect(digitElement.children()[1]).to.be.undefined;
    });
  });

  describe('Text Validation', function() {
    var
    scope,
    compile,
    textElement,
    form;

    beforeEach(module('pc.Validation'));

    emailErrorHtml = '<p class="error">Must be numbers only.</p>';


    beforeEach(inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      textElement = angular.element(
        "<form name='form'>"+
        "<input type='email' name='email' pc-validator='text' ng-model='email'/>"+
        "</form>");
      $compile(textElement)(scope);
      scope.$digest();
      form = scope.form;


    }));

    //email errors
    


    it('Error message when not digits', function() {
      form.email.$setViewValue('bl2ah');
      textElement.children().trigger("blur");
      expect(textElement.children()[1].innerHTML).to.equal('Must be Letters only.');
    });

    it('No Error message initially', function() {
      expect(textElement.children()[1]).to.be.undefined;
      textElement.children().trigger("blur");
      expect(textElement.children()[1]).to.be.undefined;
    });

    it('Error message appears when wrong, and goes away when good', function() {
      expect(textElement.children()[1]).to.be.undefined;
      form.email.$setViewValue('aa12dd');
      textElement.children().trigger("blur");
      expect(textElement.children()[1].innerHTML).to.equal('Must be Letters only.');
      form.email.$setViewValue('ABC');
      textElement.children().trigger("blur");
      expect(textElement.children()[1]).to.be.undefined;
    });

    it('No Error message when there only letters ', function() {
      expect(textElement.children()[1]).to.be.undefined;
      form.email.$setViewValue('dkjfksjdk');
      textElement.children().trigger("blur");
      expect(textElement.children()[1]).to.be.undefined;
    });
  });

});