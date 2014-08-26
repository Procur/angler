describe('supplierService', function() {
  var
    supplier,
    mockSupplier;

  beforeEach(module('pc.BuyerSupplier'));

  beforeEach(inject(function($injector){
    var
      window = $injector.get('$window');

    mockSupplier = { foo: 'bar' };

    window.pc = {
      localData: {
        supplier: mockSupplier
      }
    };
    supplier = $injector.get('supplierService');
  }));

  it('should exist', function() {
    expect(supplier).to.not.be.undefined;
  });

  describe('get()', function() {
    it('should get the property from the supplier object', function() {
      expect(supplier.get('foo')).to.equal(mockSupplier.foo);
    });
  });

  describe('set()', function() {
    it('should set the property on the supplier object', function() {
      expect(supplier.get('baz')).to.be.undefined;

      supplier.set('baz', true);

      expect(supplier.get('baz')).to.be.true;
    });
  });

  describe('setAll()', function() {
    it('should set all proeprties on the supplier object', function() {
      expect(supplier.get('hello')).to.be.undefined;
      expect(supplier.get('foo')).to.equal(mockSupplier.foo);

      supplier.setAll({ hello: 'world', foo: 'oof' });

      expect(supplier.get('hello')).to.equal('world');
      expect(supplier.get('foo')).to.equal('oof');
    });
  });
});