# `class`

ES6 has introduced new, alternate syntax for creating constructors along with their prototype objects and the methods associated with them. This new syntax employs `class`, which has been a reserved word in Javascript for a long time but now finally has a use.

Consider the following `class` declaration:

```js
class Rectangle {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    getArea() {
        return this.width * this.height;
    }
}
```
Here a `Rectangle` constructor is created. When this constructor is called with `new`, `width` and `height` properties will be set on the instance that is created. That instance will also inherit the `getArea` method from its prototype. This is essentially a new way to accomplish what the following old school code accomplishes:

```js
function Rectangle(w, h){
    this.width = w;
    this.height = h;
}
Rectangle.prototype.getArea = function() {
    return this.width * this.height;
};
```

There are a couple of strange syntactical things to note about the `class` declaration above. One is that, while both the constructor and `getArea` are functions, neither the word `function` nor the fat arrow (`=>`) is used to define them. Also note that there is no comma separating the two functions.

The result of a `class` declaration is always a function, even if you do not specify a constructor:

```js
class Empty {
}

typeof Empty; // 'function'
```

The function created by `class` _must_ be invoked with `new`. If `new` is not used, an error will result.

Code in `class` declarations is automatically in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

### `extends` and `super`

One nice thing about classes is how easy they make it to create prototype chains. They do this using the `extends` keyword.

```js
class Square extends Rectangle {
    constructor(n) {
        super(n, n);
    }
}

const square = new Square(4);
square.getArea(); // 16
```

In this example, the use of `extends` makes `Square.prototype` an object whose
prototype is `Rectangle.prototype`. Thus, instances of `Square` inherit a `getArea` method from their prototype's prototype.

The `super` keyword is a reference to the constructor of the class that this class is extending (`Rectangle` in  this example). When it is called, the instance that is being constructed will automatically be `this` within it (the `Square` instance in this example).

If you specify a constructor for a class that `extends` something, that constructor must call `super` before it can use `this`. Until `super` is called, `this` is undefined. If you do not specify a constructor for a class that extends something, `super` will automatically be called when the class is instantiated.

Using old school Javascript, the same effect as the `class Square` above could be achieved in the following manner:

```js
function Square(n) {
    Rectangle.call(this, n, n);
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;
```

The `super` keyword also holds references to all the methods of the superclass and when they are called the subclass will be `this` in them. This is useful if you want to override methods of the superclass but still use them.

```js
class Square extends Rectangle {
    constructor(n) {
        super(n, n);
    },
    getArea() {
        console.log('Calling Rectangle.prototype.getArea...');
        return super.getArea();
    }
}
```

### Scope

`class` declarations are not hoisted in the same manner as `function` declarations. Code that uses a class must appear after that class is defined.

Classes use block scoping.

```js
if (true) {
    class Something {
    }
    typeof Something; // 'function'
}
typeof Something; // 'undefined'
```
`class` declarations in global scope create global variables but do not create properties on the global object.

### `class` expressions

In addition to `class` declarations, there are also `class` expressions.

```js
var Circle = class {
    constructor(r) {
        this.radius = r;
    }
}
```

`class` expressions can have names but the names can only be used within the the `class`'s constructor and methods.


### Static methods

Static methods (functions that are properties of the constructor and do not belong to instances, like `Array.isArray`, `Object.create`, and `Date.now`) can be added to classes using the `static` keyword.

```js
class Shape {
    static isShape(obj) {
        return obj instanceof Shape;
    }
}
Shape.isShape(new Shape); // true
Shape.isShape({}); // false
```

### Getters and setters

You can also give prototypes created with `class` getters and setters for properties:

```js
class Person {
    set fullName(val) {
        val = val.split(' ');
        this.firstName = val[0];
        this.lastName =  val[1];
    }
    get fullName() {
        return [this.firstName, this.lastName].join(' ');
    }
}

var person = new Person;
person.fullName = 'Sadie Abramowitz';

person.firstName; // 'Sadie'
person.lastName; // 'Abramowitz'
person.fullName; // 'Sadie Abramowitz'
```

Apart from such computed properties, there is no way to add anything but functions to a prototype in a `class` declaration.
