describe('userAccountSettingsController', function() {
  var 
    scope,
    controller,
    mockUser;

 beforeEach( module('pc.UserAccountSettings'));

 beforeEach(inject(function($rootScope, $controller) {
    var 
      dependencies;


    mockUser = {
      food: "blah"
    };




    scope = $rootScope.$new();

    dependencies = {
      '$scope': scope,
      'userService': mockUser
    };

    controller = $controller('userAccountSettingsController', dependencies);

  }));

 it("should exist", function () {
  expect(controller).to.not.be.undefined;
 });

 describe('$scope.user', function() {
  it('should have user object on scope', function(){
    expect(scope.user).to.equal(mockUser);
  })
 });

});