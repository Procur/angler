describe('companyService', function() {
  var
    company,
    mockCompanyData,
    mockWindow;

  beforeEach(module('pc.Company'));

  beforeEach(module(function($provide) {
    mockCompanyData = {
      foo: 'bar'
    };

    mockWindow = {
      pc: {
        localData: {
          company: mockCompanyData
        }
      }
    };

    $provide.value('$window', mockWindow);
  }));

  beforeEach(inject(function($injector){
    company = $injector.get('companyService');
  }));

  it('should exist', function() {
    expect(company).to.not.be.undefined;
  });

  it('should be the company data', function() {
    expect(company).to.equal(mockCompanyData);
  });

});