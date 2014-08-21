describe('registrationTypeController', function() {
  var
    controller,
    scope,
    mockState,
    mockUser,
    mockCompany;

  beforeEach(module('pc.Registration'));

  beforeEach(inject(function($rootScope, $controller) {
    var
      dependencies;

    scope = $rootScope.$new();
    scope.wizard = {
      progressBar: {
        update: sinon.spy()
      }
    };

    mockState = {
      current: {
        data: {
          leadText: 'foo'
        }
      },
      go: sinon.spy()
    };

    mockUser = {
      set: sinon.spy()
    };

    mockCompany = {
      set: sinon.spy()
    };

    dependencies = {
      '$scope': scope,
      '$state': mockState,
      'userService': mockUser,
      'companyService': mockCompany
    };

    controller = $controller('registrationTypeController', dependencies);
  }));

  it('should exist', function() {
    expect(controller).to.not.be.undefined;
  });

  describe('$scope', function() {
    it('should set the wizard', function() {
      expect(scope.wizard.leadText).to.equal(mockState.current.data.leadText);
      expect(scope.wizard.progressBar.update).to.have.been.calledWith(mockState.current.data.progressStep);
    });

    describe('selectType()', function() {
      it('should set selectType on scope', function() {
        expect(typeof scope.selectType).to.equal('function');
      });

      it('should set the user and company type', function() {
        scope.selectType('supplier');

        expect(mockCompany.set).to.have.been.calledWith('supplier', true);
        expect(mockUser.set).to.have.been.calledWith('activeMode', 'supplier');
      });

      it('should set the company buyer property to false and go to the finished product state', function() {
        scope.selectType('supplier');

        expect(mockCompany.set).to.have.been.calledWith('buyer', false);
        expect(mockState.go).to.have.been.calledWith('registration.finished_product');
      });

      it('should set the company supplier property to false and go to the company information state', function() {
        scope.selectType('buyer');

        expect(mockCompany.set).to.have.been.calledWith('supplier', false);
        expect(mockState.go).to.have.been.calledWith('registration.company_information');
      });
    });
  });
});