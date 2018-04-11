# Global scope and the global object

_**Note** - this discussion of global scope pertains to the situation in web browsers. Some details differ in the Node environment and we will cover those differences in due course._

If you are writing a Javascript program that runs in a browser and you declare a variable outside of any function, you are declaring a variable in the _global scope_. That variable can be accessed anywhere. This is in contrast to variables that are declared within functions, which are said to be in _local scope_.

The fact that global variables can be accessed anywhere means that they can easily be overwritten accidentally, resulting in chaos. For this and other reasons it is best to minimize the number of global variables you create. There is seldom any reason to create more than one.

There is a _global object_ and it is this object that `this` refers to in global scope. Variables that are declared in the global scope with `var` automatically become properties of the global object.

```js
// Global scope code
var a = 100;
a; //100
this.a; //100
```

# Undeclared assignment
In _both_ global and local scope, if you assign a value to a variable without declaring that variable, you create a global variable/property.

```js
a = 100;
a; //100;
this.a //100
```

This is easy to do accidentally. To prevent such mistakes, undeclared assignment throws an error in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode"  target="_blank">strict mode</a>.

```js
'use strict';
a = 100; //ERROR
```

If you are not using strict mode you must take great care to avoid such mistakes.

# Hoisting

In _both_ global and local scope, declarations of variables with `var` are processed prior to the execution of all other code, including assignments. This is called _hoisting_. Hoisting makes the following three code snippets equivalent.

```js
var a = 100;
var b = 200;
```

```js
var a, b;
a = 100;
b = 200;
```

```js
a = 100;
b = 200;
var a, b;
```

Note that in the third example above, there is no error in strict mode because there is no undeclared assignment.

# Function definitions

## Function declarations

```js
function sayHello() {
    console.log('hello');
}
```

Function declarations, like `var` declarations, are subject to hoisting. When you declare a function, the name of the function becomes a variable in the scope of the declaration and the value assigned to it is the function.

## Function expressions

```js
var sayHello = function() {
    console.log('hello');
};
```

Defining a function using a function expression avoids hoisting - your function comes into existence in the spot in which it is defined. Some people choose to only use function expressions to define functions while others prefer to have the ability to call a function in a spot prior to the defintion of that function. This is a matter of style.

# Local scope

Variables declared in a function are in local scope. They are not accessible outside of the function.

```js
var fn = function() {
    var n = 0;
    console.log(typeof n);
};

fn(); //logs 'number'
console.log(typeof n); //logs 'undefined'
```

# Immediately-invoked function expressions (iife)

A common pattern is to define a function without assigning it to a variable and immediately execute it. The purpose of this is to keep variables declared within the function out of the outer scope (ES 6 provides other ways to accomplish this which we will discuss at a later time).

```js
(function() {
    var a = 1;
    console.log(typeof a); //logs 'number'
})();

console.log(typeof a); //logs 'undefined'
```

Note the parentheses around the function expression. These are necessary for the parser to differentiate it from a function declaration. There are other ways to do this but parentheses are the most popular.

# Functions are first-class

Functions in Javascript can be returned from functions and can be passed to other functions as parameters. They can be assigned to variables and object properties and can be stored in arrays. They are _first-class_ citizens.

Functions in Javascript are objects. Functions can have properties assigned to them, as we have already seen with the `isArray` method of the `Array` constructor. Functions are a special kind of object that can be _called_.

# The `arguments` object
When a function has been called and is running there is available to it in its local scope an `arguments` object. The `arguments` object is not an array but it is _array-like_. It has a `length` property whose value corresponds to the number of parameters that was passed to the function. It also has properties whose names are integers and hold the values that were passed as parameters.

```js
function fn(a, b, c) {
    console.log(arguments[0] == a); //logs 'true'
    console.log(arguments[1] == b); //logs 'true'
    console.log(arguments[2] == c); //logs 'true'
}
```

The `arguments` object is useful when the parameters passed to a function do not correspond to the parameters that were named and listed in the function definition.

```js
var exclaim = function(a) {
    var exclamation = a;
    if (arguments[1]) {
      exclamation = arguments[1];
    }
    return exclamation + '!!!';
};

exclaim('hello'); //'hello!!!'
exclaim('hello', 'goodbye'); //'goodbye!!!'
```

# Nested functions

Functions can be defined in other functions. Functions that are defined in other functions have access to the local scope of the functions they are defined in.

```js
var outer = function() {
    var a = 100;

    var inner = function() {
        var b = 'hello';
        console.log(typeof a, typeof b);
    };

    inner(); //logs 'number', 'string'
    console.log(typeof a, typeof b); //logs 'number', 'undefined'
};
outer();
```

Note that this does not just apply to declared variables but also to parameters that are passed in, since they are in local scope as well.

```js
var getCounter = function(num) {
    return function() {
      return num++;
    };
};

var counter = getCounter(3);
counter(); //3
counter(); //4
counter(); //5
```

# Callbacks

Functions that are passed to other functions are often called _callbacks_.

```js
setTimeout(function() {
    console.log('hello');
}, 1000);
```

The built-in function `setTimeout` takes a callback as its first parameter. The second parameter is a number of milliseconds. After the number of milliseconds passes, `setTimeout` calls the callback.

# Recursion
<img src="recursion.png" alt="Recursion">
Functions can call themselves! This is called _recursion_.

```js
var cutDownToSize = function(str) {
    if (str.length > 3) {
        return cutDownToSize(str.slice(0, -1));
    }
    return str;
};

cutDownToSize('teacher'); //'tea'
```

As with loops, when you use recursion you need to be certain that it will not continue infinitely.

# Anonymous functions and named function expressions
All function declarations result in functions that have names. The function expressions in the examples above (including those that assign a function to a variable) do not have names. They are _anonymous functions_.

What if you want to define a recursive function using a function expression? You can use a _named function expression_. The name will be in the local scope of the function it names and inaccessible to the outer scope.

```js
var fn = function me(str) {
    if (!str) {
        return me('hello');
    }
    return str + '!';
};

fn('hi'); //'hi!'
fn(); // 'hello!';

typeof fn; //'function';
typeof me; //'undefined'
```

# Exercises

1. Write a function that takes any number of numbers as parameters and returns the sum of those numbers.
  ```js
  sum(5, 10); //15

  sum(5, 10, 15); //30;

  sum(5, 10, 15, 100, 200); //330
  ```

2. Write a function that takes another function as a parameter. It should wait 1.5 seconds and then run the function that was passed in.
  ```js
  waitThenRun(function() {
      console.log('Hello!');
  }); // logs 'Hello!' 1.5 seconds later

  waitThenRun(function() {
      console.log('Goodbye!');
  }); // logs 'Goodbye!' 1.5 seconds later
  ```

3. Write a function that expects a number as a parameter. If the value that is passed in is less than 0, equal to 0, or not a number, the function should return the string 'ERROR'. If the number that is passed in is greater than or equal to 1000000 it should simply return the number.  Otherwise it should multiply the number by 10 however many times it takes to get a number that is greater than or equal to 1000000 and return that.

## Bonus exercise

Write a function that returns a function that can be called repeatedly and passed a number each time. Each time it is called it should return the sum of the number that is passed in and all other numbers that were passed in previous calls. That is, it should return the sum of all the numbers that were ever passed to it.
 ```js
 var totaler = getTotaler();
 totaler(1); //1
 totaler(2); //3
 totaler(5); //8
 ```
 
