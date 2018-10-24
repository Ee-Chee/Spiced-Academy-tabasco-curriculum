# Social Network - Part 5

Our next step is to add the profiles of users other than the logged in user. These screens should look exactly like the logged in user's profile but without any ability to edit the bio (or change the profile pic, if you have that functionality on the logged in user's profile).

The `Route` element for this screen should have its `path` set to something like `user/:id`. React Router will add a `match` object to the `props` of the component you specify. This `match` object contains information about how React Router interpreted the url and you can use it to gain access to the id in the url. If your `path` is `user/:id`, you would be able access the id in your component as `this.props.match.params.id`.

The component should then use the id to make an ajax request to get the information for the user. You will need to create a server-side route for this (make sure that its url is different than the url of the client-side route for displaying the information).

For this `Route`'s component you can either reuse the `Profile` component you made for logged in users or create a new one that only handles users other than the current one. If you reuse `Profile`, you would have to add to it multiple behavior changes based on whether or not it is displaying the information of the logged in user. For example, if it is showing the logged in user's info, no ajax request is required when the component mounts. If it is not showing the logged in user's info, nothing should be editable. It is probably easier to use two different components, `Profile` for the logged in user and a new one for all other users.

If a user attempts to view her own profile by going to the `user/:id` route, you will probably want to redirect them to `/`. You can redirect by using the `push` method of the `history` object that React Router will add to your component's `props`.

```js
this.props.history.push('/');
```

Another tricky thing to be aware of is that React Router will reuse components it has on hand. For example, if the view shown at `/user/1` contains a link to `/user/2`, you will notice that the constructor for your component does not run again when that link is clicked. React Router recycles the instance it already has and passes it new props. There is [a very simple way](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) to fix this. If you give your component a unique `key` attribute, React will be forced to create a whole new instance of the component when the key changes.

```js
<Route
    path="/user/:id"
    render={props => (
        <OtherUserProfile {...props} key={props.match.url} />
    )}
/>
```
