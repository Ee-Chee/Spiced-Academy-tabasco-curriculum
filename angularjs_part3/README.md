# AngularJS - Part 3

![dwayde](https://media.giphy.com/media/3otPoEr9lqlawmVDfG/giphy.gif?response_id=592484b48e0776f4a0084ba3)

Just a few more concepts you all should know:

1. ng-model & ng-bind
2. $q & AngularJS Promises
3. Filters

## ng-model & ng-bind

To show off AngularJS' data-binding features, lets look at a simple example.

```html
<input type="text" ng-model="name">
<div ng-bind="name" ></div>
<p>Hello, {{ name }}</p>
```

Here we are making use of the **ng-bind** and **ng-model** directives.  We *bind* the ng-model with a value of "name" to the ng-bind directive with the same name.  Whatever we type into the input tag will be printed inside of the div.  You can also use interpolation (the` {{}}`) to use data binding as well.

![angularjs data binding](http://www.codescratcher.com/wp-content/uploads/2015/03/Two-way-data-binding-angularjs.gif)

## $q

$q is the AngularJS service for using promises. It works very similar to ES5 promises.

```javascript
let promise = $q((resolve, reject) => {
  if (thisCondition === "good") {
    resolve('Success!');
  } else {
    reject('Oops... something went wrong');
  }
});

promise.then(data => {
  console.log(data);
});
```

[This article](https://toddmotto.com/promises-angular-q) does a great job describing the $q service and its various methods.

## Filters

AngularJS filters are used to format our data in some way.  Angular comes with some built in filters that are very easy to use. The filters are:

- `currency` Format a number to a currency format.
- `date` Format a date to a specified format.
- `filter` Select a subset of items from an array.
- `json` Format an object to a JSON string.
- `limitTo` Limits an array/string, into a specified number of elements/characters.
- `lowercase` Format a string to lower case.
- `number` Format a number to a string.
- `orderBy` Orders an array by an expression.
- `uppercase` Format a string to upper case.

The syntax for using them is simply to use the pipe `|` in your HTML:

```html
<p>You know you make me want to {{ verb | uppercase }}!</p>
```

Of course, you can write your own custom filters with the `filter()` method. See the [AngularJS docs](https://docs.angularjs.org/guide/filter) for more on this.

## Further Reading

1. [AngularJS Cheat Sheet](https://www.cheatography.com/proloser/cheat-sheets/angularjs/)
2. [Made With Angular](https://www.madewithangular.com/#/)
