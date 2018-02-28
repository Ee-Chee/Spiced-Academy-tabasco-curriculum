# CSS Selectors, Transforms, Transitions, Animations, & Filters

## Selectors

CSS Selectors are patterns that are used to select HTML elements in order to apply styles.  We can use different types of selectors to catch multiple elements that satisfy the selector's criteria.  This enables us to do cool stuff like style the odd `<li>` elements in a `<ul>`, or only apply styles to the last child of a div. There are many different combinations we can use to get the output we want.

CSS selectors use patterns to determine the element we want to select.  These are the most common:

|          Selector          |           Name            |                         What it does                         |
| :------------------------: | :-----------------------: | :----------------------------------------------------------: |
|          ```*```           |      Global Selector      |             Global styles, selects *everything*              |
|     ```div  .child```      |    Descendent Selector    | Selects all _.child_ elements that are descendants of any _div_ element |
|     ```div > .child```     |   Direct Child Selector   |  Select all _.child_ elements where their parent is a *div*  |
|    ```div + .sibling```    | Adjacent Sibling Selector | Selects an element (.*sibling*) that follows directly after the prior element (*div*), in which both elements share the same parent |
|        ```p ~ ul```        | General Sibling Selector  | Selects an element (*ul*) that follows anywhere after the prior element (*p*), in which both elements share the same parent |
|  ```.mydiv:first-child```  |       Pseudo Class        | Selects every element with class *.mydiv* that is the first child of its parent |
|  ```section.this-class```  |     Multiple classes      | Selects any _section_ element with a class of _.this-class_  |
|      ```h1, h2, h3```      | Comma separated selectors |          Selects all *h1*, *h2*, and *h3* elements           |
| ```input[type=password]``` |    Attribute Selector     | Selects all *input* elements that have a type equal to password |

