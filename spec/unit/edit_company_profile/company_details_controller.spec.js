describe('companyDetailsController', function() {

  var
    controller,
    scope,
    mockState,
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
    //scope.$on = sinon.spy();

    // mockState = {
    //   current: {
    //     data: {}
    //   },
    //   go: sinon.spy()
    // };

    companyService = $injector.get('companyService');
    //companyService.setAll = sinon.spy();

    dependencies = {
      '$scope': scope,
      '$state': mockState,
      'companyService': companyService
    };

    controller = $controller('companyDetailsController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the company information', function() {
      expect(scope.company).to.not.be.undefined;
    });
  });

});