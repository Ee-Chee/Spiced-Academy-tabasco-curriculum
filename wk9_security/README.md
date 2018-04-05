# Security

We have already discussed <a href="https://github.com/spicedacademy/fullstackcohort1/tree/master/wk7_node_postgres#important-note-about-preventing-sql-injection">preventing SQL injection attacks</a>. There are several other vulnerabilities that are extremely easy to introduce into your site by accident. It is best to use libraries and adopt policies and procedures that help you to prevent these vulnerabilities. However, even if you do this, you must remain constantly vigilant.

## `eval`

`eval` is a global Javascript function that we have not yet looked at primarily because using it is almost always ill-advised. It accepts a string as a parameter and expects that string to consist of Javascript code. It compiles the string passed to it and runs it.

There are actually multiple reasons to avoid `eval` but the one we are concerned with here is security. If the string you pass to `eval` is not trusted (if, for example, it was provided by a user), anything could happen.

It is important to know that `eval` is not the only thing that does what `eval` does. Both `setTimeout` and `setInterval` can take a string rather than a function as an argument. Also, the `Function` constructor takes a string representing the body of the function to be created by it.

Fortunately, it is very easy to avoid using all of these things and it is a good idea to do so unless there is absolutely no other way to achieve your goals. If you do use them, you must be absolutely certain that the string you pass cannot do any mischief. The string you pass must come from a trusted source.

## Open Redirects

If you put a url in a query string parameter and redirect to it without confirming that it is a url you want to redirect to, attackers can use this to fool users into thinking they are going to your site and instead send them to their own site. They can make their site resemble yours and attempt to extract information from users. You should always confirm that redirects go to an approved place.

## Clickjacking

Clickjacking is tricking users into thinking they are clicking on one thing when they are really clicking on another. To get somebody to click on a button on your site when they think they are clicking on something else, an attacker may load your site in a frame on another site. To prevent this from happening you can use the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options">X-Frame-Options</a> header to disallow framing of your page by unauthorized parties.

## XSS

Cross-site scripting (abbreviated _XSS_) vulnerabilities allow attackers to inject their own scripts into your pages. It is common to take input from users and show it to other users. It is critical that this input be _sanitized_ before it is displayed. If it contains HTML that is not escaped, attackers can include their own scripts on your page and do anything they want.

Sanitizing involves escaping the characters &, <, >, ", and ', all of which are meaningful in HTML. Keep in mind that if you want to put untrusted content into `<script>` tags, they must be escaped for Javascript rather than HTML. Another complicating factor is that you sometimes want to allow users to include some HTML formatting of the content they submit.

There are numerous sanitization libraries available. Handlebars helps a great deal by automatically escaping everything. If you want to use unescaped content in a Handlebars template, you have to take special action. This makes it easier to avoid accidents but can also lull you into a false sense of security and make you let down your defenses. So be careful!

To further aid in preventing XSS attacks, most browsers now support the <a href="https://developer.mozilla.org/en/docs/Web/Security/CSP/CSP_policy_directives">`Content-Security-Policy`</a> header, which allows you to specify the precise origins from which scripts and other resources may be included in your site.

## CSRF

Cross-site request forgeries (CSRF) exploit the fact that browsers automatically send cookies set by a domain with every request to that domain. If a user who is logged in to your site goes to another malicious site, the malicious site can invisibly make a request to yours and it will look to you like it is a legitimate request from a logged-in user. This is a big problem if the request does anything more than simply return content.

In the future this problem will go away when browsers support the ["SameSite"](https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-3.2) attribute for cookies but we are not there yet. For now, the standard solution to this problem is to include in every legitimate request a token that verifies the request comes from your site. The <a href="https://github.com/expressjs/csurf">csurf</a> middleware helps with this. It automatically creates a token and it will automatically reject susceptible requests that do not have the token in <a href="https://github.com/expressjs/csurf#value">one of the places it looks for it</a>. All you have to do is make sure that the token is present for legitimate requests.

You should probably also create a custom <a href="http://expressjs.com/en/guide/error-handling.html">error handling middleware</a> function so that these errors, and other errors, do not result in a stack trace being displayed to users.

## Exercise

Modify your <a href="../wk7_petition">Petition project</a> so that all POST requests are rejected if a CSRF token is not present. This requires
* Using the <a href="https://github.com/expressjs/csurf">`csurf`</a> middleware

* Passing to the templates containing forms the CSRF token (which is returned by calling `req.csrfToken` in routes using `csurf`) and inserting it into a hidden form field with the name `_csrf`, as in <a href="https://github.com/expressjs/csurf#example">this example</a>.
