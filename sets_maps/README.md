# `Set` and `Map`

ES 6 has introduced two new data structures to the language: sets and maps.

## Sets

Sets are collections of values in which each value can occur only once. You create a set by calling the `Set` constructor. When you call `Set`, you _must_ use `new`.

```js
const s = new Set;
```

When you call `Set`, you have the option to pass an array (or other iterable object) to the constructor to populate it with values.

```js
const s = new Set([ 10, false, 'funky chicken', { age: 42 } ]);
```

Once you have an instance of `Set`, you can call its `add` method to add a value, its `delete` method to remove a value, and its `has` method to see if it has a value.

```js
const s = new Set;

s.add(10);

s.has(10); //true

s.delete(10);

s.has(10); //false
```

The `add` method returns the `Set` instance. The `delete` method returns a boolean indicating whether or not it deleted anything (it will return `false` if the set did not contain the value that was passed).

Sets do not have a `length` property. To find out how many values a set contains, use the `size` property.

```js
const s = new Set([10, 20, 30]);

s.size; //3
```

Since sets can contain no duplicate values, attempts to add a value that is already in the set will have no effect.

```js
const s = new Set;

s.add(10);

s.add(10);

s.size; //1
```

Strict equality tests are used to determine whether or not a value is already present. Additionally, `NaN`, which does not equal anything, cannot appear in a set more than once.

Sets are not array-like, so you can't pass them as the first argument to `Array.prototype.slice.call`, `Array.prototype.map.call`, etc. You can pass them to `Array.from`, which will convert to an array, or use [spread syntax](../destructuring_rest_spread#Arrays) on them, which is even more convenient. Additionally, sets have their own `forEach` method that works just like `Array.prototype.forEach`.

## Maps

Maps are collections of pairs of keys and values. Unlike objects, a map's keys are not limited to strings or symbols. They can be anything.

```js
const gaga = { name: 'Lady Gaga' };

const paparazzi = { name: 'Paparazzi' };
const badRomance = { name: 'Bad Romance' };

const map = new Map;

map.set(paparazzi, gaga);

map.set(badRomance, gaga);

map.get(paparazzi).name; //"Lady Gaga"
```

To create a map, you must call the `Map` constructor with `new`. To add a key to a `Map` instance, you call its `set` method, which returns the map. To retrieve a value, you use `get`. You can remove a key with the `delete` method. The `has` method tells you whether or not the map has a given key and the number of keys a map has can be retrieved with its `size` property.

All of a map's keys can be retrieved with the `keys` method, and the values can be retrieved with the `values` method. There is also an `entries` method with gives you each pair of key and value in an array. None of these methods return arrays, they return [iterator](../generators) objects. Sets have `keys`, `values`, and `entries` methods that work similarly but for sets the values are considered to be the same as the keys.

`Set` and `Map` have friends named `WeakSet` and `WeakMap`. These work similarly except that `WeakSet` instances keep weak references to values and `WeakMap` instances keep weak references to keys. A weak reference is one that is not sufficient to keep the object it refers to in memory. If there is no reference to an object that is not weak, the object will be garbage collected. This means that the values in `WeakSet` instances and the key/value pairs in `WeakMap` instances can disappear without any action taken on them. For this reason, you cannot access the size or enumerate the keys or values of `WeakSet` and `WeakMap` instances.
