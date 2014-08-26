describe('productionDetailsController', function() {

  var
    controller,
    scope,
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

    supplierService = $injector.get('supplierService');

    dependencies = {
      '$scope': scope,
      'supplierService': supplierService
    };

    controller = $controller('productionDetailsController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the supplier information', function() {
      expect(scope.supplier).to.not.be.undefined;
    });
  });

});