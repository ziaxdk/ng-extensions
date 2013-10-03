var shell = require('shelljs');

module.exports = {
  getHash: function () {
    var hash = shell.exec('git rev-parse --short HEAD', { silent: true }).output.replace('\n', '');
    return hash;
  }
};
