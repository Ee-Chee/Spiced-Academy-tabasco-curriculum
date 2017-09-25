## Why tests?

A test is when you check an expected outcome from an certain input. You have performed a lot of tests already because you wrote code and then checked its functionality by running it.

You have also probably experienced the situation where you complete a functionality and go on to work on a new feature, only to find that the previous feature suddenly doesn't work anymore. This is called regression.

In software development, it often makes sense to automate tests, so that after making changes, they are fast and easy to run and you can be reasonably sure that there has been no regression. An automated test is really just a function that calls another function with certain input and checks the output:

```javascript
function ifAThenB(letter) {
    if (letter === 'A') {
        return 'B';
    }   
}

function test() {
    var result = ifAThenB('A');
    if (result != 'B') {
        console.log('fail');
    } else {
    	console.log('pass');
    }
}
```

## Types of tests

There are three types of tests and you have probably done each kind manually:

1. When you write code for a login on your website and then run it and try if logging in works correctly, you test your application by doing the same things a user would. This is called *user acceptance testing*.
2. When you use Postman to send requests to an endpoint  to check if you get back the expected result, this is called *integration testing*. 

3. When you write functions or modules and run them individually, that is a *unit test*.


All three types of test can be used in combination to make sure an application works as it should. 

![](titanic.jpg)

## Tests as spec and TDD

Unit tests specify how a module works. They do not care about what happens inside the module, just its interface to the outside world (its API). When testing your units, always think about their expected outcomes given certain inputs.

Because tests can describe a unit's functionality accurately, when they are well written, they can serve as the specification for an application. It can thus make sense to write the tests before the code.

One way to work with this is test-driven development (TDD). In this style of programming you focus on a test, let it fail (because there is no code yet) and then write just enough code to make it pass. Then you start over with the next test. This makes sure all code is  you write is tested and also that you stick to the specification and don't build anything unneeded.

Many teams and open-source projects have a setup where new features must have tests and all tests run automatically with every push to the project - so it’s good to be prepared. Let’s practice!

## Installation and setup

Create a new directory and in it, run `npm init`. 

[mocha](https://mochajs.org/) is a framework that allows you to run tests and [chai](http://chaijs.com/) is an assertion library that lets you write your tests in (almost) human language.

```
npm install mocha --save-dev
npm install mocha-cli -g
npm install chai --save-dev
```

Open the `package.json` and in its `test` property, put "mocha". Create a "test" directory - all your test files will go here.

## Unit test with Mocha

Place the `aThenB` function in a module and export it. Your test file would then look like so:

```javascript
var expect = chai.expect;
var aThenB = require('../ab');

describe('a then b', function() {
    it('returns B for A', function() {
        expect(aThenB('A')).to.equal('B');
    }); 
    it('does not return B for something other than A', function() {
        expect(aThenB('X')).to.be.null;
    }); 
});
```

Run this test by running `npm test` and read about the [other types of assertions](http://chaijs.com/api/bdd/) you can make in your tests.

## Testing asynchronous code

An asynchronous function doesn't return a value but instead passes it to its callback function. Keep this in mind when testing an asynchronous function - you have to run your test in the callback you pass to it. For example:

```javascript
function somethingAsync(callback) {
  callback(null, 'data');
}

describe('something async', function() {
  it('calls back with data', function() {
    somethingAsync(function(err, result) {
      expect(err).to.be.null;
      expect(result).to.equal('data');
    });
  });
});
```

## Mocking dependencies

A unit test should do what it says - only test the unit, not any other modules the unit depends on. For example, if your module uses `request`, we don't want to test `request`'s functionality. We only want to check if our module calls http correctly and does the right things with the data it gets back from `request`. Consider this:

```javascript
var request = require('request');
module.exports = function (url, callback) {
    request(url, function (err, res, body) {
        if (err) {
            return callback(err);
        }   
        callback(null, body);
    }); 
};
```

In order to not depend on an actual HTTP request, let's mock that module by using [rewire](https://www.npmjs.com/package/rewire) and always call the callback with the same static result:

```javascript
var rewire = require('rewire');
var httpReq = rewire('./httpreq');
var expect = require('chai').expect;

describe('call to Facebook', function() {
    it('is called with correct URL', function() {
        var mockRequest = function(url, callback) {
            expect(url).to.equal('http://www.facebook.com/latestposts');      
            callback(null, {}, 'success');
        };
        httpReq.__set__('request', mockRequest);
        httpReq('http://www.facebook.com/latestposts', function(err, result) {
            console.log(result); // => "success";
        });
    });

    it('calls back with error in error case', function() {
        var mockRequest = function(url, callback) {
            callback(new Error("boom"));
        };
        httpReq.__set__('request', mockRequest);
        httpReq('http://www.facebook.com/latestposts', function(err, result) {
            expect(err).to.be.an('error');                                    
            expect(result).to.be.undefined;                                   
        });                                                                   
    });                                                                       
});                                                                           
```

## Exercises

Take a look at [these](./fizz-buzz.js) [three](./fizz-buzz-callback.js) [files](./fizz-buzz-random.js) and write unit tests for each of them.

**Bonus**: Find out how to use [Istanbul](https://www.npmjs.com/package/istanbul) and see if you can get your test coverage to 100%.