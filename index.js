'use strict';

var isPlainObject = require('is-plain-object');

function emitMapper(src, dest, events) {
  if (typeof src !== 'object' || typeof src.on !== 'function') {
    throw new Error('`source` must be an EventEmitter');
  }

  if (typeof dest !== 'object' || typeof dest.emit !== 'function') {
    throw new Error('`destination` must be an EventEmitter');
  }

  if (!isPlainObject(events)) {
    throw new Error('`eventMapping` must be provided');
  }

  var unlisteners = Object.keys(events).map(createReemit);

  function createReemit(originalEvent) {
    var newEvent = events[originalEvent];

    function listener() {
      var args = Array.prototype.slice.call(arguments);
      var argsWithEventName = [newEvent].concat(args);
      dest.emit.apply(dest, argsWithEventName);
    }

    function unlistener() {
      src.removeListener(originalEvent, listener);
    }

    src.on(originalEvent, listener);

    return unlistener;
  }

  function cleanup() {
    unlisteners.forEach(function(unlisten) {
      unlisten();
    });
  }

  return cleanup;
}

module.exports = emitMapper;
