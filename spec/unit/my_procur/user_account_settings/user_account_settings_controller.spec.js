describe('userAccountSettingsController', function() {
  var
    scope,
    controller;

  beforeEach( module('pc.UserAccountSettings'));

  beforeEach(inject(function($rootScope, $controller) {
    var
      dependencies;

    scope = $rootScope.$new();

    dependencies = {
      '$scope': scope
    };

    controller = $controller('userAccountSettingsController', dependencies);

  }));

  it('should exist', function () {
    expect(controller).to.not.be.undefined;
  });

});