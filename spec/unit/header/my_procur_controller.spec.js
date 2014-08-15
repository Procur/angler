
describe('myProcurController', function() {

  var
    scope,
    controller,
    mockUser,
    mockCompany;

  beforeEach(module('pc.Header'));

  beforeEach(inject(function($rootScope, $controller){
    var
      dependencies;

    scope = $rootScope.$new();

    mockUser = {
      name: 'chris hourihan',
      image: 'http://res.cloudinary.com/huewqecyr/image/upload/v1407339867/pzwxobgpaqk8b4gemaut.jpg',
      createdAt: '2014-08-07T02:15:42.447Z'
    };

    mockCompany = {
      name: 'chris-test'
    };

    dependencies = {
      '$scope': scope,
      'userService': mockUser,
      'companyService': mockCompany
    };

    controller = $controller('myProcurController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user object', function() {
      expect(scope.user).to.equal(mockUser);
    });

    it('should add the company object', function() {
      expect(scope.company).to.equal(mockCompany);
    });
  });

});