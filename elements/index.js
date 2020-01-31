function createElements (lib, applib, utils) {
  'use strict';

  require('./positionreadercreator')(lib, applib, utils);
  require('./positionwatchercreator')(lib, applib, utils);
}

module.exports = createElements;
