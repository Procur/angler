
describe('dashboardController', function() {

  var
    scope,
    controller,
    mockUser,
    mockCompany,
    mockActionItems,
    mockActionItemList;

  beforeEach(module('pc.Dashboard'));

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

    mockActionItemList = {
      foo: 'bar'
    };

    mockActionItems = {
      get: sinon.stub(),
      activeMode: function() {}
    };
    mockActionItems.get.returns(mockActionItemList);

    dependencies = {
      '$scope': scope,
      'userService': mockUser,
      'companyService': mockCompany,
      'actionItemsService': mockActionItems
    };

    controller = $controller('dashboardController', dependencies);
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

    it('should add the action items array', function() {
      expect(mockActionItems.get).to.have.been.called;
      expect(scope.actionItems).to.equal(mockActionItemList);
    });

    it('should set the action items active mode filter', function() {
      expect(scope.activeModeFilter).to.not.be.undefined;
      expect(typeof scope.activeModeFilter).to.equal('function');
    });

    it('should set the coming soon list', function() {
      expect(scope.comingSoon).to.not.be.undefined;
      expect(scope.comingSoon[0].label).to.not.be.undefined;
      expect(scope.comingSoon[0].alt).to.not.be.undefined;
      expect(scope.comingSoon[0].icon).to.not.be.undefined;
    });
  });

});