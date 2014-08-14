(function(angular) {
  /**
  * mOxie provides a polyfill for doing XHR and File uploads that is cross-browser (read IE9 and below) compatible
  * https://github.com/moxiecode/moxie/wiki/API
  */


  var
    dependencies = [],
    moxieDefinition,
    fileInputDefinition,
    fileDropDefinition,
    formDataDefinition,
    xhrDefinition;

  moxieDefinition = [
    '$window',
    moxie
  ];

  fileInputDefinition = [
    'moxie',
    fileInput
  ];

  fileDropDefinition = [
    'moxie',
    fileDrop
  ];

  formDataDefinition = [
    'moxie',
    formData
  ];

  xhrDefinition = [
    'moxie',
    xhr
  ];

  angular.module('pc.ThirdParty.Moxie', dependencies)
    .factory('moxie', moxieDefinition)
    .factory('FileInput', fileInputDefinition)
    .factory('FileDrop', fileDropDefinition)
    .factory('FormData', formDataDefinition)
    .factory('Xhr', xhrDefinition);

  function moxie($window) {
    $window.mOxie.Env.swf_url = './Moxie.swf';
    $window.mOxie.Env.xap_url = './Moxie.xap';

    return $window.mOxie;
  }

  function fileInput(moxie) { return moxie.FileInput; }
  function fileDrop(moxie) { return moxie.FileDrop; }
  function formData(moxie) { return moxie.FormData; }
  function xhr(moxie) { return moxie.XMLHttpRequest; }

})(angular);