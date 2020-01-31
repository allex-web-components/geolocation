(function createLib (execlib) {
  'use strict';
  var lR = execlib.execSuite.libRegistry,
    applib = lR.get('allex_applib'),
    utils = require('./utils')(execlib.lib);

  require('./elements')(execlib.lib, applib, utils);
})(ALLEX);
