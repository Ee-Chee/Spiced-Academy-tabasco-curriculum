# Social Network - Additional Features

Here is a list of additional features that would be great to add to your Social Network.

1. **Account Deletion** - Users should be allowed to delete all of the information your social network has about them. This includes:
    * Their rows in the `users` table
    * All rows that have their id in the `friendships` table
    * Every profile picture they have ever uploaded. This will require a change to how you store the urls of profile pics so that you have a record of every single one for every single user. It will also require you to use [knox](https://github.com/Automattic/knox#delete) to make DELETE requests to S3.

1. **User Search** - This should be implemented as an incremental search field. Input events should result in ajax requests and the route hit should do [database queries with pattern matching](https://www.postgresql.org/docs/9.0/static/functions-matching.html) to find matches. Note that if the users gives more input before the previous request is complete, you should probably [abort it](https://github.com/mzabriskie/axios#cancellation). You probably also should come up with a way to throttle the requests to avoid overloading your server if you have fast typers. It would be real nice if the results did not just show matching users' names but their profile pics as well.

2. **Private Messages** - Use [socket.io](../socket.io) to allow users to conduct private, one-on-one chats with other users who are their friends (but disallow private chats between two users who are not friends).

3. **Wall Posts** - Allow users to add textual messages to their own and their friends' profile screens. These should be shown in reverse chronological order and should only be visible to friends of the user whose profile the post appears on. Posts should show the author of the post, the time and date it was created, and the text. You can take this even further by allowing users to post images or links. For link posts you could crawl the submitted url to find the page's title and an image to display. Yet another enhancement would be to allow friends to comment on posts.

4. **Friend Request Notifications** - Use socket.io to alert users when they receive a friend request if the request occurs while they are using the site. You could modify the Friends link in your navigation to show in parentheses the number of open requests and increment this number every time a friend request happens. Alternatively, you could make some sort of pop up message appear.

5. **Friends on Profile Pages** - When users view the profile page of a user with whom they are friends, show them a selection of other users that are also friends with the user whose profile is being viewed.
6. **Reduxify Parts 3 through 6** - We didn't start using [Redux](../redux) until [Part 7](../social_network7) so local state is still used for a lot of components. You might prefer to use global state throughout. If you do this, you'll have to create a whole bunch of new actions, and your reducer will get a lot bigger. It would be a good time to try [splitting up your reducer logic](http://redux.js.org/docs/recipes/reducers/SplittingReducerLogic.html).
