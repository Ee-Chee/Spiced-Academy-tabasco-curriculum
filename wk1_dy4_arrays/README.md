# Arrays

Arrays are objects that can be used to store lists of items. The items may be of any type and each one can be accessed using its _index_ - its position in the array.

```js
var arr = [ 'hello world', 90210, false, Math ];

arr[0]; // 'hello world';
arr[1]; // 90210
```

Arrays have a `length` property that indicates how many items are in the array.

```js
var arr = [ 'hello world', 90210, false, Math ];

arr.length; // 4
```

Arrays can be missing elements. Such arrays are said to be _sparse_.

```js
var arr = [];
arr[2] = 5;

arr.length; // 3
arr[0]; // undefined
arr; // [ , , 5 ]
```

In the examples above, arrays are created using literal syntax. It is also possible to create arrays using the `Array` constructor but there is almost never any reason to do so. The parameters you pass to `Array` become elements of the array that is created unless you only pass one parameter and that parameter is a number. In that case that parameter becomes the length of the array that is created. If the number is not a valid length, an error is thrown.

```js
var arr = new Array(5);

arr.length; // 5

arr = new Array(-5); // error
```

## Array methods

Arrays come with many useful methods. For example, to add elements to the end of an array you can use the `push` method, which returns the new length of the array;

```js
var gettysburgWords = [ 'four', 'score' ];

gettysburgWords.push('and'); // 3

gettysburgWords.push('seven', 'years', 'ago'); // 6
```

To add elements to the beginning of an array, you can use `unshift`.

```js
var gettysburgWords = [ 'score' ];

gettysburgWords.unshift('four'); // 2

gettysburgWords[0]; // 'four'
gettysburgWords[1]; // 'score'
```

The name `unshift` makes more sense when you consider the fact that there is also a `shift` method that removes and returns the first element of the array.

```js
var gettysburgWords = [ 'four', 'score' ];

var firstWord = gettysburgWords.shift();

firstWord; // 'four';

gettysburgWords.length; // 1

gettysburgWords[0]; // 'score'
```

To remove the last item, use `pop`;

```js
var gettysburgWords = [ 'four', 'score' ];

var lastWord = gettysburgWords.pop();

lastWord; // 'score';

gettysburgWords.length; // 1

gettysburgWords[0]; // 'four'
```

Both `shift` and `pop` return `undefined` if the array is empty.

To remove items from anywhere in an array, use the `splice` method. This method takes as its first parameter a number indicating the index at which to start removal. The second parameter is the number of items to remove and if none is specified all of the elements after the index specified by the first parameter will be removed. Any additional parameters passed will be added to the array starting at the index specified by the first parameter. This method returns a new array containing the elements that were removed.

```js
var arr = [0, 1, 2, 3];

var removed = arr.splice(1, 2, 'two items missing');

removed[0]; // 1
removed[1]; // 2

arr[0]; // 0
arr[1]; // 'two items missing'
arr[2]; // 3
```

Do not confuse `splice` with the `slice` method. `slice` takes a start index and an end index as parameters and returns a new array consisting of the specified elements. The array that `slice` is called on remains unchanged. The start and end indexes can be negative numbers to indicate positions from the end of the array. If there is no end index, all of the items from the start index are in the returned array. If no parameters are passed to `slice`, a _clone_ of the array is returned.

```js
var arr = [0, 1, 2, 3];

var sliced = arr.slice(1, 3);

sliced; // [1, 2]

sliced = arr.slice(0, -1);

sliced; // [0, 1, 2];

sliced = arr.slice(3);

sliced; // [3]

sliced = arr.slice();

sliced; // [0, 1, 2, 3];

arr; // [0, 1, 2, 3];

sliced == arr; // false
```

Other extremely useful array methods:
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join">`join`</a> - converts the contents an array into a string with each item separated by the delimitor specified as the first parameter
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">`concat`</a> - returns a new array consisting of the combination of the passed in arrays and/or non-array values
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">`reverse`</a> - reverses the array
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">`sort`</a> - sorts the array. By default, it sorts alphabetically. However, a function can be passed in to specify how the sorting should occur
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">`filter`</a> - returns a new array consisting of only those elements that pass a test contained in the callback that is passed in
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">`map`</a> - returns a new array consisting of elements returned by the callback that is passed in
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some">`some`</a> - returns `true` as soon as a single elements in the arrays passes a test contained in the callback that is passed in. If none pass, `false` is returned
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every">`every`</a> - returns `true` if every item in the array passes the test contained in the callback that is passed in and `false` otherwise
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf">`indexOf`</a> - returns the index of an item in an array. If the item appears in the array more than once then only the first index is returned. If the item is not in the array then -1 is returned. Note that `===` is used to test if the specified item is in the array.
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf">`lastIndexOf`</a> - like `indexOf` but returns the index of the last occuring match in the array instead of the first
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach">`forEach`</a> - an alternative to a `for` loop

# Exercises

1. Write a function called `each` that accepts either an object or an array as its first parameter and a callback as its second parameter.

    If the first parameter is an object, it should loop over the object's properties and call the callback for each one. The property value should be the first parameter passed to the callback and the property name should be the second.

    If the first parameter is an array, it should loop over the array's elements and call the callback for each one. The array element should be the first parameter passed to the callback and the index should be the second.
    ```js
      each({
        a: 1,
        b: 2
      }, function(val, name) {
        console.log('The value of ' + name + ' is ' + val);
      }); // logs 'the value of a is 1' and 'the value of b is 2'

      each(['a', 'b'], function(val, idx) {
        console.log('The value of item ' + idx + ' is ' + val);
      }); // logs 'the value of item 0 is a' and 'the value of item 1 is b'
    ```
2. Write a function that takes an array as a parameter and returns a new array containing all of the items that are in the array that was passed in but in reverse order. Unlike the `reverse` method that all arrays have, this function should leave the original array unchanged.

3. Write a function called `getLessThanZero` that expects an array of numbers to be passed to it and returns a new array containing only those numbers from the array that was passed in that are less than zero.
    ```js
      getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
      getLessThanZero([1, 2]); //[]
    ```
