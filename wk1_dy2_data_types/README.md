# Data Types

As of this writing there are seven data types in the Javascript language:

1. Undefined
2. `null`
3. Boolean - `true` and `false`
4. Number - 90210, 3.1, -55
5. String - "Why, hello there!"
6. Symbol - this is new in ES 2015 and we will leave it out of consideration for now
7. Object

The first six types in the list above are called _primitive_ data types.

## The `typeof` operator

The `typeof` operator can be used to check the type of a value.

```js
typeof 'test'; //'string'

typeof 99; //'number'

typeof function(){}; //'function'

typeof {}; //'object'

typeof [1,2,3]; //'object'
```

Since `typeof` returns 'object' for arrays, how can you determine if you have an array on your hands? In most situations the `isArray` method attached to the `Array` constructor will work for you.

```js
Array.isArray([1,2,3]); //true
Array.isArray('pizza'); //false
```

`typeof null` returns 'object', which is widely considered to be a bug. To test whether something is `null` you can use `===`:

```js
var n = null;
n === null; //true;
```

Another strange case is `NaN`, which means "not a number." This value is produced when you do something mathematically nonsensical like multiplying a string by an object.

```js
typeof NaN; //number
```

Wow. Also strange is that `NaN` doesn't equal anything.

```js
NaN == NaN; //false
NaN === NaN; //false
```

So how can you tell if you have `NaN` on your hands? There is a function called `isNaN` for this specific purpose.

```js
isNaN(NaN); //true
```

In addition to the global `isNaN`, there is also a version attached to the `Number` constructor but it behaves slightly differently. If the argument passed to the global `isNaN` is not of the type number, it will convert it to a number and return `true` if the result of that conversion is `NaN` and false otherwise. `Number.isNaN` will not convert its argument and will return `false` if the type of argument passed to it is not number whether or not it can be converted to a number. 

```js
isNaN(NaN); //true
Number.isNaN(NaN); //true

isNaN("1"); //false
Number.isNaN("1"); //false

isNaN("not a number!"); //true
Number.isNaN("not a number!"); //false
```

## Constructors

As with objects and arrays, Javascript provides constructors for strings, numbers, and booleans. When these functions are used as constructors (i.e., when they are used with the `new` keyword), they return primitive values _wrapped_ in an object.

```js
typeof new String("test"); //'object'
typeof new Number(55); //'object'
```

When used without the `new` keyword, these functions can be used to _cast_ strings to numbers, numbers to strings, booleans to numbers, etc.

```js
String(666); //'666'
Number('100'); //100
Number('pizza'); //NaN
Number(true); //1
Boolean(0); //false
```

## Truthiness and Falsiness
Only booleans can be `true` or `false` but every value in Javascript is either truthy or falsey. A truthy value will be treated as `true` in conditional contexts and falsey values will be treated as `false`.

* `null` and `undefined` are both falsey.
* 0 and `NaN` are both falsey. All other numbers (including negative numbers) are truthy.
* "" (a string with no length) is falsey. All other strings are truthy.
* All objects, arrays, and functions are truthy.

```js
if (0) {
    // we will never get here
}

if (-1) { 
    // we will get here
}

if ('') {
    // we will never get here
}

if ('tuna') {
    // we will get here
}

if ([]) {
    // we will get here
}
