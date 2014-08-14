(function(angular) {

  var
    defintitions;

  defintitions = [
    '$document',
    'moxie',
    pcImageUpload
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageUpload', defintitions);

  function pcImageUpload($document, moxie) {
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
        uploader,
        settings;

      settings = {
        browse_button: elem[0],
        container: $document[0].querySelector('body'),
        accept: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,svg,png'
          }
        ],
        multiple: false
      };

      uploader = new moxie.FileInput(settings);

      uploader.bind('change', onChange);

      uploader.init();

      function onChange(e) {
        if (!e.target.files.length) {
          return false;
        }

        file = e.target.files[0];

        console.log(file);

        return true;
      }
    }

  }

})(angular);