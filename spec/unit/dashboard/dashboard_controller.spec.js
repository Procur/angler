
describe('dashboardController', function() {

  var
    scope,
    controller,
    mockUser,
    mockCompany;

  beforeEach(module('pc.Dashboard'));

  beforeEach(inject(function($rootScope, $controller){
    var
      dependencies;

    scope = $rootScope.$new();

    mockUser = {
      profile: {
        name: 'chris hourihan',
        image: 'http://res.cloudinary.com/huewqecyr/image/upload/v1407339867/pzwxobgpaqk8b4gemaut.jpg',
        createdDT: '2014-08-07T02:15:42.447Z'
      }
    };

    mockCompany = {
      name: 'chris-test'
    };

    dependencies = {
      '$scope': scope,
      'user': mockUser,
      'company': mockCompany
    };

    controller = $controller('dashboardController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

});