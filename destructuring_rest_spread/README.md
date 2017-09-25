ES6 provides lots of great new syntax that makes many things we do all the time - assigning values from objects and arrays to variables, setting properties on objects, concatenating arrays, reading arguments passed to functions - much less laborious.

# Arrays

Extracting values out of objects and arrays and putting them in variables is made much easier by the new [destructuring assignment](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax. Say, for example, you want to put first and second values contained in an array into two variables. Without destructuring, you would have to do this:

```js
const arr = [10, 20, 30];

const a = arr[0];
const b = arr[1];

a + b; // 30
```

With destructuring, you can now do this:

```js
const arr = [10, 20, 30];

const [a, b] = arr;

a + b; // 30;

```

 If you want the first and third items in the array, you can do this:

```js
const arr = [10, 20, 30];

const [a,, c] = arr;

a + c; // 40
```

Now let's say you wanted to assign the first item in an array to a variable and assign to another variable an array that contains all of the other items. There is new syntax that makes this easy;

```js
const arr = [10, 20, 30];

const [a, ...etc] = arr;

a; // 10
etc; // [20, 30]
```

You can also use this pattern to insert all of the items in an array into another array you are creating.

```js
const arr = [10, 20, 30];

const otherArr = [0, ...arr, 40];

otherArr; // [0, 10, 20, 30, 40]
```

# Objects

You can do destructuring with objects as well.

```js
const leo = {
    name: 'Leonardo DiCaprio',
    age: 42,
    oscars: 1
};

const { name, oscars } = leo;

console.log(`${name} has received ${oscars} academy award(s)`);
```

This is great, but we often want to go the other way. That is, we often start out with variables and want to assign properties to objects with the same names and values as those variables. The old school way to do this was not fun:

```js
const name = "Leonardo DiCaprio";
const oscars = 1;
const age = 42;

const leo = {
    name: name,
    oscars: oscars,
    age: age
};
```

Now you can do this:

```js
const name = "Leonardo DiCaprio";
const oscars = 1;
const age = 42;

const leo = {
    name,
    oscars,
    age
};
```

Functions can be assigned using the same syntax used with [`class`](../es6_class).

```js
const leo = {
    name: 'Leonardo DiCaprio',
    hello() {
        console.log(`Hello, my name is ${this.name}`);
    }
};
```

Computed properties can also be created with the same syntax used with `class`.

```js
const square = {
    width: 4,
    height: 4,
    get area() {
        return this.width * this.height;
    },
    set area(val) {
        this.width = this.height = Math.sqrt(val);
    }
};

square.area; //16

square.area = 25;

square.width; //5
```

Creating objects with dynamically determined property names has always been annoying because it's a two step process. First you have to create the object and then you have to add the property or properties. 

```js
function createObjWithProp(name, value) {
    var obj = {};
    obj[name] = value;
    return obj;
}

const obj = createObjWithProp('hello', 'kitty');

console.log(obj); // logs '{ hello: "kitty" }'

```

But no more. Now you can use the square bracket syntax in the property names in object literals.

```js
function createObjWithProp(name, value) {
    return {
        [name]: value
    };
}

const obj = createObjWithProp('hello', 'kitty');

console.log(obj); // logs '{ hello: "kitty" }'
```

# Function arguments

You can use destructuring tricks with objects and arrays passed to functions.

```js
const body = {
    firstName: 'disco',
    lastName: 'duck',
    email: 'discoduck@example.com',
    password: 'letmein'
};

const logName = function({ firstName, lastName }) {
    console.log(lastName + ', ' + firstName);
};

logName(body); // logs 'duck, disco'
```

```js
const arr = [10, 20, 30];

const add = function([ a, b ]) {
    return a + b;
};

add(arr); // 30
```

Additionally, you can now write functions that accept a variable number of arguments and have some number of them automatically collected into an array.

```js
function add(a, b, ...etc) {
    let sum = a + b;
    for (let i = 0; i < etc.length; i++) {
        sum += etc[i];
    }
    return sum;
}

add(1, 2); // 3
add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6); // 21
```

It is now much easier to create a function with optional arguments with default values. In the old days, you had to test for the existence of the argument and assign a default value to it if necessary.

```js
function add(a, b) {
    if (typeof b == 'undefined') {
        b = 0;
    }
    return a + b;
}

add(5); // 5
```

Now you can define default values for parameters in the arguments list.

```js
function add(a, b=0) {
    return a + b;
}

add(5); // 5
```

Note that the default parameters you specify are used whenever the argument passed in is undefined, even if you pass the value explicitly. 

```js
function add(a, b=0) {
    return a + b;
}

add(5, undefined); // 5
```

