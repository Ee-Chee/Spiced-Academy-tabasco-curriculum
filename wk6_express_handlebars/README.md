# Express + Handlebars

Express has a built-in mechanism to support server-side templates but does not require any particular template language. There a multiple template languages for which <a href="https://github.com/expressjs/express/wiki?_ga=1.45443236.128052078.1471765293#template-engines">Express-compatible 'engines'</a> are available. For Handlebars, which is a particularly popular template language, there are at least four engines to choose from. Let's go with <a href="https://github.com/ericf/express-handlebars">express-handlebars</a>.

```
npm install express-handlebars --save
```

In your project you need to tell Express to use Handlebars as its template engine.

```js
var hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
```

By default, templates will be looked for in a directory named "views" but you can change this if you wish. Also by default, the files in the views directory are expected to have ".handlebars" as their extension but you can change this too if you wish. Assuming that you do not change either of these things and that you have a file named "hello.handlebars" in your views directory, you can render that template and send it to the browser using the <a href="http://expressjs.com/en/4x/api.html#res.render">`res.render`</a> method.

```js
app.get('/hello', function(req, res) {
    res.render('hello', {
        name: 'kitty'
    });
});
```

The second argument passed to `res.render` is the data to be used by the template.

## Partials and Layouts

Partials (templates that can be included by other templates) are supported. Rather than registering them programmatically with `Handlebars.registerPartial`, you simply place them in a subdirectory of the views directory named "partials" (you can configure this to something else, if you wish).

On most websites there are a lot of common elements on different pages. Usually there are common elements such as headers and footers that change very little from page to page while there is a main content area that is completely unique to the particular page. `express-handlebars` allows you to create _layouts_ (main wrappers for site content) to handle this common situation. A layout may look something like this:

```html
<!doctype html>
<html>
    {{> head}}
    <body>
        {{> header }}

        {{{body}}}

        {{> footer }}
    </body>
</html>
```

If this file were named "layout.handlebars" and you wanted to use it to wrap content from a template named "content.handlebars", your call to render the template would look like this:

```js
app.get('/layout-example', function(req, res) {
    res.render('content', {
        layout: 'layout'
    });
});
```

By default layouts are expected to be in a subdirectory of the views directory named "layouts".

## Exercises

1. Use `express-handlebars` to generate a page that welcomes users to your portfolio site and allows them to navigate to individual projects. You should use `fs` to get the list of projects and you should pass this data to the template so it can display the full list.

2. Create a description page for each of your projects. The route for the description page should be either `/projects/:projectName` or `/projects/:projectName/description`. The project listing on `/projects` should link to the project description pages rather than to the projects themselves.
    The description pages should contain the following content:
    * the title of the project
    * some text describing the project
    * a screen shot of the project
    * a link to open the project in a new browser tab
    * a navigation area that contains links to all other project description pages. Ideally, the description page the user is currently on would be visually indicated in some fashion

    The navigation area should have the _exact same markup_ as the list of projects on the `/projects` page. You can use CSS to make the listing look different in the two different places. Do not write the markup more than once - use a partial template instead.

    The title and description on the page should come from a `description.json` file you add to each project's directory. For example, the `description.json` file you place in your Kitty Carousel's directory may look like this:

    ```json
    {
        "name": "Kitty Carousel",
        "description:": "This was the first project I did using CSS transitions and DOM event handling. The hardest part was getting the right images to slide in and slide out at the right time. It was like herding cats."
    }
    ```

    You need not include the link in the file since you can figure that out from the url of the description page. The screenshot should be placed in the project's directory along side the description file so you can figure out the url to that as well.

    In your route you will have to pass all of this data to your template.

    Be aware that users may attempt to access projects that do not exist. Nothing stops someone from typing `/projects/project-that-does-not-exist/description` into their browser's location bar. If somebody does that, you should handle it and not let it crash your site. 
