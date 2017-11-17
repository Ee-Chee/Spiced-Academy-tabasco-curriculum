# axios vs. csrf

Preventing csrf is a snap with axios because you can configure it to read the csrf token from a cookie and put it into a request header for every request it makes.

The first thing you need to do is get the csrf token into a cookie. You could do this with a middleware function on your server.

```js
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});
```

Then, when you make a request using axios on the client side, you can tell it the name of the cookie to read the token from and the name of the header to put the token into. You do this with a [configuration object](https://github.com/axios/axios#request-config).

```js
axios.post('/login', { email, password }, {
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token' // the csurf middleware automatically checks this header for the token
});
```

Adding this configuration object to every request that needs it would be a bit of a pain. Fortunately, axios gives us a way around that. You can use its `create` method to create a copy of axios that always uses a certain configuration.

```js
import axios from 'axios';

var instance = axios.create({
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token'
});

export default instance;
```

If you save the code above in a file named `axios.js`, you could change all of your `import axios` statements to import from `'./axios'` rather than `'axios'`. After that, the csrf token will be present in every request you make.


