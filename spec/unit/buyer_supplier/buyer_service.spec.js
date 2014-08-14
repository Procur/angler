describe('buyerService', function() {
  var
    buyer,
    mockBuyerData,
    mockWindow;

  beforeEach(module('pc.BuyerSupplier'));

  beforeEach(module(function($provide) {
    mockBuyerData = {
      foo: 'bar'
    };

    mockWindow = {
      pc: {
        localData: {
          buyer: mockBuyerData
        }
      }
    };

    $provide.value('$window', mockWindow);
  }));

  beforeEach(inject(function($injector){
    buyer = $injector.get('buyerService');
  }));

  it('should exist', function() {
    expect(buyer).to.not.be.undefined;
  });

  it('should be the buyer data', function() {
    expect(buyer).to.equal(mockBuyerData);
  });

});