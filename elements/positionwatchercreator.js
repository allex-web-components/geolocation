function createPositionWatcher (lib, applib, utils) {
  'use strict';

  var BasicElement = applib.BasicElement;

  function PositionWatcher (id, options) {
    BasicElement.call(this, id, options);
  }
  lib.inherit(PositionWatcher, BasicElement);

  applib.registerElementType('PositionWatcher', PositionWatcher);
}

module.exports = createPositionWatcher;
