# Constructors
Constructors are functions that, when called with the `new` keyword, return a newly created object (an _instance_). By convention, the names of constructors begin with capital letters.

```js
  function Country(name) {
      this.name = name;
  }
  
  var germany = new Country('Germany');
```

When a constructor is called with `new`, `this` in the body of the constructor function refers to the newly created object that will be returned.

Note that the `Country` function above does not have a `return` statement. No `return` statement is necessary since the newly created object will be returned automatically. In fact, if a constructor called with `new` does have a `return` statement that returns a primitive value, the newly created object will still be returned and the primitive value will not be. 

```js
  function Country(name) {
      this.name = name;
      return 10;
  }
  
  var germany = new Country('Germany'); //{ name: 'Germany' } (and not 10)
```

However, a `return` statement that returns a different object will be effective.

```js
  function Country(name) {
      this.name = name;
      return {};
  }
  
  var germany = new Country('Germany'); //{} (and not { name: 'Germany' })
```

If a constructor is called with `new` and without any parameters passed in, it is not necessary to use parentheses. The presence of `new` is enough to make it clear that the function is being invoked and not merely accessed. However, parentheses are required if you wish to immediately access one of the newly created object's properties.

```js
var date = new Date; //no parentheses needed

var time = new Date().getTime(); //parentheses are needed
```

# Prototypes

Every function automatically has a `prototype` property whose value is an object with no enumerable properties. If a function is not called with `new`, it's prototype property does not have any role to play. When a function is called with `new`, the function's prototype property becomes the prototype of the object that the function returns.

```js
  function GermanCity(name) {
      this.name = name;
  }

  GermanCity.prototype.country = 'Germany';

  var berlin = new GermanCity('Berlin');
  var hamburg = new GermanCity('Hamburg');

  berlin.country; //'Germany'
  hamburg.country; //'Germany'
```

Prior to the advent of `Object.create` with ES 5, this was the only way to assign a prototype to an object.

Note that the connection between instances and their prototype is 'live' - changes to the properties of the prototype are immediately visible when those properties are accessed via the instances.

```js
function GermanCity(name) {
    this.name = name;
}

GermanCity.prototype.country = 'Germany';

var berlin = new GermanCity('Berlin');
var hamburg = new GermanCity('Hamburg');

berlin.country; //'Germany'
hamburg.country; //'Germany'

GermanCity.prototype.country = 'Deutschland';

berlin.country; //'Deutschland'
hamburg.country; //'Deutschland'
```

The prototype objects that are automatically attached to functions have an unenumerable property named `constructor` whose value is the function to which the prototype is attached. This is where the `constructor` property that all objects have comes from. If you overwrite a constructor's `prototype` property with a new object that doesn't have a `constructor` property, instances will lose the reference to their constructor.

```js
function GermanCity(name) {
    this.name = name;
}

var berlin = new GermanCity('Berlin');

berlin.constructor; //GermanCity

GermanCity.prototype = {};

var hamburg = new GermanCity('Hamburg');

hamburg.constructor; //Object
```

Prototypes are themselves objects that have other objects as their prototypes. The default object that is automatically assigned to a function's `prototype` property has `Object.prototype` as its prototype, as do object literals and objects created with the `Object` constructor. Through developer action it is possible for there to be long chains of prototypes attached to instances. 

## The `instanceof` operator

The `instanceof` operator is used to test whether a given constructor exists as a constructor property of any of the prototypes in an object's prototype chain.

```js
var date = new Date;

date instanceof Date; //true

date instanceof Object; //true

date instanceof Array; //false
```

If you would like to make a constructor that can be called without `new` and still return an instance, the `instanceof` operator can help with that.

```js
function Country(name) {
    if (!(this instanceof Country)) {
        return new Country(name);
    }
    this.name = name;
}

var country = Country('Germany');

country instanceof Country; //true
```
