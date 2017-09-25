# Composition

If you've completed [the second part of your social network project](social_network2) you have probably noticed that your `Registration` and `Login` components look a lot alike. They both have:

1. A constructor that assigns a `state` object to the instance and perhaps binds methods to the instance
2. A method for handling input on text fields
3. A method for handling clicks on the submit button. This method does a `POST` and redirects upon success and calls `setState` upon failure to trigger a re-rendering with an error message
4. A `render` method that renders a heading, form fields, an error message if needed, and, in the case of `Registration`, a link to log in

There are only two differences between the two components: the url used in the `POST` and the DOM nodes that are produced by their  `render` methods. Wouldn't it be nice to share between the two components the parts that are exactly the same and not rewrite any code?

One way to accomplish this would be to collapse the two components into one. A single `Login`/`Registration` component could determine what url to use and what DOM nodes to render based on the `location` prop passed to it by React Router. This is not ideal because it requires that the component have knowledge of router's routes and what components are associated with them, but you could get around that by wrapping the component in another component (see below). However, another more significant problem remains. With conditional rendering, the component's `render` function becomes messier and harder to understand. If we want to add a third or fourth set of form elements that also use the same functionality, the mess gets bigger. The component goes from being concerned with one thing to being concerned with several different things.

Another approach you might be tempted to use is inheritance. You could create a component that extends `React.Component` and implements all of the shared behavior. Then you could create `Login` and `Registration` components that extend the first component and implement the bits that are unique to themselves.

```js
class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleInput(e) {
        // gather value from changed form field
    }
    handleSubmit() {
       // make POST request to this.url and handle response
    }
}

class Login extends AuthForm { // Don't do this!
     constructor(props) {
         super(props);
         this.url = '/login';
     }
     render() {
         // render login form
     }
}

class Registration extends AuthForm { // Don't do this!
    constructor(props) {
        super(props);
        this.url = '/register';
    }
    render() {
        // render registration form
    }
}
```

This would certainly work but it is not the React way. React projects eschew inheritance in favor of a more flexible technique that React makes available: _composition_. React allows you to have components that render other components. The containing component can pass props to its children, providing data and functionality to them. This is composition. Consider the following components:

```js
class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleInput(e) {
        // gather value from changed form field
    }
    handleSubmit(e) {
       // make POST request to this.props.url and handle response
    }
    render() {
        const Component = this.props.component;
	return <Component error={this.state.error}
	                  handleInput={e => this.handleInput(e)}
			  handleSubmit={e => this.handleSubmit(e)} />;
    }
}

function LoginForm({ handleInput, handleSubmit, error }) {
    return (
        <div>
      		<input name="email" type="email" onChange={handleInput} />
      		{/* etc. */}
      	</div>
    );
}

function RegistrationForm({ handleInput, handleSubmit, error }) {
    return (
        <div>
      		<input name="first" type="text" onChange={handleInput} />
      		{/* etc. */}
      	</div>
    );
}
```

`AuthForm` can receive either `LoginForm` or `RegistrationForm` as a prop. Whichever component is passed, `AuthForm` will render, passing to it the data and functions that are needed. Another level of wrapping can be used to create components suitable to be set as the `component` prop in a `Route` element.

```js
function Login() {
    return <AuthForm component={LoginForm} url="/login" />;
}

function Registration() {
    return <AuthForm component={RegistrationForm} url="/register" />;
}
```

An alternative to manually writing the two wrapping components above would be to write a function that can be passed a component and returns a new component that wraps the one passed in.

```js
const Login = wrapInAuthForm(LoginForm, '/login');

const Registration = wrapInAuthForm(RegistrationForm, '/register');

function wrapInAuthForm(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.url = url;
        }
        handleInput(e) {
            // gather value from changed form field
        }
        handleSubmit(e) {
           // make POST request to this.url and handle response
        }
        render() {
            return <Component error={this.state.error}
            		      handleInput={e => this.handleInput(e)}
                              handleSubmit={handleSubmit = e => this.handleSubmit(e)} />;
        }      
    }
}

function LoginForm({ handleInput, handleSubmit, error }) {
    return (
        <div>
      		<input name="email" type="email" onChange={handleInput} />
      		{/* etc. */}
      	</div>
    );
}

function RegistrationForm({ handleInput, handleSubmit, error }) {
    return (
        <div>
      		<input name="first" type="text" onChange={handleInput} />
      		{/* etc. */}
      	</div>
    );
}
```

A function, such as `wrapInAuthForm`, that is passed a component and returns another component that wraps the one passed in, is called a [_higher order component_](https://facebook.github.io/react/docs/higher-order-components.html), or HOC.

Regardless of whether an HOC is used, `LoginForm` and `RegistrationForm` are examples of what we call _presentational components_, while the `AuthForm` that wraps them is an example of what is called a _container component_.

## Container Components and Presentational Components

Presentational components, as the name implies, are concerned with presenting things, with rendering DOM elements with styles associated with them. Typically, they have no need of state, so they can be defined as functions rather than with `class`. The data they present are passed to them as props. They may add event handlers to the elements they render, but usually these too are passed to them as props. Presentational components are "dumb."

Container components, on the other hand, are "smart." They know where data is stored and how to update it. They make ajax requests. They usually require state and have to call `setState` to update their data and cause the presentational components they contain to re-render. They pass data to presentational components for display, along with callbacks for causing updates. They render other components, perhaps with a wrapping element, but without concern for styling.

Structuring your code in this manner keeps concerns separated and also increases reusability. We've already seen how a container component can be reused with different presentational components, but it also works the other way around. For example, on a social network you would expect there to be many different contexts in which lists of users are displayed - lists of users who are friends with another user, lists of users who have made friend requests to a certain user, lists of users who match a search term, etc. - and for all of these lists to look basically the same. It's easy to imagine a `UserList` presentational component that renders a bunch of `User` presentational components for each user in the array of users that is passed to it by whatever component contains it (e.g., `FriendsContainer`, `UserSearchContainer`, etc.).

### Further reading

[Composition vs Inheritance](https://facebook.github.io/react/docs/composition-vs-inheritance.html)

[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
