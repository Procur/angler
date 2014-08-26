describe('ajaxService', function() {

  var
    ajax,
    mockXhr,
    mockXhrObject,
    mockFormData,
    mockFormDataObject,
    mockSnackbar,
    XHR_METHOD,
    token = 'apitoken',
    result;

  beforeEach(module('pc.Ajax'));

  beforeEach(module(function($provide) {
    mockXhrObject = {
      bind: sinon.spy(),
      open: sinon.spy(),
      send: sinon.spy(),
      setRequestHeader: sinon.spy()
    };

    mockXhr = function() {
      this.bind = mockXhrObject.bind;
      this.open = mockXhrObject.open;
      this.send = mockXhrObject.send;
      this.setRequestHeader = mockXhrObject.setRequestHeader;
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
      result = ajax.get(token, 'foo/bar');
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

    it('should set the request header', function() {
      expect(mockXhrObject.setRequestHeader).to.have.been.calledWith(token);
    });
  });

  describe('post()', function() {
    beforeEach(function() {
      result = ajax.post(token, 'foo/baz', { foo: 'baz' });
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

    it('should set the request header', function() {
      expect(mockXhrObject.setRequestHeader).to.have.been.calledWith(token);
    });
  });

  describe('put()', function() {
    beforeEach(function() {
      result = ajax.put(token, 'baz/foo', { hello: 'world' });
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

    it('should set the request header', function() {
      expect(mockXhrObject.setRequestHeader).to.have.been.calledWith(token);
    });
  });

  describe('destroy()', function() {
    beforeEach(function() {
      result = ajax.destroy(token, 'foobar');
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

    it('should set the request header', function() {
      expect(mockXhrObject.setRequestHeader).to.have.been.calledWith(token);
    });
  });

  describe('handleError()', function() {
    it('should create an error snackbar', function() {
      ajax.handleError('foobar');

      expect(mockSnackbar.error).to.have.been.calledWith('foobar');
    });
  });

});