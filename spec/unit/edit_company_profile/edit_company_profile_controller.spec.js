describe('editCompanyProfileController', function() {

  var
    scope,
    controller,
    mockUser;

  beforeEach(module('pc.EditCompanyProfile'));

  beforeEach(inject(function($rootScope, $controller) {
    var
      dependencies;

    scope = $rootScope.$new();

    mockUser = {
      activeMode: 'supplier',
      isSupplierMode: isSupplierMode,
      isBuyerMode: isBuyerMode
    };

    dependencies = {
      '$scope': scope,
      'userService': mockUser
    };

    function isSupplierMode() {
      return mockUser.activeMode === 'supplier';
    }

    function isBuyerMode() {
      return mockUser.activeMode === 'buyer';
    }

    controller = $controller('editCompanyProfileController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user\'s active mode', function() {
      expect(scope.user.activeMode).to.equal(mockUser.activeMode);
    });
    it('should set the user\'s buyer and supplier mode', function() {
      expect(scope.user.isSupplierMode).to.equal(mockUser.isSupplierMode);
      expect(scope.user.isBuyerMode).to.equal(mockUser.isBuyerMode);
    });
  });

});
