describe('viewCompanyProfileController', function() {
  var
    scope,
    controller,
    mockUser,
    mockCompany;

beforeEach(module('pc.ViewCompanyProfile'));

beforeEach(inject(function($rootScope,$controller) {
	var
		dependencies;

	mockUser = {
		foo : 'bar'
	};

	mockCompany = {
		name : 'Procur'
	};

	scope = $rootScope.$new();

	dependencies = {
      '$scope': scope,
      'userService': mockUser,
      'companyService': mockCompany
    };

    controller = $controller('viewCompanyProfileController',dependencies);

}));

	it('should exist', function() {
		expect(controller).to.be.not.undefined;
	});

	describe('$scope.user', function() {
  		it('should have user object on scope', function(){
    		expect(scope.user).to.equal(mockUser);
  		});
 	});

 	describe('$scope.company', function() {
 		it('should have company object on scope', function() {
 			expect(scope.company).to.equal(mockCompany);
 		});
 	});

});