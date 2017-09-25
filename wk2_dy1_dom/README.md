# The Document Object Model (DOM)

The Document Object Model (DOM) is the interface browsers provide to the content of webpages. By using the DOM we are able to change the content and appearance of webpages after they have loaded. In the early days of the web this was not possible - the only way to change what was displayed was to load a new page.

The entry point to the DOM is the `document` object. Through it we gain access to the entire tree of HTML elements (nodes). For example, `document.body` is a reference to the `<body>` element and `document.documentElement` is a reference to the `<html>` element (the root node).

Every node has a `parentNode` property (which is `null` in the case of the `document` object) and a `children` property (an array-like object containing all of the node's child elements). There are also other properties to aid in traversal (`firstChild`, `nextSibling`, etc.).

There are several methods available for finding specific nodes that you wish to manipulate:

* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById">`document.getElementById`</a> - returns the element with the specified id or `null` if there is no such element

* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName">`document.getElementsByTagName`</a> - returns an array-like object containing all of the elements with the specified tag name

* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName">`document.getElementsByClassName`</a> - returns an array-like object containing all of the elements with the specified class name

* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">`document.querySelector`</a> - returns the first element that matches the specified selector or `null` if there is no such element

* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll">`document.querySelectorAll`</a> - returns an array-like object containing all of the elements that match the specified selector

With the exception of `getElementById`, all of the methods above also exist on individual nodes. Calling them on individual nodes limits the search to the children of that node.

## Changing the appearance of elements

Every element has a `className` property which contains the current value of the element's `class` attribute. You can edit this string to add and remove classes to an element, which will update the element's appearance in accordance with linked stylesheets. A more convenient way to add and remove classes is through the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList">`classList`</a> property available in current browsers.

Every element also has a `style` property which is an object representing the current value of the element's `style` attribute. Changing properties on the element's `style` object is like adding style rules to the element's `style` attribute.

```js
var elem = document.getElementById('main');

elem.style.marginLeft = '100px';
elem.style.paddingTop = '20px';
elem.style.position = 'relative';
elem.style.display = 'inline';
```

Note that the property names do not have dashes and are camelCase. `margin-left` becomes `marginLeft` and `padding-top` becomes `paddingTop`.

## Changing the content of elements

Every element has an `innerHTML` property that contains the entirety of its HTML content as a string. You can set this property to alter an element's HTML content.

```js
document.body.innerHTML = ''; //the <body> is now empty

document.body.innerHTML = '<h1>innerHTML is fun</h1><p>I like changing innerHTML';
```

There are also methods for creating, adding, and removing nodes.

* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement">`document.createElement`</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode">`document.createTextNode`</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild">`appendChild`</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore">`insertBefore`</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild">`removeChild`</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild">`replaceChild`</a>

## Exercises

1. Write a function that expects a string representing a selector to be passed as a parameter. The function should find all the elements in the document that match the selector and change their style so that the text they contain is italic, underlined, and bold.

2. Write a function that expects a string representing a class name to be passed as a parameter. The function should return an array containing all the elements in the document that have the class that was passed in.

3. Write a function that inserts an element into the `body` of the currently loaded page. That element should have fixed position, z-index of 2147483647, left of 20px, top of 100px, font-size of 200px, and contain the text 'AWESOME'.
