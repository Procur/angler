describe('actionItemsService', function() {
  var
    service,
    userData,
    companyData,
    buyerData,
    supplierData;

  beforeEach(module('pc.Dashboard'));

  beforeEach(inject(function($injector) {
    var
      window = $injector.get('$window');

    userData = {
      image: 'foo.png',
      jobTitle: 'Engineer',
      activeMode: 'supplier'
    };

    companyData = {
      website: 'www.foo.com'
    };

    buyerData = {
      companyDescription: 'description',
      responsibilityStatements:  {
        environmentalSustainability: 'yes'
      },
      tradePreferences: {
        preferredSupplierType: 'supplier'
      },
      productCategories: []
    };

    supplierData = {
      companyDescription: 'description',
      responsibilityStatements:  {
        environmentalSustainability: 'yes'
      },
      tradePreferences: {
        preferredBuyerType: 'buyer'
      }
    };

    window.pc = {
      localData: {
        user: userData,
        company: companyData,
        buyer: buyerData,
        supplier: supplierData
      }
    };

    service = $injector.get('actionItemsService');
  }));

  it('should exist', function() {
    expect(service).to.not.be.undefined;
  });

  describe('get()', function() {
    var
      result;

    beforeEach(function() {
      result = service.get();
    });

    it('should return an array of action item objects', function() {
      expect(typeof result).to.equal('object');
      expect(result.length).to.not.be.undefined;
    });

    it('should return a correct action item object', function() {
      expect(result[0].action).to.not.be.undefined;
      expect(result[0].complete).to.not.be.undefined;
      expect(result[0].type).to.not.be.undefined;
      expect(result[0].link).to.not.be.undefined;
    });
  });

  describe('activeMode()', function(){
    var
      mockActionItem,
      result;

    beforeEach(function() {
      mockActionItem = {
        type: {
          buyer: true,
          supplier: false
        }
      };

      result = service.activeMode();
    });

    it('should return a function callback', function() {
      expect(typeof result).to.equal('function');
    });

    it('should return a boolean based on the current users active mode', function() {
      expect(result(mockActionItem)).to.be.false;
    });
  });
});