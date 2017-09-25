# Angular

![Angular](https://angularjs.org/img/AngularJS-large.png)

<a href="https://angularjs.org/">AngularJS</a> is a very popular client-side MVC framework that originated at Google. There is an abundance of <a href="https://docs.angularjs.org/guide/concepts">concepts</a> involved with it but we will stick to the basics.

To get started with Angular, include the following `<script>` element in your page:

```html
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
```

## Templates

In an Angular app, templates reside in HTML pages and are automatically rendered.

```html
    <!doctype html>
    <html>
    <head>
        <title>My Angular App</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    </head>
    <body ng-app>
        <p>{{ 'Hello World!' }}
        <p>2 + 2 = {{ 2 + 2 }}
    </body>
    </html>
```

Here is how this page looks when it is loaded in a browser:

<img src="example.png">

The expressions contained in `{{` and `}}` are automatically evaluated and rendered. There is no need to manually compile a template, call it, and insert the result into the DOM. That's all done for you.

Note the `ng-app` attribute in the `<body>` tag. Such custom (i.e., non-standard) attributes that begin with `ng-` are called <a href="https://docs.angularjs.org/guide/directive">_directives_</a>. Angular has <a href="https://docs.angularjs.org/api/ng/directive">a lot</a> of predefined directives and it is also possible for you to create your own. This `ng-app` directive tells Angular that it should process the contents of the `<body>` tag.

## Modules

In Angular modules are holders for the various pieces of your application. You create one like this:

```js
var myApp = angular.module('myApp', []);
```

The array passed as the second argument to `angular.module` is meant to contain a list of other modules that this one depends on.

In your markup you tell Angular to use your module using the `ng-app` directive.

```html
<body ng-app="myApp">
```

## Controllers

Controllers are where your application's business logic lives. You set up a controller using the module's `controller` method.

```js
var myApp = angular.module('myApp', []);

myApp.controller('cityList', function($scope) {

});
```

You cause this controller to come into existence by using the `ng-controller` directive in your markup.

```html
<div ng-controller="cityList">
```

When controllers come into existence they are passed a _scope_ (`$scope` in the call to `myApp.controller` above). This is an object that the controller can attach data to, making it available in the markup.

```js
var myApp = angular.module('myApp', []);

myApp.controller('cityList', function($scope) {
    $scope.cities = [
        {
            name: 'Berlin',
            country: 'Germany'
        },
        {
            name: 'Hamburg',
            country: 'Germany'
        }
    ];
});
```

```html
<div ng-controller="cityList">
    <ul ng-if="cities.length > 0">
        <li ng-repeat="city in cities">{{city.name}}, {{city.country}}
    </ul>
</div>
```

The page will now display the two cities in the list. What's more, if the list changes - if a city is added or removed - the display will automatically update to reflect the change.


## `$http`

To make an ajax request in an Angular app, use the built-in <a href="https://docs.angularjs.org/tutorial/step_07">`$http`</a> service. To gain access to this service, give the function you pass to your module's `controller` method an argument named `$http`.

```js
myApp.controller('cityList', function($scope, $http) {
    $http.get('/cities').then(function(resp) {
        $scope.cities = resp.data;
    });
});
```

## Exercise

Complete <a href="../wk10_image_board_admin">this project</a>.
