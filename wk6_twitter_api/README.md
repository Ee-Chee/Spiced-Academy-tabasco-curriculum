# Twitter API

When we last left our <a href="wk2_dy4_ticker">ticker project</a> we were getting our headlines from a flat json file. Let's change it to get our headlines from the Twitter timeline of a news organization, such as <a href="https://twitter.com/theonion">the Onion</a>.

## Prerequisites

The <a href="https://dev.twitter.com/rest/public">Twitter API</a> requires authentication. This means credentials need to be passed with each request. If we were to make requests via ajax, we'd have to have our application's credentials available in the browser, which means they would be available to anyone using our site. Unacceptable! We will have to make our requests to the Twitter API from the server.

Twitter's API requires all requests be made with HTTPS. Thus we will use the <a href="https://nodejs.org/api/https.html#https_https_request_options_callback">`request`</a> method of Node's <a href="https://nodejs.org/api/https.html">`https`</a> module. A fuller example of how to make a request is available <a href="https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/">here</a> (this example uses the `http` module but the `https` interface is identical).

A prerequisite for using Twitter's API is creating an application at <a href="https://apps.twitter.com">https://apps.twitter.com</a>

A note about base64 encoding: This exercise requires you to base64-encode a string, and in Node.js, you can achieve this by first converting it to a Buffer (which is a representation of the string's data in binary) and then into a base64 encoded string:

```javascript
new Buffer("take a deep breath").toString("base64"); // 'dGFrZSBhIGRlZXAgYnJlYXRo'
```

## Part 1

We will be using <a href="https://dev.twitter.com/oauth/application-only">Application-only authentication</a> for this project. In order to make requests to get data, we will first have to obtain what they call a "bearer token." It is the bearer token that we will use to make subsequent requests.

Follow <a href="https://dev.twitter.com/oauth/application-only">these instructions</a> step by step to obtain your bearer token (you have to scroll down a bit past the intro stuff).

To get tweets we will use the endpoint described <a href="https://dev.twitter.com/rest/reference/get/statuses/user_timeline">here</a>. We will want to filter the results to remove tweets that do not have links and tweets that have more than one.

In your response to your ajax request, include only tweets that have just one url that appears at the end of the tweet text. Do not include tweets that have no url, have more than one url, or have one url that appears medially. You should also remove the url from the tweet text. The text itself will be contained by an `<a>` tag so there is no need to show the url.

Note that even after you confirm a tweet has only one url and you remove it from the text, other urls may still apear in the text. This is because Twitter includes in the tweet text the urls to images and videos that were included in the tweet. Just as the links in a tweet are listed in the tweet's `entities.urls` array, the media urls will be listed in the `entities.media` array. You can loop through these and remove them from the text.

## Part 2

Get headlines from two additional news sources of your choosing. The requests for tweets from all three news sources should be made simultaneously. The combined list of tweets that you send to the client should be sorted in reverse chronological order. You should also append to each tweet the name of the source in parentheses.
