# Vue.js

[Vue.js](https://vuejs.org/v2/guide/) is a Javascript framework for constructing website UIs. It resembles Angular in many respects and also has certain conceptual similarities to React.

You can <a href="https://vuejs.org/js/vue.min.js" download>download vue.js</a> to include it in your project or you can load it from a cdn:

```HTML
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

When this file loads, it will put into global scope a constructor named `Vue`. You will call this constructor, passing it an object with configuration information, to create a `Vue` instance. The process of writing a Vue app is mainly adding properties and methods to the object you pass to the `Vue` constructor.

Let's start out by calling it with the simplest imaginable object.

```js
var app = new Vue({
    el: '#main'
});
```

The `el` property tells Vue what element your UI will appear in. Vue will automatically find the element that matches the selector and store it in a property of your instance named `$el`. The contents of the element will be treated as a template and automatically rendered.

```HTML
<!doctype html>
<html>
<head>
    <title>My Vue.js App</title>
</head>
<body>
    <div id="main">
        <p>{{ 'Hello World!' }}
        <p>2 + 2 = {{ 2 + 2 }}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="script.js"></script>
</body>
</html>
```

Given this HTML, and assuming the call to the `Vue` constructor above is placed in script.js, the visible result would be:

![Vue.js Example](example.png)

The expressions contained in `{{` and `}}` are automatically evaluated and rendered. There is no need to manually compile a template, call it, and insert the result into the DOM. That's all done for you.

You can specify data you want to render in your UI by adding a `data` property to the object you pass to `Vue`. All properties specified in this way will be available for use in your HTML.

```js
var app = new Vue({
    el: '#main',
    data: {
        heading: 'My Vue App'
    }
});
```

```html
<div id="main">
    <h1>{{ heading }}</h1>
</div>
```

![Vue Example](example2.png)

The fields you specify in the `data` object will be copied to your view instance. Of course, a `Vue` instance is just a Javascript object and you could add properties to it directly in the normal way. However, if you add them via `data`, they will be _reactive_ properties. If their values change during the lifetime of your app, the UI will automatically update to reflect the change. For this reason you should use `data` to add any property you use in your HTML. If you don't have a value for the property at the time you are calling the `Vue` constructor, you should use a placeholder value such as an empty string or `null`.

The double curly brace syntax works for text nodes, but if you want to use data fields in HTML attributes you must do something a little different.

```js
var app = new Vue({
    el: '#main',
    data: {
        heading: 'My Vue App',
        headingClassName: 'heading'
    }
});
```

```html
<div id="main">
    <h1 v-bind:class="headingClassName">{{ heading }}</h1>
</div>
```

`v-bind` is what is called a _directive_, a special attribute that begins with `v-` and has a Javascript expression as its value. There are many [directives](https://vuejs.org/v2/api/#Directives) that Vue understands (it is also possible to create your own). For example, `v-if` can be used to render content conditionally and `v-for` can be used to render lists of items.

```js
var app = new Vue({
    el: '#main',
    data: {
        cities: [
            {
                name: 'Berlin',
                country: 'Germany'
            },
            {
                name: 'Hamburg',
                country: 'Germany'
            }
        ]
    }
});
```

```HTML
<div id="main">
    <ul v-if="cities.length > 0">
        <li v-for="city in cities">{{city.name}}, {{city.country}}
    </ul>
</div>
```

<img src="example3.png" width="400" alt="Vue Example">

The `v-model` directive is used on form fields to achieve two-way data binding. The form field will display the value of the property that is specified. When the user updates the value of the form field, the value of the property will be updated automatically.

```js
var app = new Vue({
    el: '#main',
    data: {
        greetee: ''
    }
});
```

```html
<div id="main">
    <h1>Hello, <span>{{greetee || 'World'}}!</h1>
    <input type="text" v-model="greetee">
</div>
```

<img src="model.gif" height="136" alt="Vue Example">

The `v-on` directive is used to add event handlers to elements. You can add to your `Vue` instance methods to be called in event handlers (or elsewhere) by adding a `methods` property to the object you pass to the constructor.

```js
var app = new Vue({
    el: '#main',
    methods: {
        emphasize: function(e) {
            e.target.style.textDecoration = 'underline';
            this.count = this.count ? this.count + 1 : 1;
        },
        deemphasize: function(e) {
            e.target.style.textDecoration = '';
            this.logCount();
        },
        logCount: function() {
            console.log(this.count);
        }
    }
});
```

```HTML
<div id="main">
    <span v-on:mouseover="emphasize" v-on:mouseout="deemphasize">
        Hello, World!
    </span>
</div>
```

### Lifecycle

`Vue` instances go through several phases in their lifetime. They are created, they render content in the DOM, they update that content when appropriate, and finally, they are destroyed. Vue allows you to detect when these moments are occurring and to take appropriate actions when they do. It does this through [lifecycle hooks](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks) - methods you can add to your `Vue` instance that will automatically get called when the lifecycle event occurs. For example, if you want to do something when your `Vue` instance is created, you would add a `created` property to the object you pass to `Vue`, and set it to a function that does what you want.

The `mounted` lifecycle hook runs when Vue has processed your `el` and added a `$el` property to your instance. It is convenient to use this lifecycle hook to make HTTP requests for data you want to display.

### Ajax with axios

Vue.js does not come with any built-in facility to make ajax requests. We will use a promise-based library called [axios](https://github.com/axios/axios) to meet this need.

```HTML
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

axios is quite simple to use. It has a `get` method that makes GET requests and a `post` method for making POST requests. You pass the url as the first argument to both of these functions. You can pass an object as the second argument to `post` and it will be converted into a JSON request body.

When the promise that `get` and `post` return is resolved, the value the function you passed to `then` will receive is an object representing the received response. It has numerous properties such as `status` and `headers`. Usually what you will be most interested in is the `data` property, which holds the body of the response. JSON response bodies will be parsed automatically.
