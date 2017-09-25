# JSON

JSON is a format for data that is based on syntax used in the Javascript programming language. The name JSON stands for _Javascript Object Notation_. You already know how to write valid JSON since the format is just a stricter version of object literal syntax with which you are familiar.

JSON files are text files. If they have a file extension it is usually `.json` and when they are transferred via HTTP the content-type is usually `application/json`, although you sometimes see `text/json` and even `text/javascript` used instead.

The following is a valid JSON document:

```json
{
    "name": "Superman",
    "secretIdentity": "Clark Kent",
    "age": 77,
    "wearsCapes": true,
    "spouse": null,
    "powers": [ "flight", "strength", "x-ray vision" ],
    "residences": {
        "Metropolis": "main",
        "Antarctica": "weekends and holidays"
    }
}
```

Note that all of the property names are surrounded by quotes. In Javascript, quotes are optional for properties of object literals that are valid identifiers. They are not optional in JSON.

Below are some other examples of valid JSON documents.

```json
[ "Wonder Woman", "Batman", "Superman" ]
```

```json
"JSON is fun!"
```

```json
90210
```

```json
true
```

```json
null
```

## Dealing with JSON in Javascript

Javascript has a built in `JSON` object with two very useful methods:

* `parse` - converts a valid JSON string into a Javascript object

* `stringify` - converts a Javascript object into a valid JSON string

Both of these methods can throw exceptions when they receive invalid input. Unless you are very confident in what you are parsing or stringifying, you will want to use `try...catch` when calling these methods.

When you pass an object to `JSON.stringify` containing properties that JSON does not allow, those properties will be omitted from the resulting string and no exception will be thrown.

```js
var shape = {
    type: 'rectangle',
    width: undefined,
    height: undefined,
    getArea: function() {
        return this.width * this.height;
    }
}

console.log(JSON.stringify(shape)); //logs '{ "type": "rectangle" }'
```

Undefined values and functions are not allowed in JSON. Similarly, properties that are inherited from a prototype or are unenumerable are also omitted.

```js
var square = Object.create({ type: 'rectangle' }, {
    width: {
        value: 10
    },
    height: {
        value: 10,
        enumerable: true
    }
});

console.log(JSON.stringify(square)); //logs '{ "height": 10 }'
```
