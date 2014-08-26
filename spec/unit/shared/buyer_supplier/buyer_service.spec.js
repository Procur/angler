describe('buyerService', function() {
  var
    buyer,
    mockBuyerData;

  beforeEach(module('pc.BuyerSupplier'));

  beforeEach(inject(function($injector){
    var
      window = $injector.get('$window');

    mockBuyerData = { foo: 'bar' };

    window.pc = {
      localData: {
        buyer: mockBuyerData
      }
    };
    buyer = $injector.get('buyerService');
  }));

  it('should exist', function() {
    expect(buyer).to.not.be.undefined;
  });

  describe('get()', function() {
    it('should get the property from the buyer object', function() {
      expect(buyer.get('foo')).to.equal(mockBuyerData.foo);
    });
  });

  describe('set()', function() {
    it('should set the property on the buyer object', function() {
      expect(buyer.get('baz')).to.be.undefined;

      buyer.set('baz', true);

      expect(buyer.get('baz')).to.be.true;
    });
  });

  describe('setAll()', function() {
    it('should set all proeprties on the buyer object', function() {
      expect(buyer.get('hello')).to.be.undefined;
      expect(buyer.get('foo')).to.equal(mockBuyerData.foo);

      buyer.setAll({ hello: 'world', foo: 'oof' });

      expect(buyer.get('hello')).to.equal('world');
      expect(buyer.get('foo')).to.equal('oof');
    });
  });
});