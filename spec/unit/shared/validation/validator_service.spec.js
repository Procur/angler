describe('validatorService', function() {

  var
    service,
    VALIDATION_TYPE;

  beforeEach(module('pc.Validation'));

  beforeEach(inject(function($injector) {
    VALIDATION_TYPE = $injector.get('VALIDATION_TYPE');

    service = $injector.get('validatorService');
  }));

  it('should exist', function() {
    expect(service).to.not.be.undefined;
  });

  describe('validateDigits()', function() {
    var
      validNum = 13423,
      validString = '134544',
      invalid = '1343b3',
      notDefined;

    it('should return true for a valid set of digits', function(){
      expect(service.digits(validNum)).to.be.true;
      expect(service.digits(validString)).to.be.true;
    });

    it('should return false for an invalid set of digits', function() {
      expect(service.digits(invalid)).to.be.false;
      expect(service.digits(notDefined)).to.be.false;
    });
  });

  describe('validateText()', function() {
    var
      valid = 'asdfsdf',
      invalid = 'asdf34dfd',
      notDefined;

    it('should return true for a valid set of text', function(){
      expect(service.text(valid)).to.be.true;
    });

    it('should return false for an invalid set of text', function() {
      expect(service.text(invalid)).to.be.false;
      expect(service.text(notDefined)).to.be.false;
    });
  });

  describe('validateRequired()', function() {
    var
      valid = 'asdfsdf',
      invalid = '',
      notDefined;

    it('should return true for a valid set of required', function(){
      expect(service.required(valid)).to.be.true;
    });

    it('should return false for an invalid set of required', function() {
      expect(service.required(invalid)).to.be.false;
      expect(service.required(notDefined)).to.be.false;
    });
  });

  describe('validateEmail()', function() {
    var
      valid = 'ch@foo.com',
      empty = '',
      invalid = 'ch',
      invalid2 = 'ch@',
      invalid3 = 'ch@foo',
      notDefined;

    it('should return true for a valid set of email', function(){
      expect(service.email(valid)).to.be.true;
    });

    it('should return false for an invalid set of email', function() {
      expect(service.email(empty)).to.be.false;
      expect(service.email(invalid)).to.be.false;
      expect(service.email(invalid2)).to.be.false;
      expect(service.email(invalid3)).to.be.false;
      expect(service.email(notDefined)).to.be.false;
    });
  });

  describe('validatePassword()', function() {
    var
      valid = 'Fooobar1',
      valid2 = 'Fooobar!',
      empty = '',
      invalidSpecial = 'Fooobarr',
      invalidCap = 'fooobar1!',
      notDefined;

    it('should return true for a valid set of password', function(){
      expect(service.password(valid)).to.be.true;
      expect(service.password(valid2)).to.be.true;
    });

    it('should return false for an invalid set of password', function() {
      expect(service.password(empty)).to.be.false;
      expect(service.password(invalidSpecial)).to.be.false;
      expect(service.password(invalidCap)).to.be.false;
      expect(service.password(notDefined)).to.be.false;
    });
  });

  describe('validatePasswordLength()', function() {
    var
      valid = 'Fooobarsd',
      valid2 = 'FoobarFoobarFoobarFo',
      empty = '',
      invalid = 'Foobar7',
      invalid2 = 'FoobarFoobarFoobarFoo',
      notDefined;

    it('should return true for a valid set of passwordLength', function(){
      expect(service.passwordLength(valid)).to.be.true;
      expect(service.passwordLength(valid2)).to.be.true;
    });

    it('should return false for an invalid set of passwordLength', function() {
      expect(service.passwordLength(empty)).to.be.false;
      expect(service.passwordLength(invalid)).to.be.false;
      expect(service.passwordLength(invalid2)).to.be.false;
      expect(service.passwordLength(notDefined)).to.be.false;
    });
  });

  describe('validateUrl()', function() {
    var
      valid = 'http://www.foobar.com',
      valid2 = 'http://foobar.com',
      empty = '',
      invalid = 'www.foobar.com',
      invalid2 = 'foobar.com',
      notDefined;

    it('should return true for a valid set of url', function(){
      expect(service.url(valid)).to.be.true;
      expect(service.url(valid2)).to.be.true;
    });

    it('should return false for an invalid set of url', function() {
      expect(service.url(empty)).to.be.false;
      expect(service.url(invalid)).to.be.false;
      expect(service.url(invalid2)).to.be.false;
      expect(service.url(notDefined)).to.be.false;
    });
  });

  describe('validatePhoneNumber()', function() {
    var
      valid = '2123423',
      valid2 = '234.3344.23432',
      valid3 = '234-342-2344',
      empty = '',
      invalid = '23234w',
      invalid2 = '+223434',
      notDefined;

    it('should return true for a valid set of phoneNumber', function(){
      expect(service.phoneNumber(valid)).to.be.true;
      expect(service.phoneNumber(valid2)).to.be.true;
      expect(service.phoneNumber(valid3)).to.be.true;
    });

    it('should return false for an invalid set of phoneNumber', function() {
      expect(service.phoneNumber(empty)).to.be.false;
      expect(service.phoneNumber(invalid)).to.be.false;
      expect(service.phoneNumber(invalid2)).to.be.false;
      expect(service.phoneNumber(notDefined)).to.be.false;
    });
  });

  describe('validateCountryCode()', function() {
    var
      valid = '+13',
      valid2 = '+1234',
      empty = '',
      invalid = '12',
      invalid2 = '+2a',
      notDefined;

    it('should return true for a valid set of countryCode', function(){
      expect(service.countryCode(valid)).to.be.true;
      expect(service.countryCode(valid2)).to.be.true;
    });

    it('should return false for an invalid set of countryCode', function() {
      expect(service.countryCode(empty)).to.be.false;
      expect(service.countryCode(invalid)).to.be.false;
      expect(service.countryCode(invalid2)).to.be.false;
      expect(service.countryCode(notDefined)).to.be.false;
    });
  });

  describe('validateConfirm()', function() {
    var
      valid = 'foobar',
      valid2 = 'foobar',
      empty = '',
      invalid = '12',
      invalid2 = '+2a',
      notDefined;

    it('should return true for a valid set of confirm', function(){
      expect(service.confirm(valid, valid2)).to.be.true;
      expect(service.confirm(empty, empty)).to.be.true;
      expect(service.confirm(notDefined, notDefined)).to.be.true;
      expect(service.confirm(empty, notDefined)).to.be.true;
    });

    it('should return false for an invalid set of confirm', function() {
      expect(service.confirm(empty, invalid)).to.be.false;
      expect(service.confirm(invalid, invalid2)).to.be.false;
      expect(service.confirm(invalid, notDefined)).to.be.false;
    });
  });

});