describe('user', function() {

  var
    User,
    mockApi,
    mockPost,
    proxyquire = require('proxyquire'),
    user;

  beforeEach(function() {
    mockPost = sinon.stub();
    mockPost.returns('success!');

    mockApi = function() {
      this.post = mockPost;
      this.hosts = {
        v1a: 'baz'
      };
    };

    User = proxyquire('../../../lib/api/user', {
      './client': mockApi
    });

    user = {
      firstName: 'c',
      lastName: 'h',
      email: 'foo',
      password: 'bar',
      passwordConfirmation: 'bar'
    };
  });

  it('should exist', function() {
    expect(User).to.not.be.undefined;
  });

  describe('create()', function() {
    it('should confirm passwords are the same', function() {
      user.password = 'baz';

      var res = User.create(user);

      expect(res).to.be.rejected;
    });

    it('should sign up the user if the passwords are the same', function() {
      var res = User.create(user);

      expect(res).to.eventually.equal('success!');
    });
  });

});