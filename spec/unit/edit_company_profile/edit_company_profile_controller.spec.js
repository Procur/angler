
describe.only('editCompanyProfileController', function() {

  var
    scope,
    controller,
    mockUser,
    mockCompany;

  beforeEach(module('pc.EditCompanyProfile'));

  beforeEach(inject(function($rootScope, $controller) {
    var
      dependencies;

    scope = $rootScope.$new();

    mockUser = {
      name: 'John Doe'
    };

    mockCompany = {
      name: 'Acme Inc.'
    };

    dependencies = {
      '$scope': scope,
      'userService': mockUser,
      'companyService': mockCompany
    };

    controller = $controller('editCompanyProfileController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user object', function() {
      expect(scope.user).to.equal(mockUser);
    });

    it('should set the company object', function() {
      expect(scope.company).to.equal(mockCompany);
    });


  });

});

