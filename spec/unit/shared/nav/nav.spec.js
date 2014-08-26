describe('pcNav Directive', function() {

  var
    scope,
    navElement;

  beforeEach(module('pc.Nav'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    navElement = angular.element('<div pc-nav="foobar" ></div>');

    $compile(navElement)(scope);

    scope.$digest();
  }));

  describe('template', function() {

  });

  describe('linker', function() {
    var
      localScope;

    beforeEach(function() {
      localScope = navElement.isolateScope();
    });

    it('should add the class active on the stateChangeSuccess event', function() {
      expect(navElement.hasClass('active')).to.be.false;

      scope.$broadcast('$stateChangeSuccess', {name: 'foobar'});

      scope.$digest();

      expect(navElement.hasClass('active')).to.be.true;
    });

    it('should remove the class active on the stateChangeSuccess event when the state is not that of the nav', function() {
      navElement.addClass('active');

      expect(navElement.hasClass('active')).to.be.true;

      scope.$broadcast('$stateChangeSuccess', {name: 'raboof'});

      scope.$digest();

      expect(navElement.hasClass('active')).to.be.false;
    });
  });

});