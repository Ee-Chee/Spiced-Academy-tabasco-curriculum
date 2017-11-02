# Express

<a href="http://expressjs.com/">Express</a> is a framework that makes serving websites with Node much easier. Many of the tasks involved in our <a href="wk5_http_request_listener">HTTP Request Listener</a> and <a href="wk5_porfolo">Portfolio</a> projects are done automatically by Express.

## Getting Started

* Create a new directory in your repo named "express-project" or something along those lines.

* `cd` into your Express project directory and install Express.

    ```
    npm init
    ```

    ```
    npm install express --save
    ```


* In `index.js` (or whatever you decided to call your main js file) `require` express and create an instance of it.
    ```js
    var express = require('express');
    var app = express();
    ```

* This would be a good time to add your first _route_, i.e., tell Express what to do when a request is made for a specific url using a specific HTTP method.

    ```js
    app.get('/hello/world', function(req, res) {
        res.send('<!doctype html><title>Hello World!</title><p>Hello World!');
    });
     ```
    The use of the `get` method means that the handler specified as the second argument will only run for GET requests to `/hello/world`.

    Route handlers are passed request and response objects that have been enhanced by Express. For example, response objects have a `send` method. Full descriptions of request and response objects in Express are available <a href="http://expressjs.com/en/4x/api.html#req">here</a> and <a href="http://expressjs.com/en/4x/api.html#res">here</a>.

    The route in this example is very simple but Express supports more complex routing as well. See <a href="http://expressjs.com/en/guide/routing.html">this guide</a> for examples and explanations of the kinds of routes you can create.

* Start listening for requests.

    ```js
    app.listen(8080);
    ```

## Middleware

Central to Express is the concept of _middleware_, functions that process requests and responses and pass them along to the next function in the chain if they do not send a response themselves.

To add a middleware function for processing all requests that are received, you use the `use` method.

```js
app.use(function logUrl(req, res, next) {
    console.log(req.url);
    next();
});
```

The above example will cause the url of every request to be logged to the console.

Note that middleware functions are run in the order in which they are added. If a middleware function added before the one in the example does not call next, `logUrl` will not run.

Express used to come with a set of very useful middleware. It was decided to break most of them out into <a href="http://expressjs.com/en/guide/migrating-4.html#core-changes">separate npm modules</a>. One of useful middleware function that is still built in to Express is `express.static`. You can use this function to specify a directory or directories from which static content (e.g., html, css, images, js files, etc.) should be served.

```js
app.use(express.static(__dirname + '/static'));
```

Files contained in the directory named "static" will now be served from "/". That is, the word "static" will not appear in the url.

## Exercises

1. Copy the projects directory from your <a href="wk5_portfolio">portfolio</a> project into your new Express project and use `express.static` to serve its contents.

2.  * Install <a href="https://github.com/expressjs/body-parser">body-parser</a> and `use` it in your Express project.

        ```js
        app.use(require('body-parser').urlencoded({
            extended: false
        }));
        ```

        This will cause a an object named `body` containing values from submitted form data to be attached to request objects.

    *   Install <a href="https://github.com/expressjs/cookie-parser">cookie-parser</a> and `use` it in your Express project.

        ```js
        app.use(require('cookie-parser')());
        ```

        This will cause a an object named `cookies` containing values from the `cookie` request header to be attached to request objects.

    *  Create a `/cookie` route that responds to GET requests with a page that warns users that to use this site they must accept cookies. The page should have a checkbox for users to indicate that they accept the cookie policy and a button to submit. When users click on the button, a POST to `/cookie` should occur.

    * In the `POST /cookie` route, check the value of the checkbox that was submitted. If the the cookie policy was accepted, set a cookie to remember that fact across requests, and redirect to one of your projects using the <a href="http://expressjs.com/en/4x/api.html#res.redirect">`res.redirect`</a> method. If the user did not accept the cookie policy, send a page that tells the user they cannot use the site without accepting cookies. You can set the cookie using the <a href="http://expressjs.com/en/4x/api.html#res.cookie">`res.cookie`</a> method.

    * If users attempt to access any route without having assented to the cookie policy, redirect to `/cookie` (unless the route is the GET or POST to `/cookie` - it is expected that they do not have the cookie when they hit those routes).
