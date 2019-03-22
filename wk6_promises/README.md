# Promises

A _promise_ is an object that represents a value that is or will be the result of an asynchronous process. A promise is always in one of three states: _pending_, _resolved_, or _rejected_. When a promise is resolved or rejected, we say that it is _settled_. Once a promise is settled, it cannot transition to another state.

To get the value that a promise promises, you call its `then` method and pass it a function. If the promise is resolved, the promised value is passed to the function that you pass to `then`.

```js
myPromise.then(function(val) {
    console.log("This promise was resolved.", val);
});
```

If you call `then` while the promise is still in the pending state, the function you pass to `then` will be called after the promise is resolved.

The `then` method returns _another_ promise whose value is whatever is returned from the function you pass to it. This allows you to chain calls to `then`.

```js
myPromise.then(function(val) {
    console.log("This promise was resolved.");
    return val;
}).then(function(val) {
    console.log(val);
});
```

If a function passed to `then` returns a promise, chained calls depend on the resolution of that promise.

```js
myPromise.then(function() {
    return myOtherPromise;
}).then(function() {
    console.log("Both myPromise and myOtherPromise are resolved!")
});
```

It is possible to pass a second function to `then` which will run if the promise is rejected. However, it is better to chain a call to the `catch` method because it will catch exceptions thrown in the success handler.

```js
myPromise.then(function() {
    throw new Error("This error is for demonstration purposes");
}).catch(function(reason) {
    console.log(reason);
})
```

Errors will move through chained promises to the error handler.

```js
myPromise.then(function() {
    throw new Error("This error is for demo purposes");
}).then(function() {
    console.log("This won't run because of the exception upstairs.")
}).catch(function(err) {
    console.log(err);
});
```

## The `Promise` Constructor

ES6 has promises built in. To create one you call the global `Promise` constructor and pass it a function. This function will be passed two functions. You call the first function if you want the promise to be resolved and the second if you want it to be rejected.

```js
var myPromise = new Promise(function(resolve, reject) {
    if (Math.random() > .5) {
        resolve("It's your lucky day.");
    } else {
        reject('You lose. You get nothing.');
    }
});
```

The value passed to the `resolve` function will be passed to success handlers passed to `then`. The value passed to the `reject` function will be passed to the error handlers passed to `catch`.

```js
new Promise(function(resolve, reject) {
    if (Math.random() > .5) {
        resolve("It's your lucky day.");
    } else {
        reject("You lose. You get nothing.");
    }
}).then(function(val) {
    console.log(val); //logs "It's your lucky day."
}).catch(function(e) {
    console.log(e); //logs "You lose. You get nothing."
});
```

Using the `Promise` constructor, it is very easy to make a promisified version of an asynchronous function that takes a callback.

```js
var fs = require('fs');

function readdir(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}
```

## `util.promisify`

As of version 8 of Node it is now even easier to create promisified versions of functions that take callbacks. The [`util`](https://nodejs.org/api/util.html) module now has a [`promisfy`](https://nodejs.org/api/util.html#util_util_promisify_original) method to which you can pass a function that accepts a standard, node-style callback and get back a function that returns a promise.

```js
const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);

readdir(__dirname + '/files').then(function(files) {
    // do something with list of items in the directory
}).catch(function(err) {
    // handle error
});
```

## `Promise.all`

Very often you want to do several different things asynchronously and then do something else once all of those asynchronous calls are complete. The <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all">`Promise.all`</a> method facilitates this. You pass to it an array of promises and it returns a new promise that is resolved when all of the promises in the array are resolved. If any one of the promises in the array is rejected, the promise returned by `Promise.all` is rejected.


```js
Promise.all([
    myPromise,
    myOtherPromise,
    yetAnotherPromiseOfMine
]).then(function() {
    console.log("All of my promises were resolved!")
}).catch(function() {
    console.log('At least one of my promises was rejected :(');
});
```

If the promise is resolved an array containing all of the resolved promises will be passed to the success handler.

## Exercises
1. Redo [Part 1](https://github.com/spicedacademy/tabasco/tree/master/wk5_fun_with_fs#part-1) of your [`fs`](https://github.com/spicedacademy/tabasco/tree/master/wk5_fun_with_fs) project but this time use versions of `readdir` and `stat` that return promises. You can obtain these versions by using the experimental promises API of the `fs` module.

    ```js
    const {readdir, stat} = require('fs').promises;
    ```

    If that makes you uncomfortable, you can use `util.promisify` on the versions that accept callbacks.

    ```js
    let {readdir, stat} = require('fs');
    const {promisify} = require('util');

    readdir = promisify(readdir);
    stat = promisify(stat);
    ```

    A third option would be to write two new functions that each return a promise created with the `Promise` constructor and call `fs.readdir` or `fs.stat` in the function you pass to `Promise`.

    Once you have your `logSizes` function working with your promisified `readdir` and `stat`, modify it so that it returns a single promise that is resolved when all of the promises it causes creates are resolved.

    Finally, call `logSizes` and pass it the path to your files directory. When the promise it returns is resolved, log the string `"done!"` to the console. The output should end up looking like this:

    ```
    /Users/funkychicken/fun-with-fs/files/README.md: 12
    /Users/funkychicken/fun-with-fs/files/part2/index.html: 160
    /Users/funkychicken/fun-with-fs/files/part2/script.js: 1998
    /Users/funkychicken/fun-with-fs/files/part1/a/index.html: 241
    /Users/funkychicken/fun-with-fs/files/part1/a/stylesheet.css: 40
    /Users/funkychicken/fun-with-fs/files/part1/b/index.html: 243
    /Users/funkychicken/fun-with-fs/files/part1/b/stylesheet.css: 39
    /Users/funkychicken/fun-with-fs/files/part1/a/images/cats.png: 573350
    /Users/funkychicken/fun-with-fs/files/part1/a/images/kitty1_150x150.jpg: 9279
    /Users/funkychicken/fun-with-fs/files/part1/a/images/kitty2_150x150.jpg: 14355
    /Users/funkychicken/fun-with-fs/files/part1/a/images/kitty3_150x150.jpg: 13387
    /Users/funkychicken/fun-with-fs/files/part1/b/images/boxes.png: 156804
    done!
    ```
2. Refactor your [Twitter API](wk6_twitter_api) project to use promises for everything asynchronous.
