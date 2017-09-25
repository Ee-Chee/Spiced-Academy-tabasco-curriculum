# Social Network - Part 4

Now is a good time to add routing to our logged-in experience. For this we want to use the `browserHistory` option, which uses the [history api](https://developer.mozilla.org/de/docs/Web/API/History) - no hashes! It's neat, but it requires us to do a couple of things.

For one thing, we have to be diligent about using React Router's `Link` elements for all of our links to routes. We also have to do set up on our server because it is possible that some requests for client-side routes will make it there. For example, if a user is on a route and clicks the reload button in the browser, the result will be a request to the server.

Fortunately, the server set up  is easy. All you have to do is have a catchall route that serves your `index.html` file.

```js
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');  
});	
```

When this file loads in the browser, React Router will determine and automatically render the correct component(s).

You will probably also want to add to your catchall route a check to make sure the user is logged in. If the user is not logged in, you will want to redirect to `/welcome`.

Your catchall route should be placed after all other routes in your code.

For now we are only going to need one `Route` with an `IndexRoute` nested within it. The component for the main `Route` should be `App` and the component for the child route should be a new `Profile` component we will create now.

## Profile 

The `Profile` module should show the user's profile pic (you can use the `ProfilePic` module from part 2 and use CSS to style it differently), the user's first and last name, and their bio. Initially, users will not have a bio but they have the opportunity to create it here. After they have created, they can always edit it.

![Munity add bio](munity1.png)

![Munity edit bio](munity2.png)

![Munity bio](munity3.png)

For `Profile` to function correctly, `App` will have to pass it functions and data. Since there will not be a `<Profile>` element in the `App` component's `render` function, these functions and data cannot be passed in the normal way. Instead, React's [`cloneElement`](https://facebook.github.io/react/docs/react-api.html#cloneelement) method can be used to create new elements that have the desired props.

In the following example, a component passes its `log` function to its children.

```js
class MyComponent extends React.Component {
    log(msg) {
        console.log(msg);
    }
    render() {
        const children = React.cloneElement(this.props.children, {
            log: this.log
        });
        return (
            <div>
                {children}
            </div>
        );
    }
}
```

