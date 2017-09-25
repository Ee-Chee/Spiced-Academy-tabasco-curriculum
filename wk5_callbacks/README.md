# Callbacks

Almost everything in Node is asynchronous. Most functions you write or call do not block other things from happening until they are complete. Instead, they allow other things to happen while they do their things.

Asynchronous functions cannot return values in the same way synchronous functions do. Consider the following code:

```js
var item = getItem();
doSomethingWithItem(item);
```

If `getItem` is synchronous, this works perfectly. The function will have returned a value before `doSomethingWithItem` in the following line runs.

However, if `getItem` is asynchronous (if, for example, it has to make an http request to get the value it would like to return), this does not work at all. `doSomethingWithItem` will run before `getItem` has completed its task.

There are several ways to handle this situation but the de facto standard approach in Node is to use callbacks, as in the following code:

```js
getItem(function(err, item) {
    doSomethingWithItem(item);
});
```

The function passed to `getItem` is a callback. `getItem` is expected to call this callback when it has completed its task. If `getItem` encounters an error when attempting to complete its task, it will pass the error as the first argument to the callback. If no error occurred, it will pass the successful result as the second argument. This is the standard form callbacks take in Node, and every callback should handle the error that it may receive in some way. Thus, the code above should really be:

```js
getItem(function(err, item) {
    if (err) {
        console.log(err);
    } else {
        doSomethingWithItem(item);
    }
});
```

If you are writing a function that must do something asynchronously to get the value it would want to return if it were a synchronous function, you should make it accept a callback.

```js
function getItem(callback) {
    getItemViaHttp(function(err, item) {
        if (err) {
            callback(err);
        } else {
            callback(null, item);
        }
    });
}
```

### Further Reading

<a href="http://callbackhell.com/">Callback Hell</a>
