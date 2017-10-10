# DOM Events

Things happen on webpages. Images load and videos end. Users do things on webpages as well. They move their mouse over things, they click on things, they resize their windows, they change their device orientation, etc. Very often when these things happen we want to respond in some way. Fortunately, we can by listening for the events that they generate.

```js
document.addEventListener('click', function() {
    console.log('There was a click somewhere on the page!');
});
```

If you paste the code above into your console and hit enter, you will see that every time you click on the page 'There was a click somewhere on the page!' is logged.

The `addEventListener` method does not just exist on the `document` object. Every element has it. Without reloading the page, let's add the following code:

```js
document.body.addEventListener('click', function() {
    console.log('There was a click on the body element!');
});

document.documentElement.addEventListener('click', function() {
    console.log('There was a click on the html element!');
});
```

Now when you click on the page you can see the event is handled first by the listener attached to the `body` element, then by the one attached to the `html` element, and finally by the `document` object. This is called _event bubbling_. Events bubble up the DOM tree from the element they first happen on all the way to the `document` object. 

The first argument passed to `addEventListener` is obviously the name of the event to listen for. The second argument is a function to serve as the listener or _event handler_. `addEventListener` also accepts a third parameter, a boolean indicating whether or not to use _event capturing_. Event capturing is like event bubbling but in reverse.

```js
document.body.addEventListener('click', function() {
    console.log('A click was captured on the body element!');
}, true);

document.documentElement.addEventListener('click', function() {
    console.log('A click was captured on the html element!');
}, true);

document.addEventListener('click', function() {
    console.log('A click was captured on the document!');
}, true);
```

If you paste the above code into your console you will see that the events that use capturing happen in reverse order and that they all occur before any of the events that bubble.

## Event objects

The event handlers that are passed to `addEventListener` are passed an _event object_ when they are called. This object contains useful information about the event as well as some methods for changing how the event will be handled. For example, if you would like to prevent the event from being forwarded to the next element in the DOM tree, you can call `stopPropagation`.

```js
document.body.addEventListener('click', function(e) {
    e.stopPropagation(); //This event will not be handled by click handlers attached to document or document.documentElement
});
```

There is also `stopImmediatePropagation` which does the same thing but additionally prevents the event from being handled by other handlers attached to the same element.

Some events have default actions associated with them. For example, the default action associated with clicks on `<a>` elements is to navigate to the url contained in their `href` attributes. Event handlers run before default actions and can prevent the default actions by calling `preventDefault`.

```js
document.querySelector('a#next-step').addEventListener('click', function(e) {
    if (!confirm('Are you sure you want to go to the next step?')) {
        e.preventDefault(); //navigation will not occur
    }
});
```

Other interesting properties of event objects include:

* `target` - the element that the event actually occurred on

* `currentTarget` - the element that the event handler is attached to. This element is also what `this` refers to within an event handler

* `relatedTarget` - an element other than the target involved in the event. For example, in a `mouseout` event, the `relatedTarget` is the element the mouse went to. 

* `pageX` and `pageY` - the x and y coordinates of the spot on the page where a mouse event occurred

* `clientX` and `clientY` - the x and y coordinates of the spot in the viewport where a mouse event occurred

* `screenX` and `screenY` - the x and y coordinates of the spot on the screen where a mouse event occurred

* `offsetX` and `offsetY` - the x and y coordinates of the spot in the target node where a mouse event occurred

* `button` - a number indicating which button was pressed during a mouse event

* `touches` - a list of objects representing touches in touch events

* `changedTouches` - a list of objects representing touches that have changed since the last touch event

* `keyCode` - a number representing the key that was involved in a keyboard event

## Event types
There is <a href="https://developer.mozilla.org/en-US/docs/Web/Events">a huge number of events</a> that can be handled. Below is a list of a few that are of particular interest to us at this time.

* `click` - a click has occurred

* `dblclick` - a double click has occurred

* `DOMContentLoaded` - the markup for the page has finished loading

* `error` - a resource (such as an image) has failed to load

* `focus` - focus has been received (e.g., when a user tabs over to an input field)

* `blur` - focus has been lost (e.g., when a user tabs out of an input field)

* `hashchange` - there was a change to the portion of the url that appears after the #

* `input` - a visible character has been entered into an input field 

* `keydown` - a key on the keyboard has been pressed down

* `keyup` - a key that has been pressed down is released

* `load` - the page or an image has loaded

* `mousedown` - a mouse button is pressed down

* `mouseup` - a mouse button is released

* `mouseenter` - the mouse pointer has moved onto an element. This event is usually better to use than `mouseover` because it does not bubble 

* `mouseleave` - the mouse pointer has moved off of an element. This event is usually better to use than `mouseout` because it does not bubble 

* `mousemove` - the mouse pointer has moved on an element

* `orientationchange` - the device orientation has changed

* `readystatechange` - the `readyState` of an `XMLHttpRequest` has changed

* `resize` - the window size has changed

* `submit` - a `<form>` is about to be submitted

* `touchstart` - a touch on a touchscreen has begun

* `touchmove` - a touch on a touchscreen has moved

* `touchend` - a touch on a touchscreen has ended

* `touchcancel` - a touch on a touchscreen has been interrupted

* `transitionend` - a CSS transition has ended

* `unload` - the page is about to be unloaded (the user is navigating elsewhere or closing the tab)

* `visibilitychange` - the tab containing the page has become visible or hidden

## Removing event handlers

If you are adding event handlers to elements on the fly it is easy to add them multiple times by mistake or to leave them attached when they are no longer needed. To avoid this you should use `removeEventListener`.

```js
document.getElementById('elem').addEventListener('mousedown', function() {
    var html = this.innerHTML;
    this.innerHTML = 'Your mouse is down!';

    var elem = this;
    var revert = function() {
        elem.innerHTML = html;
        document.removeEventListener('mouseup', revert);
        document.removeEventListener('mouseleave', revert);
    };
    document.addEventListener('mouseup', revert);
    document.addEventListener('mouseleave', revert);
});
```

## Exercises

1. Make a page that has on it an element that is 100px by 100px in size, has absolute positioning, and has a solid background color. Add an event handler that makes this box center itself directly under the user's mouse pointer as it is moved across the screen.

2. Make a page that has a `<textarea>` element on it. As the user types visible characters into this field, the characters should be replaced with the characters in the corresponding position in <a href="http://www.d.umn.edu/~rmaclin/gettysburg-address.html">the Gettysburg Address</a>. (Note - you can get and set the text in a `<textarea>` through its `value` property.)

3. Make a page that has on it an element that is 100px by 100px in size and has a solid black border. When the user mouses down on this box, its background should change to a randomly selected color. When the user mouses up on it, its background should change to another randomly selected color.

4. Make a page that has on it an element that is 200px by 200px in size and has a solid background color. Nest within that element another element that is 50px by 50px in size and has a different solid background color. When the user clicks on the outer element its background color should change to a randomly selected color. However, if the user clicks on the inner element, the inner element's background color should change to a randomly selected background color but the outer element's background color should not change at all.

