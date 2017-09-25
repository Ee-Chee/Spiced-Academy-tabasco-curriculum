# Penultimate Project

For our second-to-last project, let us split up into teams and make a site that allows users to post and comment on links, similar to <a href="https://www.reddit.com/">Reddit</a> and <a href="https://news.ycombinator.com/">Hacker News</a>.

## Required features

* Only users who are logged in may post links or comment so there must be a mechanism for users to register and log in.

* Posted links should be shown in reverse chronological order based on the time at which they were posted.

* When posting a link users should be able to specify the text to show for the link.

* Reasonable efforts should be made to prevent duplicates.

* When a posted link is shown there should be beneath it a link to comments. When users click this link they should see a view of all of the comments that have been posted about the link.

* When links and comments are shown, the name of the user who created them should also be shown. The user name should be clickable to a view of information about the user, including lists of all the links and all the comments the user has posted.

* The comments should be threaded. Users can respond to specific comments.

* The site must look good and it must look good on both desktops and phones.

* Core features must have tests

* At least one optional feature must be implemented and you should implement as many as you can.

## Optional features

* Crawl the link posted and find an appropriate image to display with the link. If the page has a `<meta property="og:image">` tag, use that.

* Allow users to upvote links and show the number of votes each link has received. The next step is to create a view in which links are shown in order of popularity.

* Allow users to upvote comments and sort comment threads by how many votes they have received.

* Allow users to <a href="https://developers.facebook.com/docs/facebook-login/web">log in with Facebook</a>.

* Allow users to favorite or bookmark links and make a view of all of their favorited links available to them.

* Allow users to add tags the links they submit. Display the tags with the link and make them clickable to a view of all links that have that tag.

## Stack

It is expected that you will use Node/Express and PostgreSQL. To reduce the number of dependencies, do not use Redis. For sessions you should use the <a href="https://github.com/expressjs/cookie-session">cookie-session</a> middleware.

Use of jQuery is optional. Use of Backbone or Angular is optional. You are not required to use Handlebars but it is hard to imagine how you could get by without templating (unless, perhaps, you use Angular).

It is not necessary that the entire site be a SPA but it is expected that the bulk of requests will be made with ajax.

## Process

You and your team should divide work among yourselves. A typical way to divide work is to have one or more people responsible for server-side stuff (express routes, database queries, etc.) and one or more other people responsible for client-side stuff (ajax requests, CSS, etc.).

There should be a repository for this project and team members should work in branches and create pull requests whenever a discrete piece of work is complete. It is expected that all code will be reviewed by at least one team member who did not write it before it is merged.

There should be daily stand ups and periodic reviews of working code.
