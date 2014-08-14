describe('pcUserHeader Directive', function() {

  var
    scope,
    mockUser,
    mockCompany,
    userHeaderElement;

  beforeEach(module('pc.User'));
  beforeEach(module('pc.Templates'));

  beforeEach(module(function($provide) {
    mockUser = {
      firstName: 'bruce',
      lastName: 'wayne',
      activeMode: 'supplier',
      inactiveMode: 'buyer',
      toggleActiveMode: sinon.spy()
    };

    mockCompany = {
      buyer: true,
      supplier: true,
      name: 'wayne enterprises',
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

    it('should have a user object', function() {
      expect(localScope.user).to.equal(mockUser);
    });

    it('should have a company object', function() {
      expect(localScope.company).to.equal(mockCompany);
    });
  });

});