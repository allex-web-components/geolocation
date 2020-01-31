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
