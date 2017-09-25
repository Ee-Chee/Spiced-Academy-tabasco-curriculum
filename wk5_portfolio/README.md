# Portfolio

* Create a new directory named "portfolio" for this project.

* Add a directory named "projects" to the portfolio directory. Copy into this directory the directories containing your versions of <a href="../wk2_carousel">Kitty Carousel</a>, <a href="../wk3_spotify_search">Spotify Search</a>, etc.

* Add to the portfolio directory a main js file in which you create a server and listen on port 8080. We are only interested in GET requests so you should handle other requests by redirecting or sending an appropriate error.

* Use the `fs` module to determine what files are available to serve. If there is a file in the projects directory corresponding to the `url` property of the request object, serve that file by <a href="https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options">creating a read stream</a> and <a href="https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options">piping</a> it to the response. 

* Requests will not just be for HTML files. You will also have to serve CSS, images, Javascript and JSON as well. Be sure to set the `Content-Type` response header appropriately for each file you serve.

  | Extension | Content-Type |
  |-----------|--------------|
  | .html | text/html |
  | .css | text/css |
  | .js | text/javascript |
  | .json | application/json |
  | .gif | image/gif |
  | .jpg | image/jpeg |
  | .png | image/png |
  | .svg	| image/svg+xml |

* If there is not an item in the projects directory that matches the `url` of the request, send a 404.

## Part 2

Create a page that lists and links to all of the projects in your portfolio.

* Create a module to generate the projects page. This module should require `fs` and and use it to read the contents of the projects directory and build a list of links and link text to pass to the template. The link href can be to the project directory and the link text can just be the name of the directory containing the project. Finally, this module should add to its `exports` a method that returns the HTML string it created.

* Your main module should require the module that generates the project page HTML and write the string returned by the function it exposes to the response if the request's `url` property equals ``'/'``.