The last two selectors from this table are called **attribute selectors**. They scan the attributes of the element specified. You can learn more about attibute selectors [here](https://css-tricks.com/almanac/selectors/a/attribute/).

## Pseudo Class Selectors

![pseudo-class](https://css-tricks.com/wp-content/csstricks-uploads/relationalpseudos2.png)

Pseudo classes are used as a way to be even *more* specific about the elements you are trying to select. They allow us to construct more complicated CSS selectors quite easily.  They start with a colon - `:` - followed by the pseudo selector. Some also take an argument.

 Also check out this awesome [tester](https://css-tricks.com/examples/nth-child-tester/) from CSS-Tricks.

### The most common & useful pseudo selectors are:

- **:link** - select links on the page.
- **:visited** - selects all links that have been visited.
- **:active** - selects all links and applies styles to them when they become active (ie. are clicked on).
- **:hover** - use this to set styles for when the mouse hovers over an element. Easy way to really spice up your design.
- **:first-child** - select the first child within a parent.
- **:last-child** - select the last child within a parent.
- **:nth-child(num)** - accepts an algebraic expression to specify the different ***child*** elements you want to select.  You can use this to select only the fifth child, or every odd or even element, or the first 5 child elements, and more!  [This article](https://css-tricks.com/how-nth-child-works/) talks about how `:nth-child` works and [this article](https://css-tricks.com/useful-nth-child-recipies/) goes over different formulas you can use.
- **:nth-of-type(num)** - accepts an algebraic expression to specify the different ***type*** of elements you want to select.  You can pass it a mathematical expression, `even`, or `odd`.
- **:before** - allows you to insert content onto a page (from your CSS file) *before* an HTML element. The result is not actually on the DOM, but it appears as if it is. You need to include a *content* property.
- **:after** - allows you to insert content onto a page (from your CSS file) *after* an HTML element. Just like with *:before*, the result is not actually on the DOM. You also need to include a *content* property.


***Note*** - `:hover` MUST come after `:link` and `:visited` in the CSS definition in order to be effective! `:active` MUST come after `:hover` in the CSS definition in order to be effective! Pseudo-class names are not case-sensitive.

## Transform, Transition, & Animation

### Transform

Transforms change the shape and position of the affected content by modifying the coordinate space. Transforms do not disrupt the normal document flow.

```css
/* shifts element 200px to the right */
.my-image { transform: translateX(200px); }

/* shifts element 200px right, 50px down */
.my-image { transform: translate(200px, 50px); }

/*
shifts element 200px right, 50px down
skew rotates and stretches the element
scale increases the size. scale(2) makes the element 2x as big
rotate rotates the element clockwise
*/
.my-image { transform: translate(200px, 50px) skew(20deg) scale(2) rotate(45deg); }
```

### Transition

From [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions):

> CSS transitions provide a way to control animation speed when changing CSS properties. Instead of having property changes take effect immediately, you can cause the changes in a property to take place over a period of time. For example, if you change the color of an element from white to black, usually the change is instantaneous. With CSS transitions enabled, changes occur at time intervals that follow an acceleration curve, all of which can be customized.

Transitions are made up of 4 properies:

1. **transition-property**: the CSS property that we will apply our transition effect to (ex. color, opacity, width, etc).
2. **trasition-duration**:  the time it takes for the transition to complete.
3. **transition-timing-function**: defines how a transition will proceed during its duration. The names of the properties help explain what this property does. [More info on these keywords here](https://developer.mozilla.org/en/docs/Web/CSS/transition-timing-function).
   - ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end
4. **transition-delay**: define a length of time to delay the start of a transition.

Fortunately, there is a shorthand syntax:

```css
div {
    transition: <property> <duration> <timing-function> <delay>;
}
```

Here is an example:

```css
.my-image {
  background-color: purple;
  margin: 20px;
  transition: background .5s ease-in;
}

.my-image:hover {
  background: green;
}
```

## Animation

CSS also has an `animation` property built-in. We can use this feature to create even more complex animations!

There are 2 steps to creating a CSS animation:

1. Define the animation and give it a name using *@keyframes*
2. Assign it to a specific element(s)

***@keyframes*** is a list describing what should happen over the course of the animation. We assign it a name, and then give it the styles we want it to run during the animation. You can use the keywords *from*, *to*, or use percentages to define when to use which styles.

The animate property has several *sub-properties* you can define for further customization. These include *animation-name* (which is required), *animation-duration*, etc. You can read more about the sub-properties [here](https://css-tricks.com/almanac/properties/a/animation/#article-header-id-0).

```css
.animate-element {
    animation-name: slide;
    animation-duration: 3s;
    animation-fill-mode: forwards;
}

@keyframes slide {
    0% {transform: translateX(0);}
    50% {transform: translateX(900px) rotate(270deg);}
    100% {transform: translateX(0);}
}
```

Here's a link to MDN explaining more about [@keyframes](https://developer.mozilla.org/en/docs/Web/CSS/@keyframes).


## BONUS FEATURE: CSS Filters!

CSS filters are cool effects that you can put on images. These effects are similar to Instagram or Photoshop filters. You can add some interesting effects to the images on your web page very quickly and easily.

```css
.img-to-blur {
  filter: blur(20px) sepia(1);
}
```

Notice that you can use multiple filters in one line, but note that **order matters**.

You can demo all the different filters [here](http://html5-demos.appspot.com/static/css/filters/index.html).

Here is a list of most of the filters availble to you. Unless otherwise specified, they accept a number or percentage.

- **blur()** - takes a length (in px)
- **brightness()**
- **contrast()**
- **drop-shadow()** - takes a length (in px) and a color
- **grayscale()**
- **hue-rotate()** - takes angle. Max is 360deg.
- **invert()**
- **opacity()**
- **saturate()**
- **sepia()**


Note that CSS filters do not have universal browser support [yet]. If you look at [caniuse.com](http://caniuse.com/#feat=css-filters), you will see that  CSS filters are not supported on IE11.

## Additional Resources

- [This article from CSS Tricks](https://css-tricks.com/pseudo-class-selectors/) details all of the different pseudo class selectors.
- [Here's a more detailed article on :nth-of-type](https://css-tricks.com/almanac/selectors/n/nth-of-type/).
- [Full list of filter properties.](https://developer.mozilla.org/en/docs/Web/CSS/filter#Syntax)
