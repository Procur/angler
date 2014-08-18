describe('pcImageDrop', function() {

  var
    scope,
    imageElement,
    mockFileDrop,
    mockFileDropObject,
    mockFileDropSettings,
    mockFileReader,
    mockFileReaderObject;

  beforeEach(module('pc.Templates'));
  beforeEach(module('pc.FileUpload'));

  beforeEach(module(function($provide) {
    mockFileDropObject = {
      bind: sinon.spy(),
      init: sinon.spy()
    };

    mockFileDropSettings = undefined;

    mockFileDrop = function(settings) {
      mockFileDropSettings = settings;

      this.bind = mockFileDropObject.bind;
      this.init = mockFileDropObject.init;
    };

    mockFileReaderObject = {
      bind: sinon.spy(),
      readAsDataURL: sinon.spy()
    };

    mockFileReader = function() {
      this.bind = mockFileReaderObject.bind;
      this.readAsDataURL = mockFileReaderObject.readAsDataURL;
    };

    $provide.value('FileDrop', mockFileDrop);
    $provide.value('FileReader', mockFileReader);
  }));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    imageElement = angular.element('<div pc-image-drop ></div>');

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
      expect(mockFileDropSettings.drop_zone).to.equal(imageElement[0]);
      expect(mockFileDropSettings.accept[0].title).to.equal('Image files');
      expect(mockFileDropSettings.accept[0].extensions).to.equal('jpg,jpeg,svg,png');
    });

    it('should bind to the drop event on the file input object', function() {
      expect(mockFileDropObject.bind).to.have.been.calledWith('drop');
    });

    it('should init the file input object', function() {
      expect(mockFileDropObject.init).to.have.been.called;
    });

    it('should bind to the loadend event on the file reader object', function() {
      expect(mockFileReaderObject.bind).to.have.been.calledWith('loadend');
    });
  });

});