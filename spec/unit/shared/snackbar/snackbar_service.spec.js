describe('snackbarService', function() {

  var
    snackbar,
    mockSnackbar = { baz: 'boom' },
    mockTemplateCache,
    mockTimeout,
    mockRootScope,
    mockScope = { foo: 'bar' },
    mockDocument,
    mockCompile,
    compileStub,
    mockAnimate,
    POSITION_CLASSES,
    SNACKBAR_COLORS;

  beforeEach(module('pc.Snackbar'));

  beforeEach(module(function($provide) {
    mockRootScope = {
      $new: sinon.stub()
    };
    mockRootScope.$new.returns(mockScope);

    mockTemplateCache = {
      get: sinon.spy()
    };

    mockTimeout = sinon.spy();

    mockDocument = {
      find: sinon.spy()
    };

    compileStub = sinon.stub();
    compileStub.returns(mockSnackbar);
    mockCompile = sinon.stub();
    mockCompile.returns(compileStub);

    mockAnimate = {
      enter: sinon.spy(),
      leave: sinon.spy()
    };

    $provide.value('$templateCache', mockTemplateCache);
    $provide.value('$rootScope', mockRootScope);
    $provide.value('$timeout', mockTimeout);
    $provide.value('$document', mockDocument);
    $provide.value('$compile', mockCompile);
    $provide.value('$animate', mockAnimate);
  }));

  beforeEach(inject(function($injector) {
    POSITION_CLASSES = $injector.get('POSITION_CLASSES');

    SNACKBAR_COLORS = $injector.get('SNACKBAR_COLORS');

    snackbar = $injector.get('snackbarService');
  }));

  it('should exist', function() {
    expect(snackbar).to.not.be.undefined;
  });

  describe('init', function() {
    it('should get the correct template', function() {
      expect(mockTemplateCache.get).to.have.been.calledWith('snackbar.html');
    });

    it('should create a new scope', function() {
      expect(mockRootScope.$new).to.have.been.called;
    });

    it('should find the body from the document', function() {
      expect(mockDocument.find).to.have.been.calledWith('body');
    });
  });

  describe('success()', function() {
    var
      message = 'success!';

    beforeEach(function() {
      snackbar.success(message);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    it('should default color to green', function() {
      expect(mockScope.styles.wrapper['background-color']).to.equal(SNACKBAR_COLORS.SUCCESS);
    });

  });

  describe('error()', function() {
    var
      message = 'error!';

    beforeEach(function() {
      snackbar.error(message);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    it('should default color to red', function() {
      expect(mockScope.styles.wrapper['background-color']).to.equal(SNACKBAR_COLORS.ERROR);
    });
  });

  describe('notice()', function() {
    var
      message = 'foobar!';

    beforeEach(function() {
      snackbar.notice(message);
    });

    it('should compile the template with the correct scope', function() {
      expect(mockCompile).to.have.been.called;
      expect(compileStub).to.have.been.calledWith(mockScope);
    });

    it('should timeout the snackbar to pop out after 4 seconds', function() {
      expect(mockTimeout.getCall(0).args[1]).to.equal(4000);
    });

    it('should set the message on the scope', function() {
      expect(mockScope.message).to.equal(message);
    });

    describe('styles', function() {
      it('should set the styles on the scope', function() {
        expect(mockScope.styles).to.not.be.undefined;
      });

      it('should set the position on the scope', function() {
        expect(mockScope.position).to.not.be.undefined;
      });

      it('should default the position to bottom left', function() {
        expect(mockScope.position).to.equal(POSITION_CLASSES.BOTTOM_LEFT);
      });

      it('should default color to our dark gray', function() {
        expect(mockScope.styles.wrapper['background-color']).to.equal(SNACKBAR_COLORS.DEFAULT);
      });
    });

  });

});