describe('dashboardController', function() {

  var
    scope,
    controller,
    userData,
    companyData,
    mockActionItems,
    mockActionItemList;

  beforeEach(module('pc.Dashboard'));

  beforeEach(inject(function($injector, $rootScope, $controller){
    var
      dependencies,
      window = $injector.get('$window');

    userData = {
      firstName: 'chris',
      lastName: 'hourihan',
      image: 'http://res.cloudinary.com/huewqecyr/image/upload/v1407339867/pzwxobgpaqk8b4gemaut.jpg',
      createdAt: '2014-08-07T02:15:42.447Z'
    };

    companyData = {
      name: 'www.foo.com'
    };

    window.pc = {
      localData: {
        user: userData,
        company: companyData
      }
    };

    mockActionItemList = {
      foo: 'bar'
    };

    mockActionItems = {
      get: sinon.stub(),
      activeMode: function() {}
    };
    mockActionItems.get.returns(mockActionItemList);

    scope = $rootScope.$new();

    dependencies = {
      '$scope': scope,
      'userService': $injector.get('userService'),
      'companyService': $injector.get('companyService'),
      'actionItemsService': mockActionItems
    };

    controller = $controller('dashboardController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the user object', function() {
      expect(scope.user.firstName).to.equal(userData.firstName);
      expect(scope.user.lastName).to.equal(userData.lastName);
      expect(scope.user.image).to.equal(userData.image);
      expect(scope.user.createdYear).to.equal('2014');
    });

    it('should add the company object', function() {
      expect(scope.company.name).to.equal(companyData.name);
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