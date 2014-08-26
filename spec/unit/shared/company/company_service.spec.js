describe('companyService', function() {
  var
    company,
    mockCompanyData;

  beforeEach(module('pc.Company'));

  beforeEach(inject(function($injector){
    var
      window = $injector.get('$window');

    mockCompanyData = {
      foo: 'bar',
      buyer: true,
      supplier: true
    };

    window.pc = {
      localData: {
        company: mockCompanyData
      }
    };
    company = $injector.get('companyService');
  }));

  it('should exist', function() {
    expect(company).to.not.be.undefined;
  });

  describe('get()', function() {
    it('should get the property from the company object', function() {
      expect(company.get('foo')).to.equal(mockCompanyData.foo);
    });
  });

  describe('set()', function() {
    it('should set the property on the company object', function() {
      expect(company.get('baz')).to.be.undefined;

      company.set('baz', true);

      expect(company.get('baz')).to.be.true;
    });
  });

  describe('setAll()', function() {
    it('should set all proeprties on the company object', function() {
      expect(company.get('hello')).to.be.undefined;
      expect(company.get('foo')).to.equal(mockCompanyData.foo);

      company.setAll({ hello: 'world', foo: 'oof' });

      expect(company.get('hello')).to.equal('world');
      expect(company.get('foo')).to.equal('oof');
    });
  });

  describe('isBuyer()', function() {
    it('should return true if the company is a buyer', function() {
      expect(company.isBuyer()).to.be.true;
    });
  });

  describe('isSupplier()', function() {
    it('should return true if the company is a supplier', function() {
      expect(company.isSupplier()).to.be.true;
    });
  });

  describe('isBoth()', function() {
    it('should return true if the company is a supplier and buyer', function() {
      expect(company.isBoth()).to.be.true;
    });
  });
});