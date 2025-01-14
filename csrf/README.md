# Protecting Against CSRF

To protect your Petition against CSRF attacks you must take a few simple steps.

1. First, you must `app.use` the [csurf](https://github.com/expressjs/csurf) middleware. This middleware depends on body-parser and cookie-session so you have to `app.use` it after you `app.use` those.
    ```js
    const cookieSession = require('cookie-session');
    const bodyParser = require('body-parser');
    const csurf = require('csurf');

    app.use(cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    });

    app.use(bodyParser.urlencoded({
        extended: false
    });

    app.use(csurf()); 
    ```

2. Next, you will have to update all of your templates that render forms so that there is a hidden form field in them with its name attribute set to `"_csrf"`. It is important that the field have this name because that is the name that the middleware will look for in the request body. The value you want to give the field should be the CSRF token, which, in the next step, we will make sure is available in all of your templates.

   ```html
   <form method="POST" action="/login">
      <input type="email" name="email">
      <input type="password" name="pass">
      <input type="hidden" name="_csrf" value="{{csrfToken}}">
      <button>Submit</button>
   </form>
   ```

3. Finally, you will want to ensure that the token is available in every template that needs it. You could add it to the data you pass in every relevant call to `res.render` but there is an easier way. Express automatically adds to every response object a property named `locals`. The value of this property is an object and it is there so you can add properties to it. When you call `res.render`, the properties in `locals` are merged in with the data in the object you pass as the second argument. Anything in `locals` that does not conflict with anything in the object you pass to `res.render` will be available in the template. Thus, you could easily ensure that the token is available in all templates with a simple middleware function that sets `res.locals.csrfToken` to the correct value. You can get the correct value by calling `req.csrfToken`, a function that is added to the request by the csurf middleware. 
   ```js
   app.use(function(req, res, next) {
       res.locals.csrfToken = req.csrfToken();
       next();
   });	
   ```
   Because it uses `req.csrfToken`, which is added by the csurf middleware, your middleware function will have to appear below your `app.use(csurf())` call.

 
