# Placing Elements with CSS

Much of the work we have to do in CSS is getting elements to go to the places on the page in which we want them to appear. There are often multiple ways to accomplish these goals and we'll consider a few of them presently.

There are several new ways that have big advantages over older techniques, most notably [flexbox](../flexbox) and [grid layouts](../layouts). We will consider these newer approaches later and stick to the older techniques for now.

To examine these assorted old school techniques, lets use a layout resembling the header area of our [Sprint/Reichstag page](../wk1_html_css_lab) page in which we want to have two elements on a single line with one element on the left of the screen and the other on the right. Well replace the sprint logo with an orange box, the hamburger menu button with a pink box, and put a border around the header area (to make things standout more) as well as some padding inside it so the boxes don't touch the edges.

We'll start with the following css:

```CSS
header {
    padding: 20px;
    border: 1px gray dashed;
}

#logo {
    height: 50px;
    width: 50px;
    background: orange;
}

#menu-button {
    height: 50px;
    width: 50px;
    background: pink;
}
```

And the following html:

```html
<header>
    <div id="logo">logo</div>
    <div id="menu-button">button</div>
</header>
```

With this page set up thus, what we would see in the browser is this:

![layout](img0.png)

As we can see, the two boxes are stacked one on top of the other. This is the default behavior of _block_ elements (elements that have their `display` property set to `block`), which `<div>` elements are by default.

Notice that the header grows in height to contain the two elements. We actually want the header to be just tall enough to fit one box on a row. We should add a `height` property.

```CSS
header {
    padding: 10px;
    border: 1px gray dashed;
    height: 70px;
}
```

Now it looks like this:

![layout](img1.png)

So our next challenge is to get that pink box to jump over to the right of the header. There are multiple ways to accomplish this and we'll try out a few.

## Floats

The css `float` property specifies how content should flow around the element it applies to. In this case we want the orange box to float left and the pink box to float right. We can update the css thus:

```CSS
#logo {
    height: 50px;
    width: 50px;
    background: orange;
    float: left;
}

#menu-button {
    height: 50px;
    width: 50px;
    background: pink;
    float: right;
}
```

And get this result:

![layout](img2.png)

That looks pretty good! But be aware that this only looks right because we set the height of the `<header>` element. If we took that out, it would look like this:

![layout](img3.png)

This is because floating elements do not affect the elements surrounding them in the usual way. They don't increase the height of their containers, which can cause lots of problems.

There are multiple ways to avoid these problems. One is to not using floating elements at all, if that's possible. Another is to set the height of the container, as we do here, but that is not always possible. Setting the `overflow` property of the container to `hidden` has a similar effect to setting the height in situations in which the height cannot be set. Yet another approach is to make sure that an element that must cause a line break appears after the floating element(s).

## Position

By default, all elements have `position` property set to the value `static`. There are several values you can assign and when elements have a position property set to one of these values we consider them positioned elements. The three position values we are most interested in are:

* relative
* absolute
* fixed

Elements using relative positioning can have `top` and `left` properties with values indicating where the element should go. These values are relative to where the element would normally be if it were not positioned. For example, if a relatively positioned element has a `left` of `20px` and a `top` of `-10px`, it will appear 20 pixels further right than it normally would and 10 pixels higher than it normally would.

Elements using absolute positioning can have `top` and `left` properties (as well as `bottom` and `right` properties) that say _exactly_ where the element should go. For example, if an absolutely positioned element has a `left` of `20px` and a `top` of `-10px`, it will appear 20 pixels from the left edge of its positioned container and 10 pixels higher than the top edge.

Elements using fixed positioning work like absolutely positioned elements except that they are positioned in the _window_ rather than the page. That means they stay in the same visual spot even as the user scrolls through the page.

We could use absolute positioning to make the pink box go all the way to the right. Let's try that.

```CSS
header {
    padding: 10px;
    border: 1px gray dashed;
}

#logo {
    height: 50px;
    width: 50px;
    background: orange;
}

#menu-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 50px;
    width: 50px;
    background: pink;
}
```

