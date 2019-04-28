<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# emit-mapper

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Azure Pipelines Build Status][azure-pipelines-image]][azure-pipelines-url] [![Travis Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Re-emit events while mapping them to new names.

## Usage

```js
var src = new EventEmitter();
var dest = new EventEmitter();
var events = {
  before: 'preload:before',
  success: 'preload:success',
  failure: 'preload:failure',
};

var cleanup = emitMapper(src, dest, events);

dest.on('preload:before', console.log);
dest.on('preload:success', console.log);
dest.on('preload:failure', console.log);

src.emit('before', 'some value');
src.emit('success', 1, 2, 3);
src.emit('failure', 'moduleName', new Error('some error'));

// No more events will be re-emitted after cleanup
cleanup();

src.emit('before', 'not re-emitted');
```

## API

### `emitMapper(source, destination, eventMapping)`

Takes a `source` EventEmitter, a `destination` EventEmitter, and an `eventMapping` object that maps `source` events to `destination` events. Whenever an event from the `eventMapping` object is emitted on `source`, a new event will be emitted on `destination` with the mapped named but containing all the same arguments.

Returns a cleanup method to remove all handlers registered for re-emitting.

## Prior art

This module is heavily inspired by [re-emitter][re-emitter] but the ability to map event names to new names was needed. Also, this module supports back to node 0.10 while `re-emitter` only supports node LTS versions.

## License

MIT

[re-emitter]: https://github.com/feross/re-emitter

[downloads-image]: http://img.shields.io/npm/dm/emit-mapper.svg
[npm-url]: https://www.npmjs.com/package/emit-mapper
[npm-image]: http://img.shields.io/npm/v/emit-mapper.svg

[azure-pipelines-url]: https://dev.azure.com/gulpjs/gulp/_build/latest?definitionId=4&branchName=master
[azure-pipelines-image]: https://dev.azure.com/gulpjs/gulp/_apis/build/status/emit-mapper?branchName=master

[travis-url]: https://travis-ci.org/gulpjs/emit-mapper
[travis-image]: http://img.shields.io/travis/gulpjs/emit-mapper.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/emit-mapper
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/emit-mapper.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/emit-mapper
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/emit-mapper/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.svg
