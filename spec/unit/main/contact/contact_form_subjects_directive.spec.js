describe('pcContactSubjects directive:', function() {

  var
    scope,
    element;

  beforeEach(module('pc.ContactForm'));

  beforeEach(inject(function($rootScope, $compile, $injector) {
    scope = $rootScope.$new();
    scope.fields = {
      subject: ''
    };

    element = angular.element('<div pc-contact-subjects ><span></span></div>');

    $compile(element)(scope);

    scope.$digest();
  }));

  it('should exist', function() {
    expect(element).to.not.be.undefined;
  });

  describe('onParentSelect()', function() {
    it('should set the subSubjectOptions', function() {
      scope.fields.subject = 'Partnerships';

      scope.$digest();

      expect(angular.isArray(scope.subSubjectOptions)).to.be.true;
    });

    it('should set the text of the first child element', function() {
      scope.fields.subject = 'Partnerships';

      scope.$digest();

      expect(element.children().text()).to.be.ok;
    });

    it('should remove the disabled attribute', function() {
      scope.fields.subject = 'Partnerships';

      scope.$digest();

      expect(element.attr('disabled')).to.be.undefined;
    });
  });

});