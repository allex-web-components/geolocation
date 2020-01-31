(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createElements (lib, applib, utils) {
  'use strict';

  require('./positionreadercreator')(lib, applib, utils);
  require('./positionwatchercreator')(lib, applib, utils);
}

module.exports = createElements;

},{"./positionreadercreator":2,"./positionwatchercreator":3}],2:[function(require,module,exports){
function createPositionReader (lib, applib, utils) {
  'use strict';

  var q = lib.q,
    BasicElement = applib.BasicElement;

  function PositionReader (id, options) {
    BasicElement.call(this, id, options);
  }
  lib.inherit(PositionReader, BasicElement);
  PositionReader.prototype.readPosition = function () {
    var d, ret;
    if (!navigator.geolocation) {
      return q.reject(new lib.Error('GEOLOCATION_NOT_SUPPORTED', 'Geolocation is not supported by this browser'));
    }
    d = q.defer();
    ret = d.promise;
    navigator.geolocation.getCurrentPosition(positionResolver.bind(null, d), errorHandler.bind(null, d));
    return ret;
  };

  function positionResolver (defer, position) {
    defer.resolve(utils.plainPosition(position));
    defer = null;
  }

  function errorHandler (defer, err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        defer.reject(new lib.Error('GEOLOCATION_REQUEST_DENIED', 'Request for geolocation denied'));
        break;
      case err.POSITION_UNAVAILABLE:
        defer.reject(new lib.Error('GEOLOCATION_POSITION_UNAVAILABLE', 'The geolocation information is unavailable'));
        break;
      case err.TIMEOUT:
        defer.reject(new lib.Error('GEOLOCATION_TIMEOUT', 'The request to read the geolocation timed out'));
        break;
      default: /*err.UNKNOWN_ERROR*/
        defer.reject(new lib.Error('GEOLOCATION_UNKNOWN_ERROR', 'Geolocation encountered an unknown error'+(err ? (': '+err.toString()) : '')));
        break;
    }
    defer = null;
  }

  applib.registerElementType('PositionReader', PositionReader);
}

module.exports = createPositionReader;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function createLib (execlib) {
  'use strict';
  var lR = execlib.execSuite.libRegistry,
    applib = lR.get('allex_applib'),
    utils = require('./utils')(execlib.lib);

  require('./elements')(execlib.lib, applib, utils);
})(ALLEX);

},{"./elements":1,"./utils":5}],5:[function(require,module,exports){
function createUtils (lib) {
  'use strict';

  function plainPosition (position) {
    return {
      coords: lib.pick(
        position.coords,
        [
          'accuracy',
          'altitude',
          'altitudeAccuracy',
          'heading',
          'latitude',
          'longitude',
          'speed'
        ]
      ),
      timestamp: position.timestamp
    };
  }

  return {
    plainPosition: plainPosition
  };
}

module.exports = createUtils;

},{}]},{},[4]);
