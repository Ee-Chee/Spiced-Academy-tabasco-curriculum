# Generator Functions

An _iterator_ is a special kind of object that allows you to get a sequence of values one after the other. These objects are created not with constructors but with a special kind of function called a generator function. Generator functions are visually distinguished from garden-variety functions by `*`.

```js
function* genFunc() {

}
```

```js
const genFunc = function*() {

};
```

```js
class Whatever {
    * genFunc() {

    }
}
```

There is no way to create a generator function using arrow function syntax.

When a generator function is called, the body of the function is not executed. Instead, an iterator object is automatically returned.

```js
function* gen() {
    return 10;
}

const it = gen();

console.log(typeof it); //logs 'object' and not 'number'
```

The object that is returned by a generator function has a method named `next`. It is calling this method that causes the body of the generator function to execute.

```js
function* gen() {
    return 10;
}

const it = gen();

const val = it.next();

console.log(val); //logs '{ value: 10, done: true }'
```

Calls to `next` always return an object with a `value` property as well as a `done` property that indicates whether the end of the generator function has been reached. If you call `next` again after `done` is true, you will get back an object whose `done` property is still true and whose `value` property is `undefined`.

Because generator functions are meant to produce a series of values and `return` statements end a function's execution, a new keyword, `yield`, has been introduced. `yield`, like `return`, sends a value out of a function to the external caller but, unlike `return`, `yield` does not cause the function to end. Instead, it _pauses_ the execution. Execution is resumed when `next` is called.

```js
function* gen() {
    yield 10;
    yield 20;
    yield 30;
}

const vals = gen();

let val = vals.next().value;
console.log(val); //logs 10

val = vals.next().value;
console.log(val); //logs 20

setTimeout(function() {
    val = vals.next().value;
    console.log(val); //logs 30
}, 5000);
```

So generator functions are functions that can be paused and resumed. Amazing! This means that in a generator function it is totally fine to have an infinite loop as long as you `yield` in it.

```js
function* getCounter() {
    let count = 0;
    while (true) {
        yield ++count;
    }
}
```

A value can be fed back into a generator function by passing an argument to `next`. In the generator function, the argument passed to `next` will be the result of the `yield` expression.

```js
const greet = genGreeting();

console.log(greet.next().value); //logs 'What is your name?'
console.log(greet.next('Disco Duck').value); //logs 'What city do you live in?'
console.log(greet.next('Funky Town').value); //logs 'Hello, Disco Duck from Funky Town'

function* genGreeting() {
    const name = yield 'What is your name?';
    const city = yield 'What city do you live in?';
    yield `Hello, ${name} from ${city}!`
}
```

In addition to `yield`, there is also `yield*`, which a generator function can use to defer to another generator function.

```js
const letters = a();

console.log(letters.next().value); //logs 'a'
console.log(letters.next().value); //logs 'b'
console.log(letters.next().value); //logs 'c'

function* a() {
    yield 'a';
    yield* bc();
}

function* bc() {
    yield 'b';
    yield 'c';
}
```

Both `yield` and `yield*` can only be used in generator functions.

## `for...of` and iterables

`for...of` is a new kind of loop that was designed to work with the objects returned by generator functions. When you use `for...of` there is no need to call `next` and there is no need to pull the `value` property out of the object `next`  returns. The loop does both of these things for you.

```js
let sum = 0;

for (const num of numbers()) {
    sum += num;
}

console.log(sum); //logs 60

function* numbers() {
    yield 10;
    yield 20;
    yield 30;
}
```

`for...of` can be used not just on the objects that are returned by generator functions but also on any object that is _iterable_. An object qualifies as iterable if it has its own or inherits a property whose key is the well-known symbol `Symbol.iterator` and whose value is a generator function. There are several iterables that are built in to Javascript. Arrays, strings, the `arguments` object available in function bodies, and instances of `Set` and `Map` are all iterable.

The generator function whose key is `Symbol.iterator` is also called whenever the [spread syntax](destructuring_rest_spread#arrays) is used. This means that you can use spread syntax with any iterable and not just arrays.

```js
fn(10, 20, 30); //[ 'a', 'b', 'c', 10, 20, 30 ]

function fn() {
    const str = 'abc';
    return [...str, ...arguments];
}
```

You can create your own iterables simply by adding a property whose key is `Symbol.iterator` and whose value is a generator function.

```js
const actors = {
    leo: {
        name: 'Leonardo DiCaprio',
        oscars: 1
    },
    jlaw: {
        name: 'Jennifer Lawrence',
        oscars: 1
    },
    jcho: {
        name: 'John Cho',
        oscars: 0
    },
    [Symbol.iterator]: function*() {
        for (const key in this) {
            yield this[key].name;
        }
    }
};

console.log([...actors]); //logs [ 'Leonardo DiCaprio', 'Jennifer Lawrence', 'John Cho' ]
```
