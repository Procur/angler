(function(angular) {

  var
    defintitions;

  defintitions = [
    '$document',
    'FileDrop',
    'FileReader',
    'FILE_EVENTS',
    pcImageDrop
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageDrop', defintitions);

  function pcImageDrop($document, FileDrop, FileReader, FILE_EVENTS) {
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
        drop,
        reader,
        settings;

      settings = {
        drop_zone: elem[0],
        accept: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,svg,png'
          }
        ]
      };

      drop = new FileDrop(settings);
      drop.bind('drop', onDrop);
      drop.init();

      reader = new FileReader();
      reader.bind('loadend', onLoadEnd);

      function onDrop(e) {
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