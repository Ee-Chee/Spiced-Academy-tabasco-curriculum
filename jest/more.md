# More Jest

## Mock Functions

Very often you want to write tests to confirm that your code is causing functions to be called at the right time and in the right way. For example, you might wish to confirm that an event handler is actually being called whenever the event occurs or that a callback is called with the correct arguments. Jest allows you to do this with [mock functions](https://jestjs.io/docs/en/mock-functions). To create a mock function, you call `jest.fn`.

```js
const myMockFn = jest.fn();
```

You can also pass a function to `jest.fn` to specify the behavior of the mock function you are creating.

```js
const myMockFn = jest.fn(n => n * 2);
```

Once you create a mock function you can use it in your test code and then examine its `mock` property to confirm that the expected behavior has occurred. The value of the `mock` property is an object that has properties containing information about how the function has been called. Of particular use are the `calls` property, which is an array containing arrays of all of the arguments the mock function was passed each time it was called, and the `results` property, which is an array containing objects that have information about what was returned from each call.

```js
const myMockFn = jest.fn(n => n * 2);

test('map calls function correctly', () => {
    const a = [10, 20, 30];
    a.map(myMockFn);

    expect(myMockFn.mock.calls.length).toBe(3);

    expect(myMockFn.mock.calls[0]).toEqual([10, 0, a]);

    expect(myMockFn.mock.calls[1]).toEqual([20, 1, a]);

    expect(myMockFn.mock.calls[2]).toEqual([30, 2, a]);

    expect(myMockFn.mock.results[0].value).toBe(20);

    expect(myMockFn.mock.results[1].value).toBe(40);

    expect(myMockFn.mock.results[2].value).toBe(60);
});
```

When you [mock an entire module](../jest#mocking-dependencies), Jest creates mock functions for all methods that the module exposes. `jest.fn` lets you create mock functions that are detached from any object.
