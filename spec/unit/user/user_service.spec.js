describe('userService', function() {
  var
    user,
    mockUserData,
    mockCompany;

  beforeEach(module('pc.User'));

  beforeEach(module(function($provide) {
    mockCompany = {
      isBoth: sinon.stub()
    };

    $provide.value('companyService', mockCompany);
  }));

  beforeEach(inject(function($injector){
    var
      window = $injector.get('$window');

    mockUserData = {
      activeMode: 'supplier',
      baz: false
    };

    window.pc = {
      localData: {
        user: mockUserData
      }
    };
    user = $injector.get('userService');
  }));

  it('should exist', function() {
    expect(user).to.not.be.undefined;
  });

  describe('get()', function() {
    it('should get the property from the user object', function() {
      expect(user.get('foo')).to.equal(mockUserData.foo);
    });
  });

  describe('set()', function() {
    it('should set the property on the user object', function() {
      expect(user.get('baz')).to.be.false;

      user.set('baz', true);

      expect(user.get('baz')).to.be.true;
    });

    it('should not set the active or inactive mode properties', function() {
      expect(user.get('activeMode')).to.be.equal('supplier');
      expect(user.get('inactiveMode')).to.not.be.ok;

      user.set('activeMode', 'buyer');
      user.set('inactiveMode', 'supplier');

      expect(user.get('activeMode')).to.not.equal('buyer');
      expect(user.get('inactiveMode')).to.not.equal('supplier');
    });
  });

  describe('setAll()', function() {
    it('should set all proeprties on the user object', function() {
      expect(user.get('hello')).to.be.undefined;
      expect(user.get('foo')).to.equal(mockUserData.foo);

      user.setAll({ hello: 'world', foo: 'oof' });

      expect(user.get('hello')).to.equal('world');
      expect(user.get('foo')).to.equal('oof');
    });
  });

  describe('setActiveMode()', function() {
    it('should set the active mode of the user', function() {
      expect(user.get('activeMode')).to.not.equal('buyer');

      user.setActiveMode('buyer');

      expect(user.get('activeMode')).to.equal('buyer');
    });
  });

  describe('toggleActiveMode()', function() {
    it('should not toggle the active mode if the user does not have an inactive mode', function() {
      expect(user.get('inactiveMode')).to.not.be.ok;
      expect(user.get('activeMode')).to.equal('supplier');

      user.toggleActiveMode();

      expect(user.get('inactiveMode')).to.not.be.ok;
      expect(user.get('activeMode')).to.equal('supplier');
    });

    it('should toggle the active mode', function() {
      mockCompany.isBoth.returns(true);
      user.setActiveMode('buyer');

      expect(user.get('inactiveMode')).to.equal('supplier');
      expect(user.get('activeMode')).to.equal('buyer');

      user.toggleActiveMode();

      expect(user.get('inactiveMode')).to.equal('buyer');
      expect(user.get('activeMode')).to.equal('supplier');
    });
  });

  describe('isBuyerMode()', function() {
    it('should return true if the active mode is buyer', function() {
      user.setActiveMode('buyer');
      expect(user.isBuyerMode()).to.be.true;
    });

    it('should return false if the active mode is not buyer', function() {
      user.setActiveMode('supplier');
      expect(user.isBuyerMode()).to.be.false;
    });
  });

  describe('isSupplierMode()', function() {
    it('should return true if the active mode is supplier', function() {
      user.setActiveMode('supplier');
      expect(user.isSupplierMode()).to.be.true;
    });

    it('should return false if the active mode is not supplier', function() {
      user.setActiveMode('buyer');
      expect(user.isSupplierMode()).to.be.false;
    });
  });
});