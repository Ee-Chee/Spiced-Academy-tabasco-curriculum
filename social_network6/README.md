# Social Network - Part 6

When users view the profile page of a user other than themselves, they should see a button that allows them to add that user as a friend.

![Munity add friend](munity1.png)

However, what this button says and does needs to change based on the current state of the relationship between the two users. For example, after the button above is clicked, a pending friend request will exist. The button should change to reflect this state of affairs:

![Munity cancel friend request](munity2.png)

When a friend request is pending, the button should allow the recipient of the friend request to accept it.

![Munity accept friend request](munity3.png)

Once a friend request has been accepted, both parties have the option to unfriend the other.

![Munity unfriend](munity4.png)

After unfriending, the button should return to being a 'Make Friend Request' button for both users.

