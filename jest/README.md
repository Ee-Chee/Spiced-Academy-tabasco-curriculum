# Jest

[Jest](https://jestjs.io) is a Javascript testing solution that was developed at Facebook. It works particularly well with React projects and, consequently, has become popular.

Once you have installed Jest in your project, you will typically update your package.json like so:

```js
"scripts": {
    "test": "jest"
}
```

This will allow you to run all the tests in your project by typing

```
npm test
```

When you run Jest, it will look for all the files in your project whose names end in `.test.js` and run them. It will also print the results of the tests to the console.

## Writing tests

Jest provides a global function named [`test`](https://jestjs.io/docs/en/api#testname-fn-timeout) that you use to define an individual test.

```js
test('This is a label for my test', () => {

});
```

The first argument is important because Jest will use it to tell you if this test fails. The function that is passed as the second argument is where you do the actual business of the test. This will involve calling the [`expect`](https://jestjs.io/docs/en/expect) method and passing it a value that you want to confirm something about. An 'expectation' object is returned. This object has various methods called ["matchers"](https://jestjs.io/docs/en/using-matchers) that you can use confirm that things are working correctly.

```js
const invertCase = require('./invert-case');

test('cases are flipped correctly', () => {
    const str = invertCase('funky CHICKEN!!!');
    expect(str).toBe('FUNKY chicken!!!');
});
```
In the example above, the `toBe` matcher will cause the test to fail if the string passed to it is not equal to the string that was passed to `expect`.

A fairly large variety of matchers are available.

```js
const reverse = require('./reverse');

test('returned array is reversed', () => {
    const reversed = reverse([10, 20, 30]);
    expect(reversed).toContain(20); // confirm a value is contained in an array
    expect(reversed).toEqual([30, 20, 10]); // confirm that an object has the expected properties by comparing it to one that does
});
```

The [`expect`](https://jestjs.io/docs/en/expect) documentation contains an exhaustive list of matchers.

### Testing asynchronous functions

When testing a function that does something asynchronously, you have to take steps to ensure that Jest waits until the asynchronous action is complete before declaring the test a failure. For functions that take callbacks, you can accomplish this by calling a function that Jest passes to the function that you pass to `test`.

```js
const {readdir} = require('fs');

test('confirm index.html is present', done => {
    readdir(`${__dirname}/public`, (err, files) => {
        expect(files).toContain('index.html');
        done();
    });
});
```

Testing functions that return promises is a little nicer. All you have to do is return a promise from the function you pass to `test` and Jest will wait for the promise to be settled.

```js
const {readdir} = require('fs').promises;

test('confirm index.html is present', () => {
    return readdir(`${__dirname}/public`).then(
        files => {
            expect(files).toContain('index.html');
        }
    );
});
```
### Mocking dependencies

When you write unit tests, you really only want to test the unit - the function or module that you are testing. If the thing you are testing has dependencies, you don't want your test to fail because of something going wrong with those dependencies. To avoid this, when you run your test you replace the dependencies with _mocks_, temporary substitutes that simulate the behavior of the dependencies. This has the added benefit of speeding up your tests.

Imagine that you have a module named `request` that has a method named `get` that makes an HTTP request and returns a promise that is resolved with JSON data. Further, imagine that you have a module named `actors` that has a method named `getAverageAge` that uses `request.get` to fetch an array of actor objects and then calculate their average age. To test `actors.getAverageAge`, you would want to mock `request` and have the mock's `get` method return canned data without actually making an HTTP request. Here is what an `actors.test.js` that does this would look like:

```js
const actors = require('./actors');
const request = require('./request');

jest.mock('./request');

test('average age', () => {
    request.get.mockResolvedValue([
        {
            age: 43
        },
        {
            age: 27
        },
        {
            age: 68
        }
    ]);
    return actors.getAverageAge().then(
        average => {
            expect(average).toBe((43 + 27 + 68) / 3);
        }
    );
});
```
The call to `jest.mock` creates an object that has all of the same methods as the `request` module but, by default, they don't do anything. They do, however, have methods attached to them that allow you to alter their behavior for your testing purposes. `mockResolvedValue` is one such method. A full list can be found in the [mock function documentation](https://jestjs.io/docs/en/mock-function-api).

## Exercises

To do these exercises you must first pull a commit from another branch into your own. The command to do this is:

```
git cherry-pick 09d02bad
```

If you get an error try doing `git remote update` first. After you successfully cherry pick the commit, you will have in your branch a directory named `testing`. You should `cd` into it and type `npm install` to install Jest. The files you need for the exercises are in the `exercises` directory.

1. `countries.js` exports a `find` function to which you can pass a string and get back an array containing up to four countries that begin with that string. In `countries.test.js` you should write tests that confirm that this function is working correctly. The important things to test are:
    * When `find` is passed an empty string, it returns an empty array
    * The array that it returns contains no more than four matches
    * The search is case insensitive
    * If there are no matching countries, an empty array is returned
2. `spotify.js` exports a method named `search` that does an `http` request to get search results from Spotify. `albums.js` exports a method named `getAlbumNames` that calls `spotify.search` to get a list of albums and then returns an array containing just the album names in alphabetical order.
    `albums.test.js` contains a test of `albums.getAlbumNames` that is not passing. The problem is that the `spotify` module is mocked but nothing has been done to make the mock's `search` method return what `albums.getAlbumNames` and the test expects. Your task is to correct this problem and make the test pass.
3. `fn.test.js` contains three tests but none of them are passing. Modify `fn.js` to make them pass.
