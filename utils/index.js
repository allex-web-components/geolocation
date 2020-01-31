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
