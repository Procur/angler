(function(angular) {

  var
    defintitions;

  defintitions = [
    '$document',
    'FileInput',
    'FileReader',
    'FILE_EVENTS',
    pcImageSelect
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageSelect', defintitions);

  function pcImageSelect($document, FileInput, FileReader, FILE_EVENTS) {
    var
      file;

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {}
    };

    function link(scope, elem, attrs) {
      var
        acceptedFileTypes = ['jpg', 'jpeg', 'svg', 'png'],
        input,
        reader,
        settings,
        validFileSize,
        validFileType,
        validImage,
        fileType;

      settings = {
        browse_button: elem[0],
        container: elem.parent()[0],
        accept: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,svg,png'
          }
        ],
        multiple: false
      };

      input = new FileInput(settings);
      input.bind('change', onChange);
      input.init();

      reader = new FileReader();
      reader.bind('loadend', onLoadEnd);

      function onChange(e) {
        validFileType = isFileImage(e);
        validFileSize = isFileSizeValid(e);
        if (validFileType && validFileSize && e.target.files.length) {
          file = e.target.files[0];
          reader.readAsDataURL(file);
        }
        else {
          if (!validFileSize && !validFileType) {
            scope.$emit(FILE_EVENTS.INVALID_TYPE_SIZE);
          }
          else if (!validFileSize) {
            scope.$emit(FILE_EVENTS.INVALID_SIZE);
          }
          else if (!validFileType) {
            scope.$emit(FILE_EVENTS.INVALID_TYPE);
          }
        }
      }

      function isFileImage(e) {
        validImage = false;
        fileType = e.target.files[0].type.toString();

        acceptedFileTypes.forEach(function(type) {
          if (fileType.indexOf(type) !== -1) {
            validImage = true;
          }
        });
        
        return validImage;
      }

      function isFileSizeValid(e) {
        return e.target.files[0].size <= 2000000 ? true : false;
      }

      function onLoadEnd() {
        scope.$emit(FILE_EVENTS.SELECTED, file, reader.result);
      }

    }

  }

})(angular);