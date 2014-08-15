(function(angular) {

  var
    defintitions;

  defintitions = [
    '$document',
    'FileInput',
    'FileReader',
    'FILE_EVENTS',
    pcImageUpload
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageUpload', defintitions);

  function pcImageUpload($document, FileInput, FileReader, FILE_EVENTS) {
    var
      file;

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {

      }
    };

    function link(scope, elem, attrs) {
      var
        uploader,
        reader,
        settings;

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

      uploader = new FileInput(settings);
      uploader.bind('change', onChange);
      uploader.init();

      reader = new FileReader();
      reader.bind('loadend', onLoadEnd);

      function onChange(e) {
        if (!e.target.files.length) {
          return false;
        }

        file = e.target.files[0];
        reader.readAsDataURL(file);
        return true;
      }

      function onLoadEnd() {
        scope.$emit(FILE_EVENTS.SELECTED, file, reader.result);
      }
    }

  }

})(angular);