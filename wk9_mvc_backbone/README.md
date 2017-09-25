# MVC

<a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">Model-View-Controller (MVC)</a> is a widely used way of structuring a UI application. In this pattern, models manage the data and logic of the application, views present the data and respond to changes in it, and controllers receive input from users and directs it to the models and views. There are many variations on this basic idea.

When MVC began to be applied to the web, the tendency was to place the models and controllers on the server-side with the HTML page and its associated CSS considered the view. With the rise of single-page applications, client-side MVC frameworks emerged and rose in popularity. Today it is practically assumed that any site with a UI that is at all sophisticated is using one of these frameworks.

# Backbone

![backbone logo](http://backbonejs.org/docs/images/backbone.png)

<a href="http://backbonejs.org/">Backbone</a> is an older one of these frameworks. It is comparatively simple to use and understand, making it a great one to start with.

You can download Backbone <a href="http://backbonejs.org/backbone-min.js">here</a>. Backbone has two dependencies: <a href="https://code.jquery.com/jquery-3.1.0.min.js">jQuery</a> and <a href="http://underscorejs.org/underscore-min.js">Underscore</a>. You should include these dependencies before Backbone in your HTML.

With Backbone loaded on your page, the `Backbone` global object exposes several constructors (e.g., `Backbone.Model`, `Backbone.View`, `Backbone.Router`) that you can use to create the objects you need for your application. Typically, you will call the `extend` method of these constructors to create a new constructor that returns instances with the exact properties you want.

## `Backbone.Router`

A router allows you to create client-side routes. When a user navigates to a client-side route, something happens - typically a view change - without the page unloading. Routes may be based on hashes (i.e., the part of the url following `#`) but it is also possible to create routes that do not use hashes using the <a href="https://developer.mozilla.org/en/docs/Web/API/History">History API</a>. We will stick to hashes.

```js
var Router = Backbone.Router.extend({
    routes: {
        'users': 'users',
        'user/:userName': 'user'
    },
    users: function() {
    },
    user: function(userName) {
    }
});

var router = new Router;

Backbone.history.start();
```

In the example above a router is created with handlers for two routes. Assuming that the url of the page on which this code lives is `/index.html`, when the user navigates to `/index.html#users`, the `users` function will run. If the user goes to `/index.html#user/discoduck` or `/index.html#user/funkychicken`, the `user` function will run (and be passed `"discoduck"` or `"funkychicken"`).

Note than after instantiating the router we must call `Backbone.history.start`. This tells Backbone to start listening for changes to the url hash.

You can do anything you want in the route handlers but usually what you will want to do is create one or more views and probably one or more models. For example, the code in the `users` function may look like this:

```js
new UsersView({
    model: new UsersModel,
    el: '#main'
});
```

## `Backbone.Model`

Models hold and manage data. Because that is their job, it makes sense that
making ajax requests for data are their responsibility. You can assign to a model a `url` property. If you then call its `fetch` method, it will use jQuery to make a GET request to your server.

```js
var UsersModel = Backbone.Model.extend({
    initialize: function() {
        this.fetch();
    },
    url: '/users'
});

var usersModel = new UsersModel;
```

In the example above, as soon as an instance of `UsersModel` is created it will make an ajax request to `/users` and if the request is successful it will add the data in the response to its `attributes` property. The `attributes` property is an object in which the model keeps its data. To read a property from the model you use the `get` method. To manually add or change a field in the model, you use the `set` method. When you use `set` to change a value, an event is automatically fired.

```js
usersModel.on('change:users', function() {
    var users = this.get('users');
    this.set({
        numUsers: users.length
    });
});
```

The `save` method can be used to save changes to the model. It will cause a `POST` or `PUT` request to be made to the model's `url` with all of the fields in `attributes` in the request body.

## `Backbone.View`

Backbone views are responsible for displaying an associated model's data, handling DOM events triggered by a user, manipulating the DOM as necessary, as well as updating and responding to changes in models. Backbone views fulfill the traditional role of a view but also glide into controller territory.

```js
var UsersView = Backbone.View.extend({
    initialize: function() {
        var view = this;
        this.model.on('change', function() {
            view.render();
        });
    },
    render: function() {
        var html = Handlebars.templates.users(this.model.toJSON());
        this.$el.html(html);
    },
    events: {
        'click .first-name-heading': function() {
            this.model.sortUsersBy('firstName');
        },
        'click .last-name-heading': function() {
            this.model.sortUsersBy('lastName');
        }
    }
});
```

The `events` property is a map of events for the view to automatically attach to its `$el`. `$el` is a jQuery object created from the selector passed to the view's constructor as the `el` property. If you are reusing the same `el` for multiple views, you need to manually remove the events from the element when a new view is created. Views have an `undelegateEvents` method for this purpose.
