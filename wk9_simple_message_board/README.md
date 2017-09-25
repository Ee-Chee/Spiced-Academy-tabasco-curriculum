# Message Board SPA

Let's create a simple message board as a single-page application using Backbone.

On the server-side, we only need one route that serves an HTML page (all other routes will be requested with ajax and should send JSON responses). The page it serves should display just an empty shell that will be populated with content by client-side Javascript. It should also contain the <a href="../wk4_handlebars">client-side templates</a> required to do this.

There should be two client-side routes. One should display log in and registration forms. These forms should be submitted using ajax, so if you use actual `<form>` tags you will have to cancel the `submit` event. The registration form should have fields for email address, password, and the user's name. The log in form should just have email and password.

Once the user is logged in, the second route should be automatically navigated to. The user should see the following items:

* A `<textarea>` for entering a message (limit the amount of text that can be entered to 255 characters)

* A button for submitting a message

* Every message that has been submitted so far in reverse chronological order. Each message should show the text that the user entered as well as the time at which the message was submitted and the name of the user who submitted it

* A button for refreshing the messages to see any that have been submitted since the user arrived on the page

* A log out button
