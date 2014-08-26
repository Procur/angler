describe('typeController', function() {
  var
    controller,
    scope,
    mockState,
    mockUser,
    mockCompany,
    mockAjax,
    mockPromise,
    mockResponse;

  beforeEach(module('pc.Wizard'));

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
      set: sinon.spy(),
      get: sinon.spy(),
      setActiveMode: sinon.spy()
    };

    mockCompany = {
      set: sinon.spy()
    };

    mockPromise = {
      then: sinon.stub(),
      catch: sinon.spy()
    };

    mockPromise.then = function(cb) {
      cb(mockResponse);
      return mockPromise;
    };

    mockAjax = {
      put: sinon.stub(),
    };

    mockAjax.put = function() {
      return mockPromise;
    };

    dependencies = {
      '$scope': scope,
      '$state': mockState,
      'ajaxService': mockAjax,
      'userService': mockUser,
      'companyService': mockCompany
    };

    controller = $controller('typeController', dependencies);
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
      beforeEach(function() {
        mockResponse = {
          activeMode: '',
        };
      });

      it('should set selectType on scope', function() {
        expect(typeof scope.selectType).to.equal('function');
      });

      it('should set the user and company type', function() {
        mockResponse.activeMode = 'supplier';
        scope.selectType('supplier');

        expect(mockCompany.set).to.have.been.calledWith('supplier', true);
        expect(mockUser.setActiveMode).to.have.been.calledWith('supplier');
      });

      it('should set the company buyer property to false and go to the finished product state', function() {
        mockResponse.activeMode = 'supplier';
        scope.selectType('supplier');

        expect(mockCompany.set).to.have.been.calledWith('buyer', false);
        expect(mockState.go).to.have.been.calledWith('wizard.finished_product');
      });

      it('should set the company supplier property to false and go to the company information state', function() {
        mockResponse.activeMode = 'buyer';
        scope.selectType('buyer');

        expect(mockCompany.set).to.have.been.calledWith('supplier', false);
        expect(mockState.go).to.have.been.calledWith('wizard.company_information');
      });
    });
  });
});