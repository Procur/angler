var
  chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  chaiAsPromised = require('chai-as-promised');

global.expect = chai.expect;
global.sinon = sinon;

chai.use(sinonChai);
chai.use(chaiAsPromised);
