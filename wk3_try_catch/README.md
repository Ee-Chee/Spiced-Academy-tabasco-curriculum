# `try...catch`

`try...catch` structures are used to handle exceptions. If you are writing code that may throw an exception due to circumstances beyond your control, you should put it in a `try` block and follow it with a `catch` block in which you handle the exception.

```js
try {
    doSomethingThatMayThrowAnException();
} catch (e) {
    logException(e);
}
```

The `catch` block is like a function in that it is passed a parameter that is inaccessible outside of it. That parameter will usually contain information about the error.

```js
try {
    asdfasfasf;
} catch (e) {
    console.log(e); //logs 'ReferenceError: asdfasfasf is not defined'
}
console.log(typeof e); //logs 'undefined'
```

However, if an exception is thrown manually it is possible that it will contain no useful information since it is possible to `throw` anything.

```js
try {
    throw null;
} catch (e) {
    console.log(e); //logs 'null'
}
```

## `finally`

You can also use a `finally` block with `try` or `try...catch`. Code inside a `finally` block will run whether or not an exception is thrown.

```js
try {
    doSomethingThatMayThrowAnException();
} catch (e) {
    handleTheException(e);
} finally {
    cleanUp();
}
```

Here's an interesting thing about `finally`: a `return` statement in a `finally` block will supersede a `return` in the `try` block.

```js
var fn = function() {
    try {
        return 5;
    } finally {
        return 10;
    }
};

fn(); //10
```

Wow!

## Exercises

1. Make a JSON validator website. It should have a `<textarea>` where users can input their JSON. After clicking a button a message should appear, telling users if the JSON is valid or not.

2. Write a function `askForNumber` that uses `prompt` to ask the user for a number between one and ten. It should check the result and if it is not a number between 1 and 10 it should throw an error with the message "not a valid number". Otherwise, it should return the number the user entered. Then, write a second function `translateNumberToGerman` that calls `askForNumber` and returns the German translation of that number as a string. If `askForNumber` throws an error, it should print the error's message to the console and prompt the user again.


