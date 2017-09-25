# Symbols

We briefly mentioned symbols in the first week of the course but did not go into detail about them because they are new and have a narrow range of uses. Now their story can be told.

To create a symbol you can use the global `Symbol` function. Although this function's name starts with a capital letter, it is not a constructor and attempts to call it with `new` will result in an error. The reasoning behind this seems to be that it is generally undesirable to create an object wrapper for this primitive type so it should not be easy to do so. If you really wanted an object wrapping around a symbol, you could accomplish this by passing a symbol to the `Object` constructor. As for why the function's name starts with a capital letter, presumably this is to maintain parallelism with the other constructors for primitive types, `Boolean`, `String`, and `Number`, which are usually not called with `new`.

You can pass a description as an argument to `Symbol`, but this serves no purpose other than to help with debugging. The description will be visible when the symbol is logged to the console.

```js
const s1 = Symbol();
const s2 = Symbol('My second symbol');

console.log(s1); //logs "Symbol()"
console.log(s2); //logs "Symbol(My second symbol)"
```

You cannot convert a symbol to a string via concatenation or interpolation in a template string. You can safely convert a symbol to a string by calling its `toString` method or by passing it to `String`, but concatenation and interpolation cause errors.

Symbols cannot be converted to numbers under any circumstances. All attempts to do so will cause errors.

Symbols can be converted to booleans and are truthy.

A crucially important thing about symbols is that every single one of them is unique. No symbol equals any other symbol or anything else except itself.

```js
let s = Symbol();

s == Symbol(); //false
s === Symbol(); //false

s = Symbol('Symbols are special snowflakes');

s == Symbol('Symbols are special snowflakes'); //false
s === Symbol('Symbols are special snowflakes'); //false
```

### What are symbols good for?

Symbols have only one use: they can be used as an alternative to strings for identifying properties of objects.

```js
const age = Symbol('age');

const leo = {
    name: 'Leonardo',
    [age]: 42
};

leo[age]; //42
```

The reason why you might want to use a symbol rather than a string as a property's key is that every symbol is unique. If you create a new symbol and use it to add a property to an object, you know without checking that you are not overwriting an existing property. You also know that nobody can alter the property you added without first gaining access to the symbol, which is hard to do accidentally.

Properties whose keys are symbols do not show up in `for...in` loops. They are also not present in the arrays returned by `Object.keys` and `Object.getOwnPropertyNames`. The only way to get them is with [`Object.getOwnPropertySymbols`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols).

```js
const age = Symbol('age');

const leo = {
    name: 'Leonardo',
    [age]: 42
};

Object.keys(leo); //[ 'name' ]

Object.getOwnPropertySymbols(leo); //[ Symbol(age) ]
```

### The Global Registry

If you want a symbol to be accessible from any scope, you can use the [`Symbol.for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for) method. When you call `Symbol.for` and pass it a string, the symbol associated with that string will be returned. If no symbol is yet associated with that string, a new symbol will be created, registered, and then returned.

```js
const age = Symbol.for('age');

const leo = {
    name: 'Leonardo',
    [age]: 42
};

leo[Symbol.for('age')]; //42

const jlaw = {
    name: 'Jennifer',
    [Symbol.for('age')]: 27
};

jlaw[age]; //27
```

This is called the global registry, but it is actually a bit more global than global. If you have a page that contains an iframe, each page has its own global scope, but they share the same global symbol registry.

### Well-known Symbols

Javascript now uses symbols to expose to developers certain properties affecting language behavior that had previously been inaccessible. The relevant symbols are all properties of `Symbol` and are collectively referred to as [well-known symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols).

For example, the well-known symbol `Symbol.toStringTag` can be used to alter the label that appears in the string returned when an object's `toString` method is called.

```js
const obj = {};

console.log(obj + ''); //logs '[object Object]';

obj[Symbol.toStringTag] = 'FunkyChicken';

console.log(obj + ''); //logs '[object FunkyChicken]';
```

An important well-known symbol is `Symbol.iterator`, which is used to make an object [iterable](../generators).
