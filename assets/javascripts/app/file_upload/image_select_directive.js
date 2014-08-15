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
        input,
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

      input = new FileInput(settings);
      input.bind('change', onChange);
      input.init();

      reader = new FileReader();
      reader.bind('loadend', onLoadEnd);

      function onChange(e) {
        if (e.target.files.length) {
          file = e.target.files[0];
          reader.readAsDataURL(file);
        }
      }

      function onLoadEnd() {
        scope.$emit(FILE_EVENTS.SELECTED, file, reader.result);
      }
    }

  }

})(angular);