describe('pcImageSelect', function() {

  var
    scope,
    imageElement,
    mockFileInput,
    mockFileInputObject,
    mockFileInputSettings,
    mockFileReader,
    mockFileReaderObject;

  beforeEach(module('pc.Templates'));
  beforeEach(module('pc.FileUpload'));

  beforeEach(module(function($provide) {
    mockFileInputObject = {
      bind: sinon.spy(),
      init: sinon.spy()
    };

    mockFileInputSettings = undefined;

    mockFileInput = function(settings) {
      mockFileInputSettings = settings;

      this.bind = mockFileInputObject.bind;
      this.init = mockFileInputObject.init;
    };

    mockFileReaderObject = {
      bind: sinon.spy(),
      readAsDataURL: sinon.spy()
    };

    mockFileReader = function() {
      this.bind = mockFileReaderObject.bind;
      this.readAsDataURL = mockFileReaderObject.readAsDataURL;
    };

    $provide.value('FileInput', mockFileInput);
    $provide.value('FileReader', mockFileReader);
  }));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    imageElement = angular.element('<div pc-image-select ></div>');

    $compile(imageElement)(scope);

    scope.$digest();
  }));

  it('should exist', function() {
    expect(imageElement).to.not.be.undefined;
  });

  describe('template', function() {

  });

  describe('linker', function() {
    var
      localScope;

    beforeEach(function() {
      localScope = imageElement.isolateScope();
    });

    it('should create the FileInput object tailored to images', function() {
      expect(mockFileInputSettings.browse_button).to.equal(imageElement[0]);
      expect(mockFileInputSettings.container).to.equal(imageElement.parent()[0]);
      expect(mockFileInputSettings.accept[0].title).to.equal('Image files');
      expect(mockFileInputSettings.accept[0].extensions).to.equal('jpg,jpeg,svg,png');
      expect(mockFileInputSettings.multiple).to.equal(false);
    });

    it('should bind to the change event on the file input object', function() {
      expect(mockFileInputObject.bind).to.have.been.calledWith('change');
    });

    it('should init the file input object', function() {
      expect(mockFileInputObject.init).to.have.been.called;
    });

    it('should bind to the loadend event on the file reader object', function() {
      expect(mockFileReaderObject.bind).to.have.been.calledWith('loadend');
    });
  });

});