describe('companyInformationController', function() {
  var
    controller,
    scope,
    userService,
    companyService;

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
    companyService = $injector.get('companyService');

    dependencies = {
      '$scope': scope,
      'userService': userService,
      'companyService': companyService
    };

    controller = $controller('companyInformationController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user information', function() {
      expect(scope.user).to.not.be.undefined;
    });
    it('should set the company information', function() {
      expect(scope.company).to.not.be.undefined;
    });
  })

});