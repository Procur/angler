describe('client', function() {

  var
    proxyquire = require('proxyquire'),
    Promise = require('bluebird'),
    Client,
    mockRequest,
    requestOptions,
    mockErr = null,
    mockRes = { statusCode: 200 },
    mockBody = '"foobar"';

  beforeEach(function() {

    mockRequest = function(options, cb) {
      requestOptions = options;
      cb(mockErr, mockRes, mockBody);
    };

    Client = proxyquire('../../../lib/api/client', {
      'request': mockRequest
    });
  });

  it('should exist', function() {
    expect(Client).to.not.be.undefined;
  });

  describe('constructor', function() {
    it('should store the apitoken', function() {
      var api = new Client({ apitoken: 'foobar' });

      expect(api.apitoken).to.equal('foobar');
    });
  });

  describe('post()', function() {
    it('should make a post request', function() {
      var api = new Client();
      api.req = sinon.spy();
      api.post('foo/bar', {foo: 'bar'});

      expect(api.req.calledWith('POST', 'foo/bar', {foo: 'bar'})).to.be.true;
    });
  });

  describe('get()', function() {
    it('should make a get request', function() {
      var api = new Client();
      api.req = sinon.spy();
      api.get('foo/bar');

      expect(api.req.calledWith('GET', 'foo/bar')).to.be.true;
    });
  });

  describe('put()', function() {
    it('should make a put request', function() {
      var api = new Client();
      api.req = sinon.spy();
      api.put('foo/bar', {foo: 'bar'});

      expect(api.req.calledWith('PUT', 'foo/bar', {foo: 'bar'})).to.be.true;
    });
  });

  describe('del()', function() {
    it('should make a del request', function() {
      var api = new Client();
      api.req = sinon.spy();
      api.del('foo/bar');

      expect(api.req.calledWith('DELETE', 'foo/bar')).to.be.true;
    });
  });

  describe('req()', function() {
    var
      api;

    beforeEach(function() {
      api = new Client({apitoken: '1234'});
    });

    it('should return a promise', function() {
      expect(api.req('GET', 'foo/bar') instanceof Promise).to.be.true;
    });

    it('should set the correct request options', function() {
      api.req('POST', 'foo/bar', { foo: 'bar' });

      expect(requestOptions.method).to.equal('POST');
      expect(requestOptions.url).to.equal('foo/bar');
      expect(requestOptions.headers.apitoken).to.equal('1234');
      expect(requestOptions.body).to.equal('{"foo":"bar"}');
    });

    it('should resolve the body on success', function() {
      var res = api.req('GET', 'foo/bar');

      expect(res).to.become('foobar');
    });

    it('should reject the body on failure', function() {
      mockRes.statusCode = 500;
      mockBody = '"error"';
      var res = api.req('GET', 'foo/bar');

      expect(res).to.be.rejected;
    });
  });

  describe('err()', function() {
    it('should return a function', function() {
      expect(typeof Client.err()).to.equal('function');
    });

    it('should send an error response', function() {
      var res = {
        header: sinon.spy(),
        send: sinon.spy()
      };

      Client.err(res)('error');

      expect(res.send.calledWith(500, 'error')).to.be.true;
    });
  });

  describe('tryParseJson()', function() {
    it('should parse valid JSON', function() {
      expect(Client.tryJsonParse('"foobar"')).to.equal('foobar');
    });

    it('should catch errors with invalid JSON', function() {
      expect(Client.tryJsonParse({ foo: 'bar' })).to.be.false;
    });
  });

});