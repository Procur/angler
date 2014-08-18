describe('actionItemsService', function() {
  var
    service,
    mockUser,
    mockCompany,
    mockBuyer,
    mockSupplier;

  beforeEach(module('pc.Dashboard'));

  beforeEach(module(function($provide) {
    mockUser = {
      image: 'foo.png',
      jobTitle: 'Engineer',
      isBuyerMode: sinon.spy(),
      activeMode: 'supplier'
    };

    mockCompany = {
      website: 'www.foo.com'
    };

    mockBuyer = {
      companyDescription: 'description',
      responsibilityStatements:  {
        environmentalSustainability: 'yes'
      },
      tradePreferences: {
        preferredSupplierType: 'supplier'
      },
      productCategories: []
    };

    mockSupplier = {
      companyDescription: 'description',
      responsibilityStatements:  {
        environmentalSustainability: 'yes'
      },
      tradePreferences: {
        preferredBuyerType: 'buyer'
      }
    };

    $provide.value('userService', mockUser);
    $provide.value('companyService', mockCompany);
    $provide.value('buyerService', mockBuyer);
    $provide.value('supplierService', mockSupplier);
  }));

  beforeEach(inject(function($injector) {
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