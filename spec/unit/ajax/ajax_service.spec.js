describe('ajaxService', function() {

  var
    ajax,
    mockXhr,
    mockXhrObject,
    mockFormData,
    mockFormDataObject,
    mockSnackbar,
    XHR_METHOD,
    result;

  beforeEach(module('pc.Ajax'));

  beforeEach(module(function($provide) {
    mockXhrObject = {
      bind: sinon.spy(),
      open: sinon.spy(),
      send: sinon.spy()
    };

    mockXhr = function() {
      this.bind = mockXhrObject.bind;
      this.open = mockXhrObject.open;
      this.send = mockXhrObject.send;
    };

    mockFormDataObject = {
      append: sinon.spy()
    };

    mockFormData = function() {
      this.append =  mockFormDataObject.append;
    };

    mockSnackbar = {
      error: sinon.spy()
    };

    $provide.value('Xhr', mockXhr);
    $provide.value('FormData', mockFormData);
    $provide.value('snackbarService', mockSnackbar);
  }));

  beforeEach(inject(function($injector){
    result = undefined;

    XHR_METHOD = $injector.get('XHR_METHOD');

    ajax = $injector.get('ajaxService');
  }));

  it('should exist', function() {
    expect(ajax).to.not.be.undefined;
  });

  describe('get()', function() {
    beforeEach(function() {
      result = ajax.get('foo/bar');
    });

    it('should return a promise', function() {
      expect(typeof result.then).to.equal('function');
    });

    it('should bind the xhr event listeners', function() {
      expect(mockXhrObject.bind).to.have.been.calledWith('load');
      expect(mockXhrObject.bind).to.have.been.calledWith('error');
    });

    it('should open the xhr connection', function() {
      expect(mockXhrObject.open).to.have.been.calledWith(XHR_METHOD.GET, 'foo/bar', true);
    });

    it('should send the xhr data', function() {
      expect(mockXhrObject.send).to.have.been.called;
    });
  });

  describe('post()', function() {
    beforeEach(function() {
      result = ajax.post('foo/baz', { foo: 'baz' });
    });

    it('should return a promise', function() {
      expect(typeof result.then).to.equal('function');
    });

    it('should bind the xhr event listeners', function() {
      expect(mockXhrObject.bind).to.have.been.calledWith('load');
      expect(mockXhrObject.bind).to.have.been.calledWith('error');
    });

    it('should add the form data', function() {
      expect(mockFormDataObject.append).to.have.been.calledWith('foo', 'baz');
    });

    it('should open the xhr connection', function() {
      expect(mockXhrObject.open).to.have.been.calledWith(XHR_METHOD.POST, 'foo/baz', true);
    });

    it('should send the xhr data', function() {
      expect(mockXhrObject.send).to.have.been.called;
    });
  });

  describe('put()', function() {
    beforeEach(function() {
      result = ajax.put('baz/foo', { hello: 'world' });
    });

    it('should return a promise', function() {
      expect(typeof result.then).to.equal('function');
    });

    it('should bind the xhr event listeners', function() {
      expect(mockXhrObject.bind).to.have.been.calledWith('load');
      expect(mockXhrObject.bind).to.have.been.calledWith('error');
    });

    it('should add the form data', function() {
      expect(mockFormDataObject.append).to.have.been.calledWith('hello', 'world');
    });

    it('should open the xhr connection', function() {
      expect(mockXhrObject.open).to.have.been.calledWith(XHR_METHOD.PUT, 'baz/foo', true);
    });

    it('should send the xhr data', function() {
      expect(mockXhrObject.send).to.have.been.called;
    });
  });

  describe('destroy()', function() {
    beforeEach(function() {
      result = ajax.destroy('foobar');
    });

    it('should return a promise', function() {
      expect(typeof result.then).to.equal('function');
    });

    it('should bind the xhr event listeners', function() {
      expect(mockXhrObject.bind).to.have.been.calledWith('load');
      expect(mockXhrObject.bind).to.have.been.calledWith('error');
    });

    it('should open the xhr connection', function() {
      expect(mockXhrObject.open).to.have.been.calledWith(XHR_METHOD.DELETE, 'foobar', true);
    });

    it('should send the xhr data', function() {
      expect(mockXhrObject.send).to.have.been.called;
    });
  });

  describe('handleError()', function() {
    it('should create an error snackbar', function() {
      ajax.handleError('foobar');

      expect(mockSnackbar.error).to.have.been.calledWith('foobar');
    });
  });

});