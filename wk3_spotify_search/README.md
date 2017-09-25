# Spotify Search

~~Spotify has a [search API](https://developer.spotify.com/web-api/search-item/) that doesn't require authentication and supports CORS~~. Spotify used to have a [search API](https://developer.spotify.com/web-api/search-item/) that didn't require authentication and supported CORS. It now requires authentication and pretty much can't be used via ajax directly. However, instead of `https://api.spotify.com/v1/search`, you can use the following url, passing to it all of the query string parameters that you would have passed to Spotify's endpoint: `https://elegant-croissant.glitch.me/spotify`. This url will make a request to the Spotify search API with the parameters you specify and send back the exact JSON that Spotify responds with. So let's use this url to conduct searches for artists and albums and then display the results in a pleasing manner.

* At the top of the page there should be a text field, a <a href="https://developer.mozilla.org/en/docs/Web/HTML/Element/select">`<select>`</a> element containing the options "artist" and "album", and a submit button

* When the user submits, the values of the form elements should be used to construct the url to request. Be sure to run the search term through <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent">encodeURIComponent</a> before putting it in the query string if you are building the url manually. If you are passing an object containing the query string fields to `$.ajax` or `$.get`, you do not need to call `encodeURIComponent`. jQuery will do the escaping automatically.

* When you display the results of the search, put the search term in quotes preceded by the string "Results for " in a heading above them

* If there are no results for a search, display a message that says so

* For each result, show one of the images listed in the payload as well as the artist name or album title. Both items should be linked to the url provided in the payload for playing music from that album or artist (if users are not logged in to Spotify they will see a page prompting them to log in)

* Be careful: Sometimes, Spotify will give you back results that do not have any images. Be sure to handle this case in a way that is friendly to your users.

* By default, the number of results per request is limited to 20. If there are more results, there is a field in the payload that give you the url to get the next batch. You can use the presence of this field to tell you whether or not  to include a "more" link at the bottom of the result list. Note, however, that you can't use this url to request more results directly. If you want to use it, you need to first replace `'https://api.spotify.com/v1/search'` in it with `'https://elegant-croissant.glitch.me/spotify'`. 
<img src="ledzep.gif">

## Part 2 - Infinite Scroll

If the string `scroll=infinite` appears in the query string when the page loads, no "More" button should appear. Instead, when users scroll down to the bottom of the listed results, the next page of results should be automatically loaded and appended.

Note: For the reasons described in <a href="http://ejohn.org/blog/learning-from-twitter/">this blog post</a>, do not use scroll events to accomplish this.
