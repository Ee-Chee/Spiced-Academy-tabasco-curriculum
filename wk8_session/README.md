# Sessions

We've seen how cookies can be used to keep data about a user available across requests. This works well in some situations but in others some problems emerge. One problem is that cookies are sent back and forth with every request and response, so they increase latency for every request, even ones that do not use the cookie data. The bigger the cookie is, the bigger this problem is. Another problem is that users can alter the cookies themselves. For example, if you are storing the user id in a cookie and using that to know who is logged in, the user can alter it and, if they guess another user's id correctly, they would be logged in as that user. This problem can be avoided by encrypting or signing the cookie (as the`cookie-session` middleware does). A big problem with cookies that can be hard to work around is that they can only hold 4096 bytes of data.

A different approach is to use session objects to store the data on the server-side, giving each object a unique and unguessable id. You put just this id in a cookie and use it to find the correct object for each request. Let's try it.

## `express-session` and `connect-redis`

The first step is to install the `express-session` middleware.

```
npm install express-session --save
```

By default, `express-session` will store session data in memory. If you restart node or if node crashes, all of the session data will be lost. You will also encounter problems if you have multiple instances of node handling your requests. For these reasons it is better to use Redis to store session data. So let's install `connect-redis`, which makes this easy to do.

```
npm install connect-redis --save
```

With both of these modules installed, you just have to do a little configuration in the file in which you set up your Express router.

```js
const session = require('express-session'),
const Store = require('connect-redis')(session);

app.use(session({
    store: new Store({
        ttl: 3600,
        host: 'localhost',
        port: 6379
    }),
    resave: false,
    saveUninitialized: true,
    secret: `I'm always angry.`
}));
```

There are many other options you can use with `express-session`. For example, you can set how long sessions are supposed to last and set the properties of the cookie that has the session id in it. See the project's <a href="https://github.com/expressjs/session">github page</a> for full details.

Once the middleware is in place, every request will have a `session` property. It is an object to which you can add and remove properties and from which you can read properties at will.

```js
app.get('/payment', function(req, res, next) {
    if (!req.session.user) {
        return res.sendStatus(403);
    }
    if (!req.session.user.paymentMethods) {
        req.session.user.paymentMethods = [];
    }
    res.render('payment', {
        paymentMethods: req.session.user.paymentMethods
    });
});
```

You can manually end a session by calling <a href="https://github.com/expressjs/session#sessiondestroy">`req.session.destroy`</a>.

## Exercise

Modify your <a href="../wk7_petition">petition project</a> to use sessions. Since you are already using `cookie-session`, this change is relatively minor.
