describe('formHelper', function() {
  var
    mockReq,
    mockRes,
    mockNext,
    formHelper,
    mockFormData = {};

  beforeEach(function() {
    formHelper = require('../../../helpers/form_helper');

    mockReq = {
      pipe: sinon.spy(),
      busboy: {
        on: function(name, callback) {
          if (name === 'field') {
            callback(mockFormData.name, mockFormData.value);
          }
          else if (name === 'file') {
            callback('myFile', { on: function(name, callback) {
              callback('fileData');
            }});
          }
          else {
            callback();
          }
        }
      }
    };

    mockRes = {};

    mockNext = sinon.spy();
  });

  it('should exist', function() {
    expect(formHelper).to.not.be.undefined;
  });

  describe('onField', function() {
    it('should add the field to the form data object on the request', function() {
      mockFormData.name = 'fieldName';
      mockFormData.value = 'fieldValue';

      formHelper(mockReq, mockRes, mockNext);

      expect(mockReq.formData.fieldName).to.equal('fieldValue');
    });

    it('should parse JSON if JSON is provided for a field', function() {
      mockFormData.name = 'fieldName';
      mockFormData.value = '{"fieldValue":"foobar"}';

      formHelper(mockReq, mockRes, mockNext);

      expect(mockReq.formData.fieldName.fieldValue).to.equal('foobar');
    });
  });

  describe('onFile', function() {
    it('should add the file data to the request', function() {
      formHelper(mockReq, mockRes, mockNext);

      expect(mockReq.fileData).to.equal('fileData');
    });
  });

  describe('onFinish', function() {
    beforeEach(function() {
      formHelper(mockReq, mockRes, mockNext);
    });

    it('should add the file data to the request', function() {
      expect(mockReq.fileData).to.not.be.undefined;
    });

    it('should add the form data to the request', function() {
      expect(mockReq.formData).to.not.be.undefined;
    });
  });

});