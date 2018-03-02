# `this`

When a function that is a property of an object is called by referencing the function as a property of that object, `this` in the function body refers to the object to which the function belongs.

```js
var nyc = {
    nickname: 'the Big Apple',
    welcomeTo: function() {
        console.log('Welcome to ' + this.nickname);
    }
};

nyc.welcomeTo(); //logs 'Welcome to the Big Apple'

nyc['welcomeTo'](); //logs 'Welcome to the Big Apple'

```

This is the case even if the function is a property of a prototype that the object is inheriting properties from.

```js
function City(nickname) {
    this.nickname = nickname;
}

City.prototype.welcomeTo = function() {
    console.log('Welcome to ' + this.nickname);
};

new City('the Big Apple').welcomeTo(); //logs 'Welcome to the Big Apple'
```

But if you call the exact same function without referencing it as a property of the object, you get quite a different result.

```js
var nyc = {
    nickname: 'the Big Apple',
    welcomeTo: function() {
        console.log('Welcome to ' + this.nickname);
    }
};

var fn = nyc.welcomeTo;

fn(); //logs 'Welcome to undefined' if not in strict mode. In strict mode an error is thrown
```

The value that `this` refers to within a function is determined when the function is called (in this way, `this` is like a parameter). In the example above, the function is not called as a property of an object. In such cases the value that `this` refers to is the global object. Since the global object does not have a nickname property, 'Welcome to undefined' is logged.

If you are using strict mode, `this` will not refer to the global object but will instead be undefined. That is why an error occurs in the example above - attempting to access a property of an undefined value always throws an error.

It is frequently the case that you want to define a function in a scope and have `this` in that function refer to the same thing it refers to in the scope in which that function is defined. A standard way to accomplish this is to stick the value of `this` in a variable that will be accessible to the nested function.

```js
function City(nickname) {
    this.nickname = nickname;
}

City.prototype.welcomeTo = function() {
    console.log('Welcome to ' + this.nickname);
};

City.prototype.waitThenWelcomeTo = function() {
    var city = this;
    setTimeout(function() {
        city.welcomeTo();
    }, 1000);
};

new City('the Big Apple').waitThenWelcomeTo(); //logs 'Welcome to the Big Apple' after 1 second
```

ES 6 has provided some new syntax to make this easier. <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions">Arrow functions</a> automatically have the `this` value from their parent scope available to them.

```js
function City(nickname) {
    this.nickname = nickname;
}

City.prototype.welcomeTo = function() {
    console.log('Welcome to ' + this.nickname);
};

City.prototype.waitThenWelcomeTo = function() {
    setTimeout(() => {
        this.welcomeTo();
    }, 1000);
};

new City('the Big Apple').waitThenWelcomeTo(); //logs 'Welcome to the Big Apple' after 1 second
```
Unfortunately, arrow functions have not yet been implemented in all popular browsers and environments so it won't be completely safe to use them for a while. Another approach is to use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind">`bind`</a> method, which all functions inherit from their prototype.

```js
function City(nickname) {
    this.nickname = nickname;
}

City.prototype.welcomeTo = function() {
    console.log('Welcome to ' + this.nickname);
};

City.prototype.waitThenWelcomeTo = function() {
    setTimeout(function() {
        this.welcomeTo();
    }.bind(this), 1000);
};

new City('the Big Apple').waitThenWelcomeTo(); //logs 'Welcome to the Big Apple' after 1 second
```

## `call` and `apply`

The `call` and `apply` methods, which all functions inherit from their prototype, allow you to call a function with a `this` that you specify. The first argument to both methods is the object you would like `this` to refer to in the function call. `call` takes any number of other arguments which will all be passed to the function. `apply` allows you to use an array containing all the arguments to pass.

```js
var batman = {
    name: 'Batman',
    sayHi: function(name1, name2) {
        console.log('Hello ' + name1 + ' and ' + name2 + '. My name is ' + this.name + '.');
    }
};

batman.sayHi('Bill', 'Hillary'); //logs 'Hello Bill and Hillary. My name is Batman.'

batman.sayHi.call({ name: 'Hello Kitty' }, 'Brad', 'Angelina'); //logs 'Hello Brad and Angelina. My name is Hello Kitty.'

batman.sayHi.apply({ name: 'Cher' }, [ 'Will', 'Jada' ]); //logs 'Hello Will and Jada. My name is Cher.'

```

## Exercises
1. Write a constructor called `Rectangle` that accepts two numbers (width and height) as parameters. `Rectangle` instances should have a method called `getArea` that returns the instance's width multiplied by its height. Write another constructor called `Square` that accepts one number (which will serve as both width and the height) as a parameter. Instances of `Square` should also have a `getArea` method but you should not rewrite the `getArea` function you wrote for `Rectangle`. `Square` instances should use the same `getArea` method that `Rectangle` instances do.
    ```js
    var square = new Square(4);
    square.getArea(); //16

    var rect = new Rectangle(4, 5);
    rect.getArea(); //20
    ```

2. Write a function called `invertCase` that expects a string as a parameter. This function should return a new string with all the same characters as the string that was passed in but with the cases of the alphabetic characters switched. Uppercase characters should become lowercase and lowercase letters should become uppercase. Characters that are not alphabetic should not change. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase">`String.prototype.toUpperCase`</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase">`String.prototype.toLowerCase`</a> will come in handy here.

### Bonus Exercise

Write a constructor called `Countdown` that accepts a single argument - the number of seconds to count down. It should be possible to call the `start` method of instances of `Countdown` to initiate the countdown. Once the countdown starts, it should count down to zero starting with the number that was passed to the constructor and logging each number to the console with a one second delay.


![It's the final countdown](countdown.gif)
