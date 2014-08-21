
describe('myProcurController', function() {

  var
    scope,
    controller,
    user,
    company;

  beforeEach(module('pc.Header'));

  beforeEach(inject(function($injector, $rootScope, $controller){
    var
      dependencies,
      window = $injector.get('$window');

    window.pc = { localData: {} };

    scope = $rootScope.$new();

    user = $injector.get('userService');

    company = $injector.get('companyService');

    dependencies = {
      '$scope': scope,
      'userService': user,
      'companyService': company
    };

    controller = $controller('myProcurController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user object', function() {
      expect(scope.user).to.equal(user);
    });

    it('should add the company object', function() {
      expect(scope.company).to.equal(company);
    });
  });

});