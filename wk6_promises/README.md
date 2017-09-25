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

## Exercise

In your <a href="../wk5_fun_with_fs">Fun with fs</a> project create a module that contains promisified versions of `fs.readdir` and `fs.stat`. Use these functions to read the `files` directory and log to the console whether or not each item in it is a directory. After you have done this for every item, log the string "done!" to the console. The result should look like this:

```
/Users/discoduck/fun-with-fs/files/README.md is not a directory
/Users/discoduck/fun-with-fs/files/part1 is a directory
/Users/discoduck/fun-with-fs/files/part2 is a directory
done!
```

**Bonus**: do the same thing recursively. That is, if an item is a directory, read its contents and log to the console whether each item it contains is a directory or not. The result should look like this:

```
/Users/discoduck/fun-with-fs/files/README.md is not a directory
/Users/discoduck/fun-with-fs/files/part2 is a directory
/Users/discoduck/fun-with-fs/files/part1 is a directory
/Users/discoduck/fun-with-fs/files/part2/index.html is not a directory
/Users/discoduck/fun-with-fs/files/part2/script.js is not a directory
/Users/discoduck/fun-with-fs/files/part1/a is a directory
/Users/discoduck/fun-with-fs/files/part1/b is a directory
/Users/discoduck/fun-with-fs/files/part1/a/images is a directory
/Users/discoduck/fun-with-fs/files/part1/a/index.html is not a directory
/Users/discoduck/fun-with-fs/files/part1/a/stylesheet.css is not a directory
/Users/discoduck/fun-with-fs/files/part1/b/images is a directory
/Users/discoduck/fun-with-fs/files/part1/b/index.html is not a directory
/Users/discoduck/fun-with-fs/files/part1/b/stylesheet.css is not a directory
/Users/discoduck/fun-with-fs/files/part1/a/images/cats.png is not a directory
/Users/discoduck/fun-with-fs/files/part1/a/images/kitty1_150x150.jpg is not a directory
/Users/discoduck/fun-with-fs/files/part1/a/images/kitty2_150x150.jpg is not a directory
/Users/discoduck/fun-with-fs/files/part1/a/images/kitty3_150x150.jpg is not a directory
/Users/discoduck/fun-with-fs/files/part1/b/images/boxes.png is not a directory
done!
```
