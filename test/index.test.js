'use strict';

var expect = require('expect');
var EventEmitter = require('events');

var emitMapper = require('../');

describe('emit-mapper', function() {

  it('throws if an EventEmitter is not passed as the source', function(done) {
    expect(function() {
      emitMapper();
    }).toThrow('`source` must be an EventEmitter');

    done();
  });

  it('throws if an EventEmitter is not passed as the destination', function(done) {
    var src = new EventEmitter();

    expect(function() {
      emitMapper(src);
    }).toThrow('`destination` must be an EventEmitter');

    done();
  });

  it('throws if an event mapping object is not passed', function(done) {
    var src = new EventEmitter();
    var dest = new EventEmitter();

    expect(function() {
      emitMapper(src, dest);
    }).toThrow('`eventMapping` must be provided');

    done();
  });

  it('maps events from source to destination based on mappings', function(done) {
    var src = new EventEmitter();
    var dest = new EventEmitter();
    var events = {
      foo: 'bar',
    };

    emitMapper(src, dest, events);

    var spy = expect.createSpy();

    dest.on('bar', spy);

    src.emit('foo');

    expect(spy.calls.length).toEqual(1);

    done();
  });

  it('passes through all arguments', function(done) {
    var src = new EventEmitter();
    var dest = new EventEmitter();
    var events = {
      foo: 'bar',
    };

    emitMapper(src, dest, events);

    var spy = expect.createSpy();

    dest.on('bar', spy);

    src.emit('foo', 1, 2, 3);

    expect(spy.calls.length).toEqual(1);
    expect(spy.calls[0].arguments).toEqual([1, 2, 3]);

    done();
  });

  it('returns a method that cleans up handlers', function(done) {
    var src = new EventEmitter();
    var dest = new EventEmitter();
    var events = {
      foo: 'bar',
    };

    var unlisten = emitMapper(src, dest, events);

    unlisten();

    var spy = expect.createSpy();

    dest.on('bar', spy);

    src.emit('foo');

    expect(spy.calls.length).toEqual(0);

    done();
  });

  it('only re-emits mapped events', function(done) {
    var src = new EventEmitter();
    var dest = new EventEmitter();
    var events = {
      foo: 'bar',
    };

    emitMapper(src, dest, events);

    var spy = expect.createSpy();

    dest.on('bar', spy);

    src.emit('not-mapped');

    expect(spy.calls.length).toEqual(0);

    done();
  });
});
