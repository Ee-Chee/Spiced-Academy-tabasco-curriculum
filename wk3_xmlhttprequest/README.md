# XMLHttpRequest

<a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest">`XMLHttpRequest`</a> objects are used to make HTTP requests for data. These requests do not require the loading of a new page. It was originally expected that the data being requested would be in XML format, which is why "XML" is part of the name. However, there is no requirement that the data be XML and it is usually more convenient for it to be in <a href="http://json.org/">JSON</a> format. The use of JSON is so common that one might consider "XMLHttpRequest" a misnomer.

The technique of using `XMLHttpRequest` to request data to update a loaded page is often referred to as _Ajax_. The term was <a href="https://web.archive.org/web/20080702075113/http://www.adaptivepath.com/ideas/essays/archives/000385.php">coined in 2005</a> and stands for _asynchronous Javascript and XML_.

## Making requests

To make a request the first thing you do is instantiate `XMLHttpRequest`.

```js
var xhr = new XMLHttpRequest;
```

Next, you call the <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open">`open`</a> method to initialize the request.

```js
xhr.open('GET', '/users/bigben22');
```

The first parameter is the HTTP method (e.g., GET, POST, PUT, DELETE, etc.) to use. The second parameter is the url.

`open` takes a few other parameters. The third parameter is a boolean indicating whether or not the request should be asynchronous. It defaults to `true`. It is almost never a good idea to make a synchronous request. If a request is made synchronously, nothing else can happen until the response comes.

The fourth and fifth parameters are for specifying a username and password if the url requires it.

After calling `open`, the request still has not been made. This is the time to take care of one final detail: request headers. If you would like to explicitly set any request headers, you use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader">`setRequestHeader`</a> method. If you are going to use this method, you _must_ do it after calling `open` but before sending the request.

```js
xhr.setRequestHeader('Date', 'Fri, Dec 31 1999 23:59:59 GMT');
```

To actually send the request, you need to call <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send">`send`</a>.

```js
xhr.send();
```

If you want to send data as the body of the request (as you probably would with a POST or PUT request), you pass that data to `send`. There is no reason for a GET request to have a body so there is no parameter passed in our `send` call.

## Handling responses

You never know exactly how long a request will take to complete but you can make sure you find out about it when it does by listening for the `readystatechange` event.

```js
xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        //do something
    }
});
```

Note that in this event handler the <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState">`readyState`</a> property is inspected. The value of this property is a number indicating which phase of the loading process has completed. There are constants attached to the `XMLHttpRequest` constructor that correspond to the numbers so you don't have to memorize them. The constants are `UNSENT`, `OPENED`, `HEADERS_RECEIVED`, `LOADING`, and `DONE`.

Typically after a request completes you will want to check the <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status">`status`</a> property, which contains the HTTP status code with which the request was completed. The request may not have completed with a 200 (OK). It may have completed with a 401 (Unauthorized) or 500 (Internal Server Error), for example.

There are situations in which merely accessing the `status` property can cause an exception so you will want to do it with a `try...catch`.


```js
xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState != XMLHttpRequest.DONE) {
        return;
    }
    var status;
    try {
        status = xhr.status;
    } catch(e) {
        //handle error in some way
        return;
    }
    if (status != 200) {
        //handle error in some way
        return;
    }
});
```

Once you know you have a successful response, you can do something with the content of it. You can access the data using the `responseText` property. As the name suggests, the value is a string.

```js
xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState != XMLHttpRequest.DONE) {
        return;
    }
    var status;
    try {
        status = xhr.status;
    } catch(e) {
        //handle error in some way
        return;
    }
    if (status != 200) {
        //handle error in some way
        return;
    }
    var responseText = xhr.responseText;
    // do something with responseText
});
```


If the string is valid JSON, you will probably want to convert it into a Javascript object using `JSON.parse`.

```js
xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState != XMLHttpRequest.DONE) {
        return;
    }
    var status;
    try {
        status = xhr.status;
    } catch(e) {
        //handle error in some way
        return;
    }
    if (status != 200) {
        //handle error in some way
        return;
    }
    var responseText = xhr.responseText;
    var data;
    try {
        data = JSON.parse(responseText);
    } catch (e) {
        //handle the error in some way
        return;
    }
    //do something with data
});
```

## CORS

For a long time it was impossible for a page to use `XMLHttpRequest` to request a resource from a domain other than the one from which it was served because of the <a href="https://en.wikipedia.org/wiki/Same-origin_policy">same-origin policy</a>. These days <a href="https://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/">CORS</a> (_cross-origin resource sharing_) is <a href="https://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/">pretty well supported</a> by browsers.

Most of the work involved in enabling CORS is done on the server. On the client-side, most of it is handled automatically by the browser. Developers only have to take special action if they wish to include cookies in their CORS requests.
