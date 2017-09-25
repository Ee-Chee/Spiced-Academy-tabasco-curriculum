# `jQuery.ajax`

<a href="http://api.jquery.com/jQuery.ajax/">`jQuery.ajax`</a> takes a lot of the tedium out of making ajax requests.

```js
$.ajax({
    url: '/users',
    method: 'GET',
    data: {
        limit: 20
    },
    success: function(data) {
        console.log(data);
    }
});
```

The `data` property in the options passed to `$.ajax` is converted into a query string for GET requests. For POST requests it becomes the body of the request.

There are many other fields you can add to the options you pass to `$.ajax`. For example, you can add an error handler, specify the content type of the body of the request, and set request headers.

To make things even simpler, jQuery provides shorthand methods for making common types of requests. For example, the following is equivalent to the `$.ajax` call above.

```js
$.get('/users', { limit: 20 }, function(data) {
    console.log(data);
});
```

jQuery also makes it possible to do things for all ajax requests globally. For example, if there is something you would like to do every single time an ajax request starts or completes, you can use <a href="http://api.jquery.com/category/ajax/global-ajax-event-handlers/">ajax event handlers</a>. You can also use <a href="http://api.jquery.com/jQuery.ajaxSetup/">`$.ajaxSetup`</a> to set defaults for every request and <a href="http://api.jquery.com/jQuery.ajaxPrefilter/">`$.ajaxPrefilter`</a> to conditionally modify each request before it is made.

## Exercise

Create a json file containing the text and hrefs of the links in your <a href="wk2_dy4_ticker">ticker project</a> and remove the links from your html file. When the page loads, make an ajax request to fetch the text and hrefs and, once you have them, insert the links into the page. Once the links are in the page, start the animation. To test this you should use http-server.

```bash
http-server /path/to/ticker
```
