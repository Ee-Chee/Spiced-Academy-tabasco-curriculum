Write a module that describes a url passed to it as a command line argument. It should log to the console the following parts of the url: the protocol, the host, the hostname, the port, the path, the pathname, and the query string. Additionally, if there is query string in the url, it should log the value of each parameter.

For example, if you run the module with "http://127.0.0.1:8080/test?a=100&b=200" as input

```
node index.js "http://127.0.0.1:8080/test?a=100&b=200"
```

you would get the following as output

```
The protocol is http:
The host is 127.0.0.1:8080
The hostname is 127.0.0.1
The port is 8080
The pathname is /test
The query is a=100&b=200
The value of the a parameter is 100
The value of the b parameter is 200
```

All of this can be accomplished using Node's <a href="https://nodejs.org/api/url.html">url</a> and <a href="https://nodejs.org/api/querystring.html">querystring</a> modules, both of which have a `parse` method that accepts a string as a parameter and returns an object. (The [parse](https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost) method of the url module is described as a legacy API. It is not deprecated, however, and you can feel free to use it.)
