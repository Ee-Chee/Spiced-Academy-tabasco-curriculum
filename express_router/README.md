# Fun with Express

We will be talking about

- Express Router
- app.route()
- Modularizing your Express app

## Express Router

Express Router is like a mini-version of an express app, but it only handles routes.  It allows you to use all the routing APIs to configure your routes. When you initially set up an Express app, it comes with a default router object - the one that we all have been using up to this point.  `Express.Router` essentially sets up a **sub-router**. So you can create multiple sub-routers to handle different types of routes, depending on how you want to organize your app.

To set it up, all you need is:

```javascript
// ./routers/router.js

var express = require('express'),
    router = express.Router();
```

Then you're ready to go!

You use the Router as you normally would when writing your routes in express.

```javascript
// ./routers/router.js

router.get('/', (req,res)=>{
  res.render('home');
});

router.post('/signup', (req,res)=>{
  // run your post route
});

//export your router
module.exports = router;
```

Include it in your server with: 

```javascript
// server.js

var router = require('./routers/router')

app.use(router)
```

If you pass a path as the first parameter to `app.use`, the router you pass as the second argument will apply to that path. For example, if you have a router that defines a route for `/home` and you pass that router as the second argument to `app.use` with `/about` as the first argument, the url that will match the `/home` route will be `/about/home`.

## Writing multiple routes with the same URL using app.route()

Calling `.route` on an instance of `Router` returns a route instance for the given url. Calling `get`, `post`, etc. on this instance also returns the route instance, allowing you to chain calls: 

```javascript
router.route('/profile')

    .get((req, res) => {
        res.redirect('/');
    })

    .post(req, res) => {
        var age = req.body.age,
            city = req.body.city,
            homepageUrl = req.body.homepage_url,
            userId = req.session.user.id;

        db.upsertUserProfile(age, city, homepageUrl, userId)
            .then(() => res.redirect('/sign'))
            .catch(err => console.log(err))
    })
;
```

The above is the same as writing….

```javascript
router.get('/profile', function(req, res){ /*...*/ });

router.post('/profile', function(req, res){ /*...*/ })

router.put('/profile', function(req, res){ /*...*/ })
```



## Structuring your Express App

As your app grows, it is essential that you organize your code in a way that supports understandability and maintainability. In the sample directory structure below, there is a place for all of the different kinds of modules you may require. 

```
- app
    ----- models/
    ------------- user.js
    ----- routers/
    ------------ router.js
    ------config/
    -------------- db.json
    ----- views/  <!-- server-side templates -->
    ----- public/ <!-- static assets -->
    -------------- css/
    -------------- js/
    -------------- images/
    ---------------index.html
    - package.json
    - server.js
    - node_modules/
```

With a directory structure like this in place, you could create as many different modules that export routers as you like, perhaps one for each section of your site. Your `server.js` could be primarily for calling `app.use` - first with middleware that you would like to apply to all routes, and then with the individual routers you have created.