The result:

![layout](img4.png)

As we can see, the pink box now goes outside of the header. This is because we've set its `top` and `left` to be at specific pixels on the _page_, not the header that contains it. Elements with `absolute` positioning position themselves in their closest _positioned_ container and our `<header>` is not positioned. We can fix this fairly easily.

```CSS
header {
    position: relative;
    padding: 10px;
    border: 1px gray dashed;
}
```

Now the box will be contained correctly.

![layout](img5.png)

Now all we have to do is adjust for the padding of the container. Note that elements with absolute positioning ignore padding.

```css
#menu-button {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 50px;
    width: 50px;
    background: pink;
}
```

![layout](img2.png)

## Display

Every element has a `display` property but the value of the property depends on the element. For example, `<div>`, `<p>`, and `<h1>` elements are all block elements and the value of their `display` property is `block`. That means they try to fill the entire width of their container and will be followed by a line break.

Inline elements (such as `<span>, '<a>', '<strong>'`) do not cause new lines and take up just as much space as they need.

Just because elements start out with values for their `display` properties there is no reason you can't change them if you want to. There are several values you might to change an element's display property to.

For example, we can give the `display` property of `inline-block`. The makes them act like block elements within themselves but like inline elements outside. That is, they do not cause line breaks after them.

```CSS
header {
    padding: 10px;
    border: 1px gray dashed;
}

#logo {
    height: 50px;
    width: 50px;
    background: orange;
    display: inline-block;
}

#menu-button {
    height: 50px;
    width: 50px;
    background: pink;
    display: inline-block;
}
```

![layout](img6.png)

Notice that the two boxes are on the same line but that there is a little bit of space between them. Frustratingly, this margin between inline-bock elements can't be made to disappear easily.

One good thing about inline-block elements is that, unlike block elements, they obey `text-align` properties on their parent. If we set the `text-align` property of the header to `right`, both elements would go to the right.

```CSS
header {
    padding: 10px;
    border: 1px gray dashed;
    text-align: right;
}
```
![layout](img7.png)

Note that the text in the two boxes are also now right-aligned. If we wanted the text to stay to the left of its container, we'd have to set the `text-align` of those elements to `left`.

Of course, we don't want both boxes to go to the right, we want just one of them to. A way to do this would be to introduce two new elements, both contained by the header and each containing one of the two boxes. We'd need to set the width of both of them to be 50% of the total available width but make only the second one have a `text-align` property set to right.

Having these two elements be inline-block would be problematic because of the space that would automatically inserted between them. To avoid this, we can give them the `table-cell` display property. Table cells stay on the same line as each other but there is no space automatically inserted between them.

For `display: table-cell` to work, the element that has it must be contained by an element with `display-table`. Logically, it would be they should also be contained by an element with `display: table-row` but CSS does not require it.

Here is what the html and css for the `display: table-cell` solution would look like.

```HTML
<header>
    <div class="pseudo-cell">
        <div id="logo">logo</div>
    </div>
    <div class="pseudo-cell second">
        <div id="menu-button">button</div>
    </div>
</header>
```

```CSS
header {
    width: 100%;
    display: table;
    padding: 10px;
    border: 1px gray dashed;
}

.pseudo-cell {
    width: 50%;
    display: table-cell;
}

.second {
    text-align: right;
}

#logo {
    height: 50px;
    width: 50px;
    background: orange;
}

#menu-button {
    height: 50px;
    width: 50px;
    background: pink;
    display: inline-block;
    text-align: left;
}
```

We had to set the width of the header to 100% because by default elements with their display property set to `table` do not fill all of the available horizontal space unless it is necessary.

You may be wondering why we are using the `<div>` tags with their `display` properties set to make them act like `<table>` and `<td>` tags rather than just using `<table>`, `<tr>`, and `<td>` directly. The reason for this is that using tables for laying out content is generally considered to be uncouth for [reasons](../semantic_markup) we shall discuss soon.
