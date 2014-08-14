describe('supplierService', function() {
  var
    supplier,
    mockSupplierData,
    mockWindow;

  beforeEach(module('pc.BuyerSupplier'));

  beforeEach(module(function($provide) {
    mockSupplierData = {
      foo: 'bar'
    };

    mockWindow = {
      pc: {
        localData: {
          supplier: mockSupplierData
        }
      }
    };

    $provide.value('$window', mockWindow);
  }));

  beforeEach(inject(function($injector){
    supplier = $injector.get('supplierService');
  }));

  it('should exist', function() {
    expect(supplier).to.not.be.undefined;
  });

  it('should be the supplier data', function() {
    expect(supplier).to.equal(mockSupplierData);
  });

});