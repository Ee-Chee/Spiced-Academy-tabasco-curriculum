## Filters

AngularJS filters are used to format our data in some way.  Angular comes with some built in filters that are very easy to use. The filters are:

- `currency` Format a number to a currency format.
- `date` Format a date to a specified format.
- `filter` Select a subset of items from an array.
- `json` Format an object to a JSON string.
- `limitTo` Limits an array/string, into a specified number of elements/characters.
- `lowercase` Format a string to lower case.
- `number` Format a number to a string.
- `orderBy` Orders an array by an expression.
- `uppercase` Format a string to upper case.

The syntax for using them is simply to use the pipe `|` in your HTML:

```html
<p>You know you make me want to {{ verb | uppercase }}!</p>
```

Of course, you can write your own custom filters with the `filter()` method. See the [AngularJS docs](https://docs.angularjs.org/guide/filter) for more on this.

## Further Reading

1. [AngularJS Cheat Sheet](https://www.cheatography.com/proloser/cheat-sheets/angularjs/)
2. [Made With Angular](https://www.madewithangular.com/#/)
