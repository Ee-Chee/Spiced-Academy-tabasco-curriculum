# Media Queries & Responsive Design

> If you think responsive's simple, I feel bad for you son. We got 99 viewports, but the iPhone's just one.

When developing the front end of our applications, usually we must build our pages to be fully responsive for desktop, tablet, and mobile displays.  In order to achieve these different types of layouts, we must incorporate several strategies. One very popular method is the use of **media queries**.

Media queries enable us to limit our styles scope based on constraints that we define. For example, if we only wanted to apply a color change between 601px to 800px, we would write:

```css
@media screen and (min-width:601px) and (max-width:800px){
  .element { color: red }
}
```

Here, we define our constraints with `min-width` and `max-width`.  

If we wanted to only include styles up to and including 1200px, we would write:

```css
@media screen and (max-width: 1200px) {
  .element { display: block; }
  #other-element { width: 50%; margin: 0 auto; }
}
```

## Let's take a closer look at the syntax

Media query syntax is made up of the `@media` keyword, a **media type**, and zero or more **expressions**.  

**Media type** is the type of device, or media, which will be listening for their respective media queries.  Most of the time, you will use `screen`, `all`, or none at all. It is not required to include in your media query. Note that the `handheld` media type is not used by smartphones and tablets - they listen for the `screen` media type. 

The **expressions** are the constraints where we specify when we want our styles to be implemented. Note we can chain expressions together using the `and` keyword.  The list of expressions we can use include:

- width
- height
- device-width
- device-height
- orientation
- [and more](http://cssmediaqueries.com/what-are-css-media-queries.html#features)

## How to approach writing media queries

![breakpoints](https://cdn-images-1.medium.com/max/800/1*5_Y5hh5ddgtiencDWMCqSQ.png)

As a developer, you will start to create workflows for how to implement your front end designs. Here are some tips when writing media queries and making pages responsive:

- Have a base format for your styles - either desktop or mobile. These will be your global styles.  You will then implement media queries to manipulate your stylings as you develop for other devices. For example, start implementing all of your styles on desktop, then as you build for responsiveness, add media queries as you see fit.  Not having a base format will cause you to trip over your responsive stylings constantly.
- If you can, try to avoid writing media queries that only affect very small pixel ranges, i.e `(min-width:701px) and (max-width:705px)`.
- Being cognizant of popular device dimensions will go a long way.  For example, the iPhone 6 is 375px by 667px.  [See this list of pixel dimensions for popular devices](http://cssmediaqueries.com/target/). 
- Set up **break points** to aid you in structuring your responsive designs.  Breakpoints are specific widths that will cause a page's layout to drastically change. Basically, it's the width of the viewport you specify for when a desktop-oriented page becomes a tablet-oriented page, when a tablet-oriented page becomes a mobile-oriented page, etc.

## Further Reading

1. [CSSMediaQueries.com](http://cssmediaqueries.com/)

