# Event Emitters

Events are quite central to how Node works. Many of the most essential modules and objects (e.g., `process`, http requests and responses) fire events. They are able to do this because they are instances of `EventEmitter`.

`EventEmitter` is a constructor that is attached to the `exports` of the built-in `events` module. Instances of `EventEmitter` have an `addListener` method (and an alias called `on`):

```js
process.on('beforeExit', function() {
    console.log('The process is about to exit.');
});
```

Inside of an event listener `this` refers to the instance of `EventEmitter` that emitted the event.

By default, the number of listeners for any single event is limited to 10 in order to prevent memory leaks. This limit can be changed with the `setMaxListeners` method.

There is also a `once` method that adds a listener and automatically removes it after the first time it is called.

You can make your own objects be instances of `EventEmitter` in all of the ways that are familiar to you. For example:

```js
var events = require('events');
var myEmitter = Object.create(new events.EventEmitter);
```

```js
var events = require('events');
var MyEmitter = function() {
};
MyEmitter.prototype = new events.EventEmitter;
```

Instances of `EventEmitter` have an `emit` method that fires events.

```js
myEmitter.emit('awesomeEvent', 'This event is awesome'); //listeners for 'awesomeEvent' will run and be passed the string 'This event is awesome'
```

## Bonus Exercise

Complete [this project](../wk5_countdown).
