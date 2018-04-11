# Objects

Objects are collections of properties. Properties have names and values. Property names can be any string. However, if you wish to access a property using dot syntax, the name must begin with an alphabetic character, $, or _, and contain only those same characters and/or digits. Otherwise, you must access the property with square brackets and quotes.

```js
var obj = {
  prop: 1,
  prop2: 2,
  $prop: 3,
  _prop: 4,
  '2*prop*!': 5
};

obj.prop; //1
obj.prop2; //2
obj.$prop; //3
obj._prop; //4
obj['2*prop*!']; //5
```

Property values can be strings, numbers, booleans, `null`, `undefined`, objects, arrays, and functions. That is, properties can contain any value that can possibly exist.

## The `in` operator

When you access a property of an object that does not exist, the value that is returned is `undefined`.

```js
var obj = {};
obj.prop; //undefined
```

Of course, a property can exist and have `undefined` as its value. To test whether a property exists on an object, you can use the `in` operator.

```js
var obj = {
  prop: undefined
};

obj.prop; //undefined
obj.prop2; //undefined

'prop' in obj; //true
'prop2' in obj; //false
```

## The `delete` operator
To remove a property from an object, you can use the `delete` operator. An expression with the `delete` operator will return `true` if the property can be deleted and `false` if it cannot.

```js
var obj = {
  prop: 'whatever'
};

delete obj.prop; //true
```

## Creating objects

Javascript provides multiple ways to create objects. The examples above all use _literal syntax_. It is also possible to create an object using the `Object` constructor but there is no advantage to doing so.

```js
var obj1 = {};
var obj2 = Object();
var obj3 = new Object();

obj1; //{}
obj2; //{}
obj3; //{}
```

Another way to create objects is to use the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create">`Object.create`</a> method.

```js
var obj = Object.create(null);

obj; //{}
```

The `Object.create` method accepts two parameters. The first is an object that is to serve as the _prototype_ of the object you are creating (if you do not want your object to have a prototype you can pass `null`). The second parameter is a _property descriptor_ - an object that describes properties of the object you are creating.

What is a prototype? A prototype is an object that another object _inherits_ properties from. When you access a property on an object, if that property is not found, the property is then looked for in the prototype.

```js
var proto = {
  prop: 'whatever'
};

var obj = Object.create(proto);

obj.prop; //'whatever'
```

An object can have properties that have the same name as properties of its prototype. This is called _overriding_.

```js
var proto = {
  prop: 'whatever'
};

var obj = Object.create(proto);
obj.prop = 'not whatever';

obj.prop; //'not whatever'

delete obj.prop;

obj.prop; //'whatever'
```

What is a property descriptor? A property descriptor is an object that describes a property. There are specific attributes that can be used in a property descriptor:

* **value** - the value of the property
* **writable** - a boolean indicating whether the property can be set to a new value. The default is `false`
* **configurable** - a boolean indicating whether the descriptor for the property can be changed and whether the property can be deleted. The default is `false`
* **enumerable** - a boolean indicating whether the property should appear when the object's properties are enumerated (as with a `for...in` loop). The default is `false`.
* **get** - a function to be run when the property is accessed. The value returned from the function is used as the property value
* **set** - a function to be run when the property is set

```js
var obj = Object.create(null, {
  city: {
    value: 'Berlin'
  }
});

delete obj.city; //false (error in strict mode)

obj.city = 'Dallas'; //error in strict mode

obj.city; //'Berlin'

for (var prop in obj) {
  console.log(prop); //'city' is not logged
}
```

Note that these defaults are not used when you create a property by directly setting it on an object.

```js
var obj = {
  city: 'Berlin'
};

obj.country = 'Germany';

delete obj.city; //true

obj.country = 'Canada';

obj.country; //'Canada'

for (var prop in obj) {
  console.log(prop); //'country' is logged
}

```

Other methods that use property descriptors are <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">`Object.defineProperty`</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties">`Object.defineProperties`</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor">`Object.getOwnPropertyDescriptor`</a>.

## Properties inherited from `Object.prototype`

Objects inherit a number of properties that do not show up in `for..in` loops because they are not enumerable. Four particularly important properties that all objects inherit are:

* **constructor** - The function used to construct the object. For objects created using literal syntax the constructor is `Object`.
* **hasOwnProperty** - Returns a boolean indicating whether the specified property exists directly on the object or not.
* **toString** - Returns a string represenation of the object. This method is automatically called when the object is coerced to a string. By default this method returns '[object Object]'.
* **valueOf** - This method is automatically called when an object is coerced to a primitive value. By default this method returns the object itself.
