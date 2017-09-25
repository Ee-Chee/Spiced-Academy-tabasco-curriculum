In addition to single quotes and double quotes, ES6 gives us a third way to create strings.

```js
const name = `Leonardo DiCaprio`;
```

The character used to mark this string literal is called a _back-tick_. Strings created with back-ticks have some special powers that strings created with single or double quotes do not.

In strings created with back-ticks, unescaped new line characters are allowed.

```js
const elem = `<div>
		  <a href="/">Click me</a>
	      </div>`
;
```

Strings created with back-ticks support _interpolation_. Expressions contained within `${`…`}`  will be evaluated and the resulting values will appear in their place. This greatly reduces the need to build strings through concatenation.

```js
const getGreeting = name => {
    return `Hello ${name}!`;
};

getGreeting('World'); // 'Hello World!'

getGreeting('Kitty'); // `Hello Kitty!`
```

More complex substitutions can be done with _tagged_ template strings.

```js
const ratingTag = (strings, rating) => {
    if (rating <= 2) {
        rating = 'poor';
    } else if (rating == 3) {
        rating = 'only ok';
    } else if (rating < 5) {
        rating = 'good';
    } else {
        rating = 'excellent'
    }
    return strings[0] + rating + strings[1];
};

ratingTag`That movie was ${5}!!!`; // 'That movie was excellent!!!'

ratingTag`This pretzel is ${3} :(`; // 'This pretzel is only ok :('

ratingTag`My family is ${1}` // 'My family is poor'

```

