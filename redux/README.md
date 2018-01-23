# Redux

Is a small Javascript library that helps you with managing your application's state. It provides a central, global store for all of your application's state information as well as mechanisms for dealing with state changes that occur as your application is used.

[Redux is not something every project needs](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), but it is very widely used in the React world and for that reason we should get some experience using it regardless of whether or not we could get by without it.

## State

In a Redux app, there is a single object that holds all of your state information. As you might imagine, this object can get quite large. If we had been using Redux for parts 3, 4, 5, and 6 of our Social Network project, the state object might look something like this:

```js
{
    user: {
        id: 1,
        firstName: 'Disco',
        lastName: 'Duck',
        image: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Disco_duck.jpg',
        bio: 'I was a number one hit in 1976'
    },
    imageUploadDialogIsVisible: false,
    bioEditorIsVisible: false,
    otherUser: {
        id: 2,
        firstName: 'Funky',
        lastName: 'Chicken',
        image: null,
        bio: null,
        isFriend: true,
        availableFriendActions: [ 'terminate' ]
    }
}
```

Note that both application data (the user objects) and UI state information (the properties indicating whether the image upload dialog and bio editing interface should be shown) are included. This is as it should be. Redux is for all of your application's state information.

## Actions and Action Creators

Actions are plain Javascript objects that represent any occurrence that should result in a change in your application's state. These objects need to have a property that indicates the type of occurrence they represent and they will often have additional properties containing information relevant to the occurrence.

```js
{
    type: 'UPDATE_BIO',
    bio: "I never liked a man I didn't meet"
}
```

Functions that create such objects are called action creators. It is advisable to have an action creator for every action.

```js
function updateBio(bio) {
    return {
        type: 'UPDATE_BIO',
        bio: bio
    };
}
```

## Reducers

Reducers are functions that are passed the current state as well as an action. They calculate what the new state should be and then return the new state. Redux then replaces the state that was passed to the reducer with the new state that the reducer returns.

This bears repeating: Reducers _do not_ make changes to the current state. They create a totally new object to represent the new state.

Redux requires that reducers be [pure functions](https://en.wikipedia.org/wiki/Pure_function). That means they can have no side effects. They can't change anything that they did not create themselves.

Typically, the way you make sure that you don't mutate existing state in a reducer is through liberal use of [`Object.assign`](../object_assign).

```js
function reducer(state = {}, action) {
    if (action.type == 'SHOW_BIO_EDITOR') {
        return Object.assign({}, state, {
            bioEditorIsVisible: true
        });
    }
    if (action.type == 'UPDATE_BIO') {
        const user = Object.assign({}, state.user, {
            bio: action.bio
        });
        return Object.assign({}, state, { user });
    }
    return state;
}
```

Note that, in the example above, the new [default parameter syntax](../destructuring_rest_spread#function-arguments) is used to set the `state` argument to and empty object if the function is passed `undefined`. This should only happen the first time reducer is called, before the state has been populated. Reducers should never return `undefined`.

Every Redux app really has just one reducer function. We speak of reducers in the plural because it is very common to write sub-reducer functions that are called from the main reducer and that handle actions related to specific parts of the state object.

## Store

The store object is the central interface of Redux, although it is relatively rare to interact with it directly in a React app. It is an object that holds the state object and gives access to it via its `getState` method. It also has a `subscribe` method that allows you to register a listener to run whenever the reducers update state. Most importantly, it provides a `dispatch` method. The `dispatch` method takes an action as an argument and dispatches it to the reducer. It is by calling `dispatch` that you cause state changes to occur.

To get a store object for your application, you call `createStore` during initialization and pass to it your main reducer function.

```js
import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer);
```

## Middleware

Redux middleware is conceptually similar to Express middleware. In Redux, you can specify functions to run between the dispatching of an action and the action's arrival at the reducer. You can write your own middleware functions and there are many third party middleware functions available for you to use. For example, the [redux-promise](https://github.com/acdlite/redux-promise) middleware allows you to pass to `dispatch` a promise that will resolve with an action rather than just an action.

To use middleware, pass it to the `applyMiddleware` function and pass the result to `createStore`.

```js
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer } from './reducer';

const store = createStore(reducer, applyMiddleware(reduxPromise));
```

## Integration with React

The `connect` function provided by `react-redux` allows you to connect the state information held by Redux with your React components. The `connect` function is a function that returns a higher order component - a function to which you can pass a component and get back that component wrapped by another component. The wrapping component will pass props to the component it contains. When you call `connect`, you specify the data from the state you would like to be passed as props to the component that will be wrapped by the HOC it returns.

For `connect` to work, the store must be available to it. The way to make the store available anywhere you might need it is by wrapping the highest level component in your app in the `Provider` component exported by `react-redux`. You must first create your store and pass it as a prop to `Provider`.

```js
let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.getElementById('main'));
```

With your entire React app contained by `Provider`, you can create as many components that connect to Redux as you need. When creating such a component, you call `connect` and pass to it a function. This function will be passed the state object and it should return an object representing the props you want passed along. This function is referred to as `mapStateToProps` in the [API documentation](https://github.com/reactjs/react-redux/blob/master/docs/api.md) because it is how you map data stored in your global state object to props passed to React components.

```js
import { connect } from 'react-redux';

const mapStateToProps = function(state) {
    return {
        bio: state.user && state.user.bio
    };
};

const connectBio = connect(mapStateToProps);

const ConnectedBio = connectBio(Bio);

function Bio(props) {
    return <div className="bio">{props.bio || 'Please add your bio'}</div>;
}
```

In online examples you will more often see the call to `connect` and the call to the function it returns all on one line.

```js
const ConnectedBio = connect(mapStateToProps)(Bio);
```

But the result is the same: a component that wraps around the `Bio` functional component and provides to it a prop named `bio`. This prop is mapped to the `bio` property of the `user` object attached to the global state object. If the `user` object in the state is replaced with one with a different `bio` property, the `ConnectedBio` component will re-render to reflect the change.

In addition to `mapStateToProps`, you can pass another function as the second argument to `connect`. This argument is referred to as `mapDispatchToProps` and it is for creating functions that use your store's `dispatch` function. If you do not pass a second argument to `connect`, as in the example above, the `dispatch` function is automatically passed to the contained component as a prop. If we wanted to dispatch and action when the user clicks on the 'Please add your bio' text, we could make the following modifications:

```js
import { connect } from 'react-redux';
import { showBioEditor } from './actions';

const mapStateToProps = function(state) {
    return {
        bio: state.user && state.user.bio
    };
};

const ConnectedBio = connect(mapStateToProps)(Bio);

function Bio(props) {
    const showBioEditor = () => this.props.dispatch(showBioEditor());
    return (
        <div className="bio">
            {props.bio || <a onClick={showBioEditor}>Please add your bio</a>}
        </div>
    );
}
```

Alternatively, you could use the second argument to `connect` to create functions that use dispatch and that will be merged in with the rest of the props.

```js
import { connect } from 'react-redux';
import { showBioEditor } from './actions'

const mapStateToProps = function(state) {
    return {
        bio: state.user && state.user.bio
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        showBioEditor: () => dispatch(showBioEditor());
    };
};

const ConnectedBio = connect(mapStateToProps, mapDispatchToProps)(Bio);

function Bio(props) {
    return (
        <div className="bio">
            {props.bio || <a onClick={() => this.props.showBioEditor()}>Please add your bio</a>}
        </div>
    );
}
```
