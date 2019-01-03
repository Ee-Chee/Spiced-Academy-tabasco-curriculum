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

## Tests as spec and TDD

Unit tests specify how a module works. They do not care about what happens inside the module, just its interface to the outside world (its API). When testing your units, always think about their expected outcomes given certain inputs.

Because tests can describe a unit's functionality accurately, when they are well written, they can serve as the specification for an application. It can thus make sense to write the tests before the code.

One way to work with this is test-driven development (TDD). In this style of programming you focus on a test, let it fail (because there is no code yet) and then write just enough code to make it pass. Then you start over with the next test. This makes sure all code is  you write is tested and also that you stick to the specification and don't build anything unneeded.

Many teams and open-source projects have a setup where new features must have tests and all tests run automatically with every push to the project - so it’s good to be prepared. Let’s practice!
