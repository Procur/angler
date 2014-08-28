describe('session', function() {

  var
    Session,
    mockApi,
    mockPost,
    proxyquire = require('proxyquire');

  beforeEach(function() {
    mockPost = sinon.spy();

    mockApi = function() {
      this.post = mockPost;
      this.hosts = {
        v1a: 'baz'
      };
    };

    Session = proxyquire('../../../lib/api/session', {
      './client': mockApi
    });
  });

  it('should exist', function() {
    expect(Session).to.not.be.undefined;
  });

  describe('create()', function() {
    it('should post to the correct api', function() {
      var credentials = { email: 'foo', password: 'bar' };
      Session.create(credentials);

      expect(mockPost.calledWith('baz/login', credentials)).to.be.true;
    });
  });

});