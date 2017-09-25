# Status review

At this point our petition project has a number of views and routes. Some of them may only be accessed when users are logged out, others only when users have already signed the petition. Let's review what status allows users to go where and how to enforce those restrictions efficiently using Express middleware.

## Permissions

| Route             | Condition |
| ----------------- | --------- |
| /login            | O         |
| /register         | O         |
| /profile/add      | L         |
| /profile/edit     | L         |
| /petition         | LN        |
| /petition/signed  | LS        |
| /petition/signers | L         |

L = logged in only
S = signed petition only
N = not-signed only
O = logged out only

## App-level middleware

You can choose the granularity with which you apply your middleware. One option is to use `app.use` so that all your requests pass though this middleware. We can see that the majority of our routes require users to be logged in, so it makes sense to put our logged-in check on the app level and to make two exceptions in the middleware like so:

```javascript
app.use(function(req, res, next) {
    if (req.url != '/register' && req.url != '/login') {
        if (!req.session.user) {
            res.redirect('/register')
        } else {
            next();
        }
    } else {
        next();
    }
});
```

## Route-level middleware

Other restrictions we need, like checking if the user has signed the petition or not, are only needed on individual routes and it doesn't make sense to apply them to all requests. Instead, we can use middleware in individual routes like so

```javascript
app.get('/login', requireNotLoggedIn, function(req, res) {
    res.sendStatus(200);
});
```

This is what `requireNotLoggedIn` could look like:

```javascript
function requireNotLoggedIn(req, res, next) {
    if (req.session.user) {
        res.redirect('/petition');
    } else {
        next();
    }
}
```

## Writing middleware functions

You can write your own middleware functions in whatever way you need. The only thing you have to keep in mind is that they should accept the arguments `req`, `res` and `next`. They should also either send a response or call `next` - whichever is appropriate. If you forget to do either, the client's request will be left hanging and your users never get a response.

## Middleware for our petition project

With all this in mind, we have a battle plan for our petition. We know which routes require which conditions and we know what to do when those conditions aren't met:

| Route             | Condition | if (!condition)                       |
| ----------------- | --------- | ------------------------------------- |
| /login            | O         | -> /petition                          |
| /register         | O         | -> /petition                          |
| /profile/add      | L         | ->/register                           |
| /profile/edit     | L         | -> /register                          |
| /petition         | LN        | -> /register \|\| -> /petition/signed |
| /petition/signed  | LS        | -> /register \|\| -> /petition        |
| /petition/signers | L         | -> /register                          |

This can serve as handy checklist when building your application but also as a plan for testing for when you're done!