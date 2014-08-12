describe('userService', function() {
  var
    user,
    mockUserData,
    deferredResult,
    mockAjax;

  beforeEach(module('pc.User'));

  beforeEach(module(function($provide) {
    mockUserData = {
      foo: 'bar',
      activeMode: 'buyer'
    };

    deferredResult = undefined;

    mockAjax = {
      get: function() {
        return {
          then: function(cb) {
            deferredResult = cb(mockUserData);
          }
        };
      }
    };

    $provide.value('ajaxService', mockAjax);
  }));

  beforeEach(inject(function($injector){
    user = $injector.get('userService');
  }));

  it('should exist', function() {
    expect(user).to.not.be.undefined;
  });

  describe('init', function() {
    it('should return a promise the resolves to company data', function() {
      expect(deferredResult).to.not.equal(mockUserData);

      user();

      expect(deferredResult).to.equal(mockUserData);
    });

    it('should set the inactive mode', function() {
      expect(deferredResult).to.be.undefined;

      user();

      expect(deferredResult.inactiveMode).to.equal('supplier');
    });

    it('should add the toggleActiveMode function', function() {
      expect(deferredResult).to.be.undefined;

      user();

      expect(typeof deferredResult.toggleActiveMode).to.equal('function');
    });
  });

  describe('toggleActiveMode()', function() {
    beforeEach(function() {
      user();
    });

    it('should switch the active and inactive modes', function() {
      expect(deferredResult.activeMode).to.equal('buyer');
      expect(deferredResult.inactiveMode).to.equal('supplier');

      deferredResult.toggleActiveMode();

      expect(deferredResult.activeMode).to.equal('supplier');
      expect(deferredResult.inactiveMode).to.equal('buyer');
    });
  });
});