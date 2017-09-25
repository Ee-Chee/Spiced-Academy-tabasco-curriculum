Your <a href="../wk9_simple_message_board">single page app</a> is about to become a double page app! What we want to do is create a new page on which logged in users can see every message they have written and delete the ones they now regret. We want to use AngularJS for this, so a new page is necessary.

The following Express routes are required:

| Path | HTTP Method | Notes |
| ---- | ---- | ---- |
| `/user/history` | GET | This should be an HTML page but note that we cannot easily use Handlebars to generate it since it should contain Angular template code and Handlebars would attempt to render that stuff |
| `/user/messages` | GET | This route should return in JSON format all of the messages that the logged in user has written.
| `/message/:id` | DELETE | This route should delete the message with the specified id and return a JSON response indicating success or failure. It is _critical_ that this route makes sure that the logged in user was in fact the author of the message to be deleted. |

When the page loads, a controller should be created and it should use `$http` to make a request to `/user/messages`. When the response arrives, the controller should attach the messages to the `$scope`, causing them to be rendered.

Each message should have a `delete` button and clicking it should trigger a request to `/message/:id` using the DELETE method. You can use the <a href="https://docs.angularjs.org/api/ng/directive/ngClick">`ng-click`</a> directive to catch the click on the button.

After a successful deletion, the displayed list should update. If there are no messages to display, a message explaining the situation to the user should be shown.

If we don't use Handlebars to render this page on the server, a question arises as to how to get the CSRF token to the page (it is pretty important that the token be in the request to delete a message). A simple way to make it available would be to put it in the response to the request to get the messages. You could also put it in a cookie and access it in the browser using `document.cookie`.
