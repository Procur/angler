describe('pcUserHeader Directive', function() {

  var
    scope,
    mockUser,
    mockUserData,
    deferredUser,
    mockCompany,
    mockCompanyData,
    deferredCompany,
    userHeaderElement;

  beforeEach(module('pc.User'));
  beforeEach(module('pc.Templates'));

  beforeEach(module(function($provide) {
    deferredUser = undefined;

    mockUserData = {
      firstName: 'bruce',
      lastName: 'wayne',
      activeMode: 'supplier',
      inactiveMode: 'buyer',
      toggleActiveMode: sinon.spy()
    };

    mockUser = function() {
      return {
        then: function(cb) {
          deferredUser = cb(mockUserData);
          return deferredUser;
        }
      };
    };

    deferredCompany = undefined;

    mockCompanyData = {
      buyer: true,
      supplier: true,
      name: 'wayne enterprises',
    };

    mockCompany = function() {
      return {
        then: function(cb) {
          deferredCompany = cb(mockCompanyData);
          return deferredCompany;
        }
      };
    };

    $provide.value('userService', mockUser);
    $provide.value('companyService', mockCompany);
  }));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    userHeaderElement = angular.element('<div pc-user-header ></div>');

    $compile(userHeaderElement)(scope);

    scope.$digest();
  }));

  describe('template', function() {

  });

  describe('controller', function() {
    var
      localScope;

    beforeEach(function() {
      localScope = userHeaderElement.isolateScope();
    });

    it('should have a user object with a first and last name', function() {
      expect(localScope.user.firstName).to.equal(mockUserData.firstName);
      expect(localScope.user.lastName).to.equal(mockUserData.lastName);
    });

    it('should have a user object with an active and inactiveMode', function() {
      expect(localScope.user.activeMode).to.equal(mockUserData.activeMode);
      expect(localScope.user.inactiveMode).to.equal(mockUserData.inactiveMode);
    });

    it('should have a user object with a toggleActiveMode function', function() {
      expect(localScope.user.toggleActiveMode).to.equal(mockUserData.toggleActiveMode);
    });
  });

});