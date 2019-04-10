# SuperTest

[SuperTest](https://github.com/visionmedia/supertest) is a tool for testing HTTP request handling. With SuperTest, you can send specific requests to your Express app or router and then make assertions about the response you receive.

When you require SuperTest, you get a function to which you must pass an Express app (or a Node `Server` object if you are not using Express). The object this function returns has methods for making requests (`get`, `post`, etc.). When you call one of these methods and make a request, you get back a promise that is resolved with a response object.

```js
const supertest = require('supertest');
const app = require('./index.js');

test('Request to /home is successful', () => {
    return supertest(app).get('/home').then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toContain('text/html');
    });
});
```

In addition to `then`, the object that is returned when you make a request also has an `expect` method that you can use to make assertions in a succinct manner.

```js
test('Request to /home is successful', () => {
    return supertest(app)
        .get('/home')
        .expect(200)
        .expect('content-type', 'text/html')
    ;
});
```

There is also a `send` method that allows you to specify a request body.

```js
test('POST request is successful', () => {
    return supertest(app)
        .post('/')
        .send('text=hello&color=magenta')
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toContain('text/html');
            expect(res.text).toContain('<title>hello</title>');
            expect(res.text).toContain('style="color:magenta;"')
        })
    ;
});
```

Here the `text` property of the response object is used to confirm that the body of the request contains the expected content.

## Exercise

Write tests that confirm that the redirects in your petition app are working correctly. The following cases should be covered by your tests:

1. Users who are logged out are redirected to the registration page when they attempt to go to the petition page

2. Users who are logged in are redirected to the petition page when they attempt to go to either the registration page or the login page

3. Users who are logged in and have signed the petition are redirected to the thank you page when they attempt to go to the petition page or submit a signature

4. Users who are logged in and have not signed the petition are redirected to the petition page when they attempt to go to either the thank you page or the signers page

Pre-written mocks for the cookie-session and csurf modules are in the \_\_mocks\_\_ folder in the root of the project. Jest will automatically use these mocks in your tests. However, you will have to configure the cookie-session mock for each of your tests. You do this by calling its `mockSessionOnce` method.

```js
const supertest = require('supertest');
const app = require('./index.js');
const cookieSession = require('cookie-session');

test('Make request with a specific session property', () => {
    cookieSession.mockSessionOnce({
        chicken: 'funky'
    });
    /* req.session.chicken will be 'funky' in the following request */
    return supertest(app).get('/').expect(200);
});
```

Unless you are using [`express.Router`](../express_router), you will have to export your app and require it in your .test.js file. If the file in which you export your app is also the file in which you call its `listen` method, your server will start listening for requests when you run your tests. This would not be a problem in and of itself. The problem would be that the server would never stop listening for requests and Jest would complain that your tests never complete. To avoid this, you can simply not call `listen` when you're running tests. If your app is not already listening on a port, SuperTest will automatically bind your app to a port it chooses when you make a request and unbind it when the request is done.

Since the module in which you call `listen` is usually the main module when you are not running tests, the following is probably a good way to avoid calling `listen` when you are running tests:

```js
if (require.main == module) {
    app.listen(process.env.PORT || 8080);
}
```

## Bonus Exercise

Write tests to confirm that your POST route for signing the petition is working correctly. You will want to confirm that

1. When the input is good, the user is redirected to the thank you page

2. When the input is bad, the response body contains an error message

Since you do not want to insert any signatures into your database when you run tests, you will have mock the module that does the query.
