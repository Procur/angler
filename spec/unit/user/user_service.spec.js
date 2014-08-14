describe('userService', function() {
  var
    user,
    mockUserData,
    mockWindow;

  beforeEach(module('pc.User'));

  beforeEach(module(function($provide) {
    mockUserData = {
      foo: 'bar',
      activeMode: 'buyer'
    };

    mockWindow = {
      pc: {
        localData: {
          user: mockUserData
        }
      }
    };

    $provide.value('$window', mockWindow);
  }));

  beforeEach(inject(function($injector){
    user = $injector.get('userService');
  }));

  it('should exist', function() {
    expect(user).to.not.be.undefined;
  });

  it('should be the user data', function() {
    expect(user).to.equal(mockUserData);
  });

  it('should set the inactive mode', function() {
    expect(user.inactiveMode).to.equal('supplier');
  });


  describe('toggleActiveMode()', function() {
    it('should add the toggleActiveMode function', function() {
      expect(typeof user.toggleActiveMode).to.equal('function');
    });

    it('should switch the active and inactive modes', function() {
      expect(user.activeMode).to.equal('buyer');
      expect(user.inactiveMode).to.equal('supplier');

      user.toggleActiveMode();

      expect(user.activeMode).to.equal('supplier');
      expect(user.inactiveMode).to.equal('buyer');
    });
  });

});