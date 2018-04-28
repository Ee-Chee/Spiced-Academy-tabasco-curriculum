# Async functions

Async functions are a new kind of function that improves the experience of working with promises. You create async functions using the new `async` keyword.

```js
async function doSomethingAsynchronous() {

}
```

```js
const doSomethingAsynchronous = async function() {

};
```

```js
const doSomethingAsynchronous = async () => {

};
```

```js
class Whatever {
    async doSomethingAsynchronous() {

    }
}
```

Async functions automatically return promises. The value in an explicit `return` statement in an async function will be the value that the promise the async function returns is resolved with.

```js
const fn = async function() {
    return 'disco duck';
};

fn().then(function(val) {
    console.log(val); //logs "disco duck"
});
```

If the value in an explicit `return` statement is a promise, the resolution or rejection of the promise returned by the async function will depend on the promise in the `return` statement.

```js
const getProm = () => new Promise(function(resolve) {
    resolve('disco duck');
});

const fn = async function() {
    return getProm();
};

fn().then(function(val) {
    console.log(val); //logs "disco duck"
});
```

If an exception is thrown in the body of an async function, the promise it returns will be rejected.

```js
const fn = async function() {
    throw new Error('Error!');
};

fn().catch(function(err) {
    console.log(err.message); //logs "Error!"
});
```

If there is no explicit `return` statement and the async function completes without throwing an exception, the returned promise will be resolved with `undefined`.

```js
const fn = async function() {
};

fn().then(function(val) {
    console.log(typeof val); //logs "undefined"
});
```

In all of these ways, async functions behave just like functions passed to the `then` method of promises.

## `await`

The `await` operator, which can only be used in async functions, is used with promises and pauses the execution of the async function it is in until the promise it is used with is settled. The value that the promise is resolved with will be the return value of the `await` expression. Thus, `await` eliminates the need to call `then` on the promise.

The combination of `async` and `await` allows us to rewrite code that looks like this:

```js
function getHeadlines(screenName) {
    return getToken().then(function(token) {
        return getTweets(token, screenName);
    }).then(filterTweets);
}
```

to make it look like this:

```js
async function getHeadlines(screenName) {
    const token = await getToken();
    const tweets = await getTweets(token, screenName);
    return filterTweets(tweets);
}
```

In this example, the execution of the async function `getHeadlines` is paused twice: once to wait for the promise returned by `getToken` and again to wait for the promise returned by `getTweets`. The promise that `getHeadlines` returns is finally resolved with the value returned by `filterTweets`, which presumably runs synchronously.

The similarity between async functions and [generator functions](../generators) should be clear. Both kinds of function can be paused and resumed. Generator functions are paused by `yield` expressions, while async functions are paused by `await` expressions. An important difference is that generator functions can only be resumed by calling `next` on the iterator objects they return. Async functions are automatically resumed when the promise in the `await` expression that paused execution is settled.

When `await` is used with a value that is not a promise, that value is treated as if it were the value that a promise had been resolved with. For example, `await 'funky chicken'` would be automatically converted to `await Promise.resolve('funky chicken')`.

If the promise in an `await` expression is rejected, an exception is automatically thrown. Because the rejected promise becomes an actual thrown exception, it can be caught with `try...catch`.

```js
async function fn() {
    let success = true;
    try {
        await doSomethingThatMightNotWorkOut();
    } catch (err) {
        success = false;
    }
    return { success };
}
```

An important thing to keep in mind is that `await` expressions pause execution as soon as they are reached.

```js
async function getImageWithComments(id) {
    const image = await getImageById(id);
    const comments = await getCommentsByImageId(id);
    return { image, comments };
}
```

In this example, the retrieval of the comments does not begin until the retrieval of the image is complete. If you wanted to perform the two asynchronous actions in parallel, you would have to reconfigure a bit.

```js
async function getImageWithComments(id) {
    const image = getImageById(id);
    const comments = getCommentsByImageId(id);
    return {
        image: await image,
        comments: await comments
    };
}
```
