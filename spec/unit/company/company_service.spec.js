describe('companyService', function() {
  var
    company,
    mockCompanyData,
    deferredResult,
    mockAjax;

  beforeEach(module('pc.Company'));

  beforeEach(module(function($provide) {
    mockCompanyData = {
      foo: 'bar'
    };

    deferredResult = undefined;

    mockAjax = {
      get: function() {
        return {
          then: function(cb) {
            deferredResult = cb(mockCompanyData);
          }
        };
      }
    };

    $provide.value('ajaxService', mockAjax);
  }));

  beforeEach(inject(function($injector){
    company = $injector.get('companyService');
  }));

  it('should exist', function() {
    expect(company).to.not.be.undefined;
  });

  describe('init', function() {
    it('should return a promise the resolves to company data', function() {
      expect(deferredResult).to.be.undefined;

      company();

      expect(deferredResult).to.equal(mockCompanyData);
    });
  });
});