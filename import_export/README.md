# Modules

ES6 modules are Javascript files that can _export_ functions and data that other modules can _import_. Functions and variables that are declared outside of any function in a module do not go into global scope. Only the things that are exported from a module are available outside of it.

Code in a module is automatically in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

## `export` and `import`

In the following examples, `counter.js` is a module that exports several items, and `index.js` is a module that imports items from `counter.js`. It is assumed that the two files are in the same directory. 

```js
// counter.js

export let count = 0;

export const previousCounts = [];

export function increaseBy(n) {
    previousCounts.push(count);
    count += n;
}
```

```js
// index.js

import * as counter from './counter';

console.log(counter.count); // logs '0' to the console
counter.increaseBy(10);
console.log(counter.count); // logs '10' to the console
console.log(counter.previousCounts); // logs '[ 0 ]' to the console
```

`counter.js` exports `count`, `previousCounts`, and `increaseBy` by marking their declarations with the `export` keyword. It could achieve the same effect by declaring the functions and variables normally and using a separate `export` statement.

```js
// counter.js

let count = 0;

const previousCounts = [];

function increaseBy(n) {
    previousCounts.push(count);
    count += n;
}

export { count, previousCounts, increaseBy };
```

`index.js` imports everything that `counter.js` exports using `*`. When importing everything from a module in this way, a name must be provided for the object that will be returned (`counter` is the name in this example). It is also possible to import things individually and selectively.

```js
// index.js

import { count, increaseBy } from './counter';

console.log(count); // logs '0' to the console
increaseBy(10);
console.log(count); // logs '10' to the console
```

Note that, after calling `increaseBy`, the value of `count` in `index.js` changes from its initial value. This is less surprising in the prior example where the value was being accessed as `counter.count`. Although named imports are not properties of an object, they act as if they are. They are live views of the state of the exports.

Named imports behave as if they were declared with `const`. You cannot assign new values to them. If they are not primitive values, however, you can mutate them.

```js
// index.js

import { previousCounts } from './counter';

previousCounts[0] = 20;
console.log(previousCounts); // logs '[ 20 ]' to the console

previousCounts = []; // ERROR!

```

You can give names to exports that are different than the ones used locally in their module.

```js
// counter.js

let count = 0;

function increaseBy(n) {
    previousCounts.push(count);
    count += n;
}

export { count, increaseBy as increase };
```

```js
// index.js

import { count, increase } from './counter';

increase(5);
console.log(count); // logs '5' to the console
```

You can also give imports different names.

```js
// index.js

import { count, increase as incr } from './counter';

incr(5);
console.log(count); // logs '5' to the console
```

A module can define one default export. When importing a default export, curly braces are not used and any name can be specified for it.

```js
// counter.js

let count = 0;

function increaseBy(n) {
    previousCounts.push(count);
    count += n;
}

export { count };
export default increaseBy;
```

```js
// index.js

import { count } from './counter';
import increase from './counter';

increase(5);
console.log(count); // logs '5' to the console
```
