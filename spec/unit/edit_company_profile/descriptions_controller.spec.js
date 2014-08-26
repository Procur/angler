describe('descriptionsController', function() {

  var
    controller,
    scope,
    buyerService,
    supplierService;

  beforeEach(module('pc.EditCompanyProfile'));

  beforeEach(inject(function($rootScope, $controller, $injector) {
    var
      dependencies;

    window.pc = {
      localData: {
        company: {
          supplier: true
        }
      }
    };

    scope = $rootScope.$new();

    buyerService = $injector.get('buyerService');
    supplierService = $injector.get('supplierService');

    dependencies = {
      '$scope': scope,
      'buyerService': buyerService,
      'supplierService': supplierService
    };

    controller = $controller('descriptionsController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the buyer information', function() {
      expect(scope.buyer).to.not.be.undefined;
    });
    it('should set the supplier information', function() {
      expect(scope.supplier).to.not.be.undefined;
    });
  })

});