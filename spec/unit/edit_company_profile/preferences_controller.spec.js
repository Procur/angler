describe('preferencesController', function() {

  var
    controller,
    scope,
    userService,
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

    userService = $injector.get('userService');
    buyerService = $injector.get('buyerService');
    supplierService = $injector.get('supplierService');

    dependencies = {
      '$scope': scope,
      'userService': userService,
      'buyerService': buyerService,
      'supplierService': supplierService
    };

    controller = $controller('preferencesController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user information', function() {
      expect(scope.user).to.not.be.undefined;
    });
    it('should set the buyer information', function() {
      expect(scope.buyer).to.not.be.undefined;
    });
    it('should set the supplier information', function() {
      expect(scope.supplier).to.not.be.undefined;
    });
  });

});