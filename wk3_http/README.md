# HTTP

<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP">HTTP</a> is the protocol web clients and web servers use to communicate and transfer resources. Every time you type a url into your web browser you are initiating an HTTP request. The page that your browser then displays was delivered in the HTTP response sent by whatever server you specified with the url you typed. Every image you see on the page represents an additional HTTP request. Similarly, the stylesheets and script files that make the page display and function correctly are also requested via HTTP.

## Requests

HTTP requests start with a single line that contains the HTTP _method_ for the request, the location of the requested resource on the server receiving the request, and the version of HTTP being used.

The first line is followed by a series of zero or more lines containing _headers_. Each header has a name and a value. There is a set of standard headers with specific meanings but it is also permitted to add non-standard, custom headers.

After the headers there is a blank line that is optionally followed by a message body. For example, if the request is the submission of form data, the form data would be the body.

## Responses

HTTP responses start with a single line that contains the HTTP version being used, a _status code_, and a status message in English (e.g., OK, Forbidden, etc.).

The first line is followed by a series of zero or more lines containing _headers_. Each header has a name and a value. There is a set of standard headers with specific meanings but it is also permitted to add non-standard, custom headers.

After the headers there is a blank line that is optionally followed by a message body. For example, if the request was for a web page or an image, an HTML document or image file would be the body.

## HTTP Methods

The HTTP methods you will deal with most often are:

* **GET** - GET requests simply request a resource. GET requests cannot usefully have a body. GET responses, however, will usually have a body containing the requested resource.

* **HEAD** - HEAD is exactly like GET except the responses do not have bodies. When you make a HEAD request, you are saying that you are only interested in seeing the headers.

* **POST** - POST requests are meant to initiate an action on the server, such as the writing of the submitted data to a database.

* **DELETE** - DELETE requests are for removing a resource from the server

* **PUT** - PUT requests are for putting a new resource on the server or for replacing an existing resource. In practice, PUT requests are frequently used for updating an existing resource as well.

* **OPTIONS** - OPTIONS requests are for determining what communication options are available. Browsers automatically make OPTIONS requests to determine whether to allow a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a> request.

## HTTP headers

There are <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html">47 standard HTTP headers</a> that clients and/or servers may send. Some headers you are particularly likely to have dealings with are:

* `Cache-Control` - set by the server to indicate whether and for how long the content of the response should be cached

* `Content-Type` - set by the server to indicate the mime type of the content of the response (e.g., "text/html" or "text/css")

* `Date` - set by the server to indicate the date and time that the response originated. This header is also involved with controlling caching behavior. Clients may also set this header in requests that have a message body

* `Expires` - set by the server to indicate the date and time at which the response's content should be considered out of date. This header is also involved with controlling caching behavior

* `Host` - set by the client to indicate the host the request is intended for. Servers need to know this information because there may be more than one host on a single server

* `Referer` - set by the client to indicate the url of the previous page. Browsers only set this if the user clicks a link on a page to go to another page. It is not set if the user types in another page's url in the browser's location bar. It is also not set when going from an https page to and http page. Note that this header's name is a misspelling (it should have been _referrer_). It's too late to fix this now!

* `User-Agent` - set by the client to convey information about itself, such as its name, version number, and the operating system it is running on

* `Cookie` - set by the client and contains the cookies that have been set for the domain

* `Set-Cookie` - set by the server to communicate the cookie data that the client should send back in subsequent requests to the domain

* `WWW-Authenticate` - set by the server to indicate that a password prompt should be shown

* `Authorization` - set by the client and to communicate user credentials for access to restricted resources

* `Location` - set by the server to redirect the client to the specified url

## HTTP Status Codes

There are <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">over 50 defined status codes</a> currently. Some status codes you will frequently encounter are:

* **200 OK** - Indicates success

* **301 Moved Permanently** - Indicates that the resource has been relocated permanently. Browsers automatically redirect to the new location indicated in the response

* **302 Found** - Indicates that the resource has been relocated temporarily. Browsers automatically redirect to the new location indicated in the response

* **400 Bad Request** - The request used invalid syntax and could not be understood

* **401 Unauthorized** - Authentication is required to complete the request

* **403 Forbidden** - The client does not have permission to access the resource

* **404 Not Found** - The resource does not exist on the server

* **408 Request Timeout** - The client is taking too long and the server is shutting down the connection

* **500 Internal Server Error** - The server is unable to handle the request because of some failing on its part

* **503 Service Unavailable** - The server is down or too busy handling other requests

## Exercises

1. Use the **network** tab in Chrome's Developer Tools to inspect request and response headers as you browse websites of your choosing.

2. Install <a href="https://github.com/indexzero/http-server">http-server</a> from <a href="https://www.npmjs.com/package/http-server">npm</a> by typing the following on the command line:

    ```
    npm install http-server -g
    ```

    After it is installed, start it up with the path to your local <a href="wk2_dy4_ticker">ticker</a> project directory.

    ```
    http-server /path/to/ticker
    ```

    Assuming you named your HTML file index.html, you should be able to navigate to the page simply by typing the url http://localhost:8080 into your browser. After you do this, look at your terminal and see the log lines made for each request.
