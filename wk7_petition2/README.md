# Petition - Part 2

The next thing we would like to do is show users the signature they submitted on the page they see immediately after signing.

<img src="petition5.png" alt="Signature">

Remember that after signing the petition users see this page every time they visit the site. This means that we have to remember the `id` of the row that was inserted into the `signatures` table when they signed. We could simply put it in a cookie but there is a problem with that. It is fairly easy for users to tamper with their cookies. If they did, they would be able to see other peoples' signatures, and we don't want that.

The solution to this problem is to use the <a href="https://github.com/expressjs/cookie-session">`cookie-session`</a> middleware. When you use `cookie-session`, a `session` object is available on `req` objects. Any properties you add to `req.session` will be available to you on subsequent requests. Before responses are sent, the middleware causes this object to be stringified, base64 encoded, and written to a cookie. When requests are received, the middleware decodes the string, parses it, and attaches it to the request object before your routes run, making it available to you.

Tampering is prevented because of a second cookie that is automatically added. This cookie contains a _hash_ of the data contained in the first one. Any disparity in what was sent and what is subsequently received will be detected.

To use `cookie-session` you just have to require it and do some initial configuration.

```js
var cookieSession = require('cookie-session');

app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
```

The `secret` is used to generate the second cookie used to verify the integrity of the first cookie.

`maxAge` is for setting how long the cookie should live. In the example above, the cookie will survive two weeks of inactivity.

With the middleware in place, you can set arbitrary data on `req.session` and read it on subsequent requests.

```js
req.session.signatureId = id;
```

Something like the above line is what you should do after inserting a new signature into the `signatures` table. You should check for the presence of the property you add to `req.session` to determine whether or not the user has signed the petition, and you should use the value to query the database for the data to place in the `src` attribute of an `<img>` tag on the page shown to people who have signed the petition.

When you want to end the session (i.e, log out the user), you can set `req.session` to `null`.
