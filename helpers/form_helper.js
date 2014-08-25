module.exports = formHelper;

function formHelper(req, res, next) {
  var
    fileData,
    formData = {};

  req.pipe(req.busboy);
  req.busboy.on('field', onField);
  req.busboy.on('file', onFile);
  req.busboy.on('finish', onFinish);

  function onField(fieldName, val) {
    try {
      formData[fieldName] = JSON.parse(val);
    }
    catch(e) {
      formData[fieldName] = val;
    }
  }

  function onFile(fieldName, file) {
    file.on('data', extractFile);

    function extractFile(data) {
      fileData = data;
    }
  }

  function onFinish() {
    req.formData = formData;
    req.fileData = fileData;
    next();
  }
}