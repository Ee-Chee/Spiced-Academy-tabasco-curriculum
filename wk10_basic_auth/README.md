# Basic Auth

Basic Authentication is a fairly simple way to control access to websites or parts of websites. The client sends credentials in the `Authorization` header. If the credentials are not present or invalid, the server responds with the `401` status code and  the `WWW-Authenticate` response header. This causes the browser to present the user with a password challenge dialog box. Once a successful username and password combination is entered, the browser will continue to send the successful pair in the `Authorization` header in subsequent requests for some time.

The [basic-auth](https://github.com/jshttp/basic-auth) module, which you can install via npm, handles the parsing of the `Authorization` request header for you. If the username and password are not correct, you have to send the response with the `WWW-Authenticate` header manually.

```js
var basicAuth = require('basic-auth');

var auth = function(req, res, next) {
    var creds = basicAuth(req);
    if (!creds || creds.name != 'discoduck' || creds.pass != 'opensesame') {
        res.setHeader('WWW-Authenticate', 'Basic realm="Please enter your username and password."');
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use(auth);
```

### Exercise

Select one of the directories in your [Express Portfolio](wk6_express) project and require users to provide a correct user name and password before they are able to access the files within it.




